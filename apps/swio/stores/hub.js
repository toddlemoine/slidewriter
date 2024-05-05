import debounce from 'lodash.debounce';
import { action, computed, observable, runInAction } from 'mobx';
import guessTitleFromPresentation from '../../shared/helpers/guessTitleFromPresentation';
import { assemblePresentationFile } from '../../shared/helpers/presentationFile';
import {
    createPresentation,
    getPresentation,
    loadSample,
    save,
} from '../../shared/actions/presentation';
import getPresentations from '../../shared/actions/presentation/getPresentations';
import destroyPresentation from '../../shared/actions/presentation/destroy';
import stash from '../../shared/actions/presentation/stash';
import getStashedPresentation from '../../shared/actions/presentation/getStashedPresentation';
import { ORIGIN_LOCAL } from '../../shared/constants';
import setDocTitle from '../../shared/helpers/setDocTitle';
import promiseRetry from 'promise-retry';

const SAVE_DEBOUNCE_TIMEOUT = 5000;

class Hub {
    // NOT observable. Our internal cache of current state of the presentation.
    current = {
        body: '',
        metadata: {},
    };

    @observable
    presentation = {
        loadedAt: null,
        body: '',
        metadata: {},
    };

    @observable
    files = [];
    @observable
    images = [];
    @observable
    previews = [];
    @observable
    error = null;
    @observable
    notifications = [];
    @observable
    pending = true;
    @observable
    saving = false;
    @observable
    announcement = '';
    readOnly = true;
    origin = ORIGIN_LOCAL;
    initialPresentation = {};

    constructor(
        files = [],
        origin = ORIGIN_LOCAL,
        initialPresentation,
        history,
    ) {
        this.files = files;
        this.origin = origin;
        this.initialPresentation = initialPresentation || {};
        this.history = history;
        this.loadBestInitialPresentation();
    }

    loadBestInitialPresentation = () => {
        if (this.initialPresentation.id) {
            return this.loadPresentation(
                this.initialPresentation.id,
                this.origin,
            );
        }

        if (this.files.length) {
            return this.loadMostRecentlyUsed();
        }

        this.loadSample();
    };

    @action
    announce = text => {
        this.announcement = text;
    };

    @action
    getPresentations = () => {
        getPresentations(this.origin).then(files =>
            runInAction(() => (this.files = files)),
        );
    };

    removeFile(id) {
        const index = this.files.findIndex(file => file.id === id);
        this.files.splice(index, 1);
        this.announce('file removed');
    }

    @action
    destroyPresentation = id => {
        promiseRetry(
            retry => destroyPresentation(id, this.origin).catch(retry),
            {
                retries: 3,
            },
        ).then(() => this.removeFile(id), this.handleDestroyPresentationError);
    };

    @action
    clearError = () => {
        this.error = null;
    };

    @action
    loadSample = () => {
        promiseRetry(retry => loadSample().catch(retry), { retries: 3 }).then(
            source =>
                this.createPresentation(source).then(this.getPresentations),
            this.handleLoadSampleError,
        );
    };

    handleDestroyPresentationError = () => {
        runInAction(() => {
            this.error = {
                text: `There was a problem deleting the presentation. Please wait a moment and try again.`,
                onClose: this.clearError,
            };
        });
    };

    handleLoadSampleError = () => {
        runInAction(() => {
            this.addNotification(
                {
                    text: `We couldn't load the sample presentation, which is too bad, because it's a good introduction to Slidewriter. 
            A new presentation has been created to get you started.`,
                    onClose: this.clearNotifications,
                },
                { dismissDelayMs: 10 * 1000 },
            );
        });
    };

    @action
    addNotification = props => {
        this.notifications.push(props);
    };

    clearNotifications = () => {
        this.notifications = [];
    };

    @action
    assemblePresentationFile({ body, metadata } = {}) {
        return assemblePresentationFile(
            body || this.current.body,
            metadata || this.current.metadata,
        );
    }

    loadMostRecentlyUsed() {
        return this.loadPresentation(this.files[0].id, this.origin);
    }

    @action
    loadPresentation = id => {
        promiseRetry(retry => getPresentation(id, this.origin).catch(retry), {
            retries: 3,
        }).then(({ body, metadata }) => {
            runInAction(() => this.setLoadedPresentation({ body, metadata }));
        }, this.handleLoadPresentationError);
    };

    handleLoadPresentationError = () => {
        runInAction(() => {
            this.error = {
                text: `There was a problem getting the requested presentation. We've already retried a few times, 
         so please wait a minute before trying again.`,
                onClose: this.clearError,
            };
        });
    };

    handleCreatePresentationError = () => {
        runInAction(() => {
            this.error = {
                text: `There was a problem creating the new presentation. We've already retried a few times, 
         so please wait a minute before trying again.`,
                onClose: this.clearError,
            };
        });
    };

    @action
    createPresentation = source => {
        return promiseRetry(
            retry => createPresentation(this.origin, source).catch(retry),
            { retries: 3 },
        ).then(({ body, metadata }) => {
            runInAction(() => {
                this.setLoadedPresentation({ body, metadata });
            });
        }, this.handleCreatePresentationError);
    };

    @action
    saveMetadata(metadata) {
        this.current.metadata = metadata;
        const file = this.assemblePresentationFile();
        return this.savePresentation(file);
    }

    @action
    savePresentationBody(body) {
        this.current.body = body;
        return this.savePresentation(this.assemblePresentationFile());
    }

    setLoadedPresentation({ body, metadata }) {
        this.presentation.body = body;
        this.presentation.metadata = metadata;
        this.current.body = body;
        this.current.metadata = metadata;
        this.presentation.loadedAt = Date.now();
        this.updateHistory(metadata.origin, metadata.id);
        this.updateDocumentTitle();
        this.announce(
            'presentation loaded. changes will be saved every few seconds.',
        );
        return { body, metadata };
    }

    updateDocumentTitle() {
        setDocTitle(this.bestAvailableTitle);
    }

    updateHistory(origin, id) {
        this.history.replace(`#${origin}:${id}`);
    }

    stashPresentation(id, source) {
        stash(id, source);
    }

    saveStash = debounce(() => {
        const { id, origin } = this.current.metadata;
        const title = this.bestAvailableTitle;
        getStashedPresentation(id).then(data => {
            save({ source: data, id, origin, title })
                .then(() =>
                    runInAction(() => {
                        this.saving = false;
                        this.updateDocumentTitle();
                    }),
                )
                .catch(err =>
                    runInAction(() => {
                        console.error('Error saving presentation', err);
                        this.error = {
                            text: `There was a problem saving the presentation. Please wait a moment and try again.`,
                            onRetry: this.saveStash,
                        };
                    }),
                );
        });
    }, SAVE_DEBOUNCE_TIMEOUT);

    @action
    savePresentation = data => {
        runInAction(() => (this.saving = true));
        return stash(this.presentation.metadata.id, data).then(this.saveStash);
    };

    @action
    setError = err => {
        runInAction(() => (this.error = err));
    };

    @action
    getPresentationPreviews = () => {
        runInAction(() => {
            getPresentationImages(this.current.metadata.id)
                .then(previews =>
                    previews.sort((a, b) => {
                        if (b.lastModified < a.lastModified) return -1;
                        if (b.lastModified > a.lastModified) return 1;
                        return 0;
                    }),
                )
                .then(previews =>
                    Promise.all(previews.map(({ key }) => getUrl(key))),
                )
                .then(previewUrls => {
                    this.previews = previewUrls;
                });
        });
    };

    @computed
    get bestAvailableTitle() {
        const title = guessTitleFromPresentation(this.current.body);
        return title.trim();
    }
}

export default Hub;

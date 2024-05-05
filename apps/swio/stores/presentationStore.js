import fm from 'front-matter';
import { action, autorun, computed, observable, reaction } from 'mobx';
import config from '../config';
import splitSlides from '../../shared/helpers/splitSlides';
import {
    PLAY_PRESENTATION_FROM_START_KEYS,
    PLAY_PRESENTATION_KEYS,
} from '../keys';
import Listener from '../listener';
import SlideParser from '../../shared/parsers/SlideParser';
import { imageEditorUrl } from '../helpers/imageUrl';
import generateSlideLayout from '../helpers/generateSlideLayout';

const LINE_BREAK = '\n';
class PresentationStore {
    @observable
    current = 0;
    @observable
    slides = [];
    @observable
    frontMatter = {};
    @observable
    playing = false;
    @observable
    cursorPosition = 0;
    @observable
    source = '';
    @observable
    loading = true;
    @observable
    showAssets = false;
    images = [];
    intervalId = null;
    slideParser = null;

    constructor(hub) {
        this.slideParser = new SlideParser(config);

        this.hub = hub;
        autorun(() => {
            const source = hub.presentation.body;
            this.loadedAt = hub.presentation.loadedAt;
            this.source = source;
            this.slides = splitSlides(source);
            this.current = 0;
            this.showAssets = false;
        });

        reaction(
            () => hub.images[hub.images.length - 1],
            imageSet => this.insertLatestImageIntoSource(imageSet),
        );

        this.listener = new Listener();
        this.assignHotKeys();
    }

    parserData() {
        return {
            presentationId: this.hub.presentation.metadata.id,
        };
    }

    cursorPositionToInsertAsset(fromPosition) {
        const from = fromPosition || this.cursorPosition;
        const after = this.source.substring(from);
        const firstLineBreak = after.indexOf(LINE_BREAK);
        return from + firstLineBreak + 1;
    }

    cursorPositionToInsertSlideLayout() {
        const after = this.source.substring(this.cursorPosition);
        const SLIDE_BREAK = LINE_BREAK + LINE_BREAK;
        const firstSlideBreak = after.indexOf(SLIDE_BREAK);
        return firstSlideBreak !== -1
            ? this.cursorPosition + firstSlideBreak + 1
            : this.cursorPosition + after.length + 1;
    }

    cursorAtBeginningOfLine() {
        return (
            this.cursorPosition === 0 ||
            this.source.charAt(this.cursorPosition - 1) === LINE_BREAK
        );
    }

    insertTextAtPosition(position, ...textArgs) {
        const before = this.source.substring(0, position);
        const after = this.source.substring(position);
        const text = textArgs.join('');
        const source = [before, text, after].join('');
        const newCursorPosition = position + text.length;
        this.saveEditorState(source, newCursorPosition);
    }

    insertLatestImageIntoSource(imageSet) {
        this.showAssets = false;
        const imageLines = imageSet.map(imageEditorUrl).join(LINE_BREAK);
        if (this.cursorAtBeginningOfLine()) {
            this.insertTextAtPosition(
                this.cursorPosition,
                imageLines,
                LINE_BREAK,
            );
        } else {
            this.insertTextAtPosition(
                this.cursorPositionToInsertAsset(),
                imageLines,
                LINE_BREAK,
            );
        }
    }

    assignHotKeys = () => {
        this.listener.simple_combo(PLAY_PRESENTATION_KEYS, this.play);
        this.listener.simple_combo(
            PLAY_PRESENTATION_FROM_START_KEYS,
            this.playFromStart,
        );
    };

    @action
    addSlideLayout = layout => {
        const text = generateSlideLayout(layout);

        if (this.cursorAtBeginningOfLine()) {
            this.insertTextAtPosition(
                this.cursorPosition,
                text,
                LINE_BREAK,
                LINE_BREAK,
            );
        } else {
            const pos = this.cursorPositionToInsertSlideLayout();
            this.insertTextAtPosition(
                pos,
                LINE_BREAK,
                text,
                LINE_BREAK,
                LINE_BREAK,
            );
        }
    };

    @action
    next = () => {
        if (this.nextEnabled) {
            this.current++;
        }
    };

    @action
    back = () => {
        if (this.backEnabled) {
            this.current--;
        }
    };

    @action
    startPresentation = () => {
        this.current = 0;
        this.playing = true;
    };

    @action
    stopPresentation = current => {
        this.current = current;
        this.playing = false;
    };

    @action
    saveEditorState = (source = '', cursorPosition) => {
        this.source = source;
        this.cursorPosition = cursorPosition;
        this.slides = splitSlides(source);
        this.setCurrentSlideBasedOnCursorPosition();
        this.hub.savePresentationBody(source);
    };

    @action
    saveCursorPosition = cursorPosition => {
        this.cursorPosition = cursorPosition;
        this.setCurrentSlideBasedOnCursorPosition();
    };

    @action
    play = () => {
        this.playing = true;
    };

    @action
    playFromStart = () => {
        this.current = 0;
        this.playing = true;
    };

    @action
    toggleAssets = () => {
        this.showAssets = !this.showAssets;
    };

    setCurrentSlideBasedOnCursorPosition() {
        const textBefore = this.source.substr(0, this.cursorPosition);
        const slideNumber = textBefore.split('\n\n').length - 1;
        this.current = slideNumber;
    }

    @computed
    get backEnabled() {
        return this.slides.length && this.current > 0;
    }

    @computed
    get nextEnabled() {
        return this.slides.length && this.current < this.slides.length - 1;
    }

    @computed
    get numberofslides() {
        return this.slides.length;
    }

    @computed
    get currentSlide() {
        const current = this.slides[this.current];
        const frontMatter = fm(current);
        return this.slideParser.parse(
            frontMatter.body.trim(),
            this.parserData(),
        );
    }

    @computed
    get currentSlideNumberText() {
        const total = this.slides.length;
        return total ? `${this.current + 1} of ${total}` : '';
    }

    @computed
    get fullPresentationProps() {
        return {
            slides: this.slides.map(slide => {
                const frontMatter = fm(slide);
                return this.slideParser.parse(
                    frontMatter.body.trim(),
                    this.parserData(),
                );
            }),
            current: this.current,
            onQuit: this.stopPresentation,
        };
    }
}

export default PresentationStore;

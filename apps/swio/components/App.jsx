import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import Listener from '../listener';
import Home from '../views/Home';
import About from './About';
import './App.css';
import FullPresentation from './FullPresentation/FullPresentation';
import GeneralHelp from './GeneralHelp';
import KeyboardHelp from './KeyboardHelp';
import HeadStyles from './HeadStyles';
import Notifications from './Notifications';
import ErrorNotifications from './ErrorNotifications';
import Modals from './Modals';
import ATAnnouncements from './ATAnnouncements';
import FilesPanel from './FilesPanel';
import { NEXT_SLIDE_KEYS, PREV_SLIDE_KEYS } from '../keys';

function getProps({ hub, store, presentationStore, metadataStore }) {
    return {
        next: presentationStore.next,
        back: presentationStore.back,
        uploadImages: hub.uploadImages,
        showDropzone: store.isDragging,
        toggleDropzone: store.toggleDropzone,
        togglePreview: store.togglePreview,
        isPreviewing: store.isPreviewing,
        showKeyboardHelp: store.showKeyboardHelp,
        showGeneralHelp: store.showGeneralHelp,
        showAbout: store.showAbout,
        showFiles: store.showFiles,
        showMailingList: store.showMailingList,
        isPlayingFullPresentation: presentationStore.playing,
        getFullPresentationProps: () => ({
            ...presentationStore.fullPresentationProps,
            ...metadataStore.fullPresentationProps,
        }),
    };
}

// Stores
@inject(getProps)
@observer
class App extends Component {
    constructor() {
        super();
        this.listener = new Listener();
    }
    componentWillUnmount() {
        this.listener.destroy();
    }
    componentDidUpdate() {
        if (this.props.isPreviewing) {
            this.startPreview();
        } else {
            this.stopPreview();
        }
    }
    handleEscapePress = () => {
        if (this.props.isPreviewing) {
            this.props.togglePreview();
        }
    };
    startPreview() {
        this.listener.simple_combo('esc', this.handleEscapePress);
        NEXT_SLIDE_KEYS.forEach(key =>
            this.listener.simple_combo(key, this.props.next),
        );
        PREV_SLIDE_KEYS.forEach(key =>
            this.listener.simple_combo(key, this.props.back),
        );
        document.body.classList.add('is-previewing');
    }
    stopPreview() {
        document.body.classList.remove('is-previewing');
        this.listener.reset();
    }

    handleDragEnter = () => {
        this.props.toggleDropzone(true);
    };

    handleDragLeave = () => this.cancelDropzone();

    handleOutsideDrop = e => {
        e.preventDefault();
        this.cancelDropzone();
    };

    cancelDropzone = () => {
        this.props.toggleDropzone(false);
    };

    handleDrop = files => {
        this.props.uploadImages(files);
        this.handleDragLeave();
    };

    render() {
        const {
            showKeyboardHelp,
            showGeneralHelp,
            showAbout,
            showFiles,
            isPlayingFullPresentation,
            getFullPresentationProps,
        } = this.props;

        return (
            <div
                className="app"
                onDragEnter={this.handleDragEnter}
                onDrop={this.handleOutsideDrop}
            >
                <HeadStyles />
                <Home />
                {showKeyboardHelp && <KeyboardHelp />}
                {showGeneralHelp && <GeneralHelp />}
                {showAbout && <About />}
                {showFiles && <FilesPanel />}
                <Notifications />
                <ErrorNotifications />
                <Modals />
                <ATAnnouncements />
                {isPlayingFullPresentation && (
                    <FullPresentation {...getFullPresentationProps()} />
                )}
            </div>
        );
    }
}

export default App;

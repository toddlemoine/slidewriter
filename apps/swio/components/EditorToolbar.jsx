import React, { Component } from 'react';
import './EditorToolbar.css';
import ExportButton from './ExportButton';
import SavingStatus from './SavingStatus';
import FlexSpacer from '../../shared/components/FlexSpacer';
import InsertSlideContentButton from './InsertSlideContentButton';

class EditorToolbar extends Component {
    constructor() {
        super();
        this.node = React.createRef;
    }
    focusAssetsButton() {
        const button = this.node.current.querySelector('.assets-button');
        if (button) {
            button.focus();
        }
    }
    render() {
        return (
            <div className="editor-toolbar">
                <InsertSlideContentButton />
                <ExportButton />
                <FlexSpacer />
                <SavingStatus />
            </div>
        );
    }
}
export default EditorToolbar;

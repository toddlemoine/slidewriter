import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import FilesListItemTitle from './FilesListItemTitle';
import FilesListItemModifiedAt from './FilesListItemModifiedAt';
import './FilesPanel.css';
import FilesActionsMenu from './FilesActionsMenu';
import ActivityDot from './ActivityDot';
import { isUp, isDown } from '../helpers/keys';
import SidePanel from './SidePanel';
import NewPresentationButton from './activityBar/NewPresentationButton';

function getProps({ store, hub }) {
    return {
        currentPresentationId: hub.presentation.metadata.id,
        files: hub.files,
        getPresentations: hub.getPresentations,
        getPresentation: hub.loadPresentation,
        destroyPresentation: hub.destroyPresentation,
        close: () => store.toggleFiles(false),
    };
}

@inject(getProps)
@observer
class FilesPanel extends Component {
    constructor() {
        super();
        this.list = React.createRef();
    }

    componentDidMount() {
        this.props.getPresentations();
    }

    setInitialItemFocus = () => {
        const item = this.list.current.querySelector('a');
        item && item.focus();
    };

    handleKeyDown = e => {
        if (isUp(e)) {
            e.preventDefault();
            this.focusPreviousSibling(e.target);
        }

        if (isDown(e)) {
            e.preventDefault();
            this.focusNextSibling(e.target);
        }
    };

    focusPreviousSibling(node) {
        const previousSibling = node.closest('li').previousSibling;
        if (previousSibling) {
            previousSibling.querySelector('a').focus();
        }
    }

    focusNextSibling(node) {
        const nextSibling = node.closest('li').nextSibling;
        if (nextSibling) {
            nextSibling.querySelector('a').focus();
        }
    }

    handleFileActionSelect = (action, id) => {
        if (action === 'delete') {
            this.props.destroyPresentation(id);
        }
    };

    handleItemClick = (e, id) => {
        // Allow cmd/ctrl clicking to open in new tab.
        if (!e.metaKey) {
            e.preventDefault();
            this.props.getPresentation(id);
        }
    };

    render() {
        const { files, currentPresentationId, close } = this.props;
        return (
            <SidePanel
                className="files-panel"
                title="Saved Presentations"
                onClose={close}
                alignment="left"
                initialFocus={this.setInitialItemFocus}
            >
                <header>
                    <NewPresentationButton content="+ New presentation" />
                </header>
                <ol
                    ref={this.list}
                    className="files-list"
                    onKeyDown={this.handleKeyDown}
                >
                    {files.map(file => {
                        const path = `/swio:${file.id}`;
                        const isCurrentPresentation =
                            file.id === currentPresentationId;
                        return (
                            <li key={file.id} className="files-list-item">
                                <ActivityDot
                                    show={isCurrentPresentation}
                                    status="on"
                                />
                                <div className="files-list-item-details">
                                    <FilesListItemTitle
                                        id={file.id}
                                        title={file.title}
                                        path={path}
                                        onClick={e =>
                                            this.handleItemClick(e, file.id)
                                        }
                                    />
                                    <FilesListItemModifiedAt
                                        value={file.modifiedAt}
                                    />
                                </div>
                                <div className="files-list-item-actions">
                                    <FilesActionsMenu
                                        disabled={isCurrentPresentation}
                                        fileId={file.id}
                                        onSelect={this.handleFileActionSelect}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </SidePanel>
        );
    }
}

export default FilesPanel;

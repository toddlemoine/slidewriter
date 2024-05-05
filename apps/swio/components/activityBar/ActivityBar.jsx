import React, { Component } from 'react';
import { inject } from 'mobx-react';
import ActivityBarGroup from './ActivityBarGroup';
import SiteActionsMenu from './SiteActionsMenu';
import './ActivityBar.css';
import HelpLink from '../HelpLink';
import OpenFilesButton from './OpenFilesButton';
import NewPresentationButton from './NewPresentationButton';

function getProps({ hub }) {
    return {
        setError: hub.setError,
    };
}
@inject(getProps)
class ActivityBar extends Component {
    render() {
        return (
            <section role="banner" className="activity-bar">
                <ActivityBarGroup className="site-actions">
                    <SiteActionsMenu />
                </ActivityBarGroup>
                <ActivityBarGroup className="file-actions">
                    <NewPresentationButton />
                    <OpenFilesButton />
                </ActivityBarGroup>
                <ActivityBarGroup className="spacer" />
                <ActivityBarGroup className="user-actions">
                    <HelpLink />
                </ActivityBarGroup>
            </section>
        );
    }
}

export default ActivityBar;

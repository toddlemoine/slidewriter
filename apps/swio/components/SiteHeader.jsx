import React, { Component } from 'react';
import SiteName from '../../shared/components/SiteName';
import './SiteHeader.css';

class SiteHeader extends Component {
    render() {
        return (
            <header role="banner" className="site-header">
                <SiteName />
            </header>
        );
    }
}

export default SiteHeader;

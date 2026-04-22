import React from 'react';
import Copyright from './Copyright.jsx';
import './SiteFooter.css';

export default function SiteFooter({ children }) {
    return (
        <footer className="site-footer">
            <p>
                <Copyright /> • contact [at] slidewriter.app • About • Terms •
                Privacy
            </p>
        </footer>
    );
}

import React from 'react';
import './EditorFocusIndicator.css';

function EditorFocusIndicator({ active }) {
    const classes = ['editor-focus-indicator', active ? 'active' : '']
        .filter(Boolean)
        .join(' ');
    return <div className={classes} />;
}

export default EditorFocusIndicator;

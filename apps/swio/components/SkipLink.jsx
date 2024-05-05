import React from 'react';
import './SkipLink.css';

export default function SkipLink({ onClick, setRef }) {
	return (
		<button
			ref={ setRef }
			className="visually-hidden skip-link"
			onClick={ onClick }>Skip to main content</button>
	)
}

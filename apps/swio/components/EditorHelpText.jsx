import React from 'react';
import './EditorHelpText.css';

export default function EditorHelpText() {
	return (
		<section id="editor-help" className="editor-help-text">
			Create your slides here.
			Use # to add headings, - or numbers to make lists, or make text **<strong>bold</strong>** or _<em>italicized</em>_.
			Insert :emoji: with colons.  Put a space between blocks of text to create a new slide.
		</section>
	);
}

import React from 'react';
import cx from 'classnames';
import './TabPanel.css';

export default function Panel({
	id,
	hidden = false,
	children,
	className = '',
	setRef
}) {
	const classes = cx('panel', className);
	return (
		<div
			id={id}
			ref={ setRef }
			role="tabpanel"
			hidden={ hidden }
			className={ classes }>
		{ children }
		</div>
	)
}

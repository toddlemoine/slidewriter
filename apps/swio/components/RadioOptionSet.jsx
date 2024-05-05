import React from 'react';
import cx from 'classnames';

export default function RadioOptionSet({ className, children }) {
	const classes = cx('radio-option-set', className);
	return (
		<div className={ classes }>{ children }</div>
	);
}

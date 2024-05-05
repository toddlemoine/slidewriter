import React from 'react';
import './Icon.css';

export default function Icon({ children, className }) {
	return (
		<div className={`icon ${className}`}>
			{ children }
		</div>
	)
}

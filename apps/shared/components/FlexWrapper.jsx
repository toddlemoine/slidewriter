import React from 'react';
import './FlexWrapper.css';

export default function FlexWrapper({ children }) {
	return <div className="flex-wrapper">{ children }</div>;
}

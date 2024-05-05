import React, { Component } from 'react';
import SkipLink from './SkipLink.jsx';
import SiteSections from './SiteSections.jsx';
import A11yMenuCloseButton from './A11yMenuCloseButton.jsx';
import Listener from '../listener.js';
import './A11yMenu.css';

class A11yMenu extends Component {

	constructor(...args) {
		super(...args);
		this.state = { show: false };
	}

	componentDidMount() {
		this.listener = new Listener();
		this.listener.simple_combo("alt /", this.activateFromKeyCombo );
	}

	componentDidUpdate() {
		if ( this.state.show ) {
			this.listen();
		} else {
			this.stopListening();
			this.releaseActiveElement();
		}
	}

	componentWillUnmount() {
		this.listener.destroy();
	}

	activateFromKeyCombo = () => {
		this.cacheActiveElement();
		document.querySelector('#a11y-menu-jump-menu').focus();
	}

	cacheActiveElement = () => {
		this.priorActiveElement = document.activeElement;
	}

	releaseActiveElement = () => {
		this.priorActiveElement = null;
	}

	cancel = () => {
		if ( this.priorActiveElement ) {
			this.priorActiveElement.focus();
		}
		this.hide();
	}

	listen = () => {
		this.listener.simple_combo('tab', this.handleTab );
		this.listener.simple_combo('esc', this.cancel );
	}

	stopListening = () => {
		this.listener.unregister_many(['tab', 'esc']);
	}

	setFirstControlRef = (node) => {
		this.firstControl = node;
	}

	setLastControlRef = (node) => {
		this.lastControl = node;
	}

	hide = () => {
		this.setState({ show: false });
	}

	handleTab = (e) => {
		const isTabbingAwayFromFirstControl = (e.shiftKey && e.target === this.firstControl);
		const isTabbingAwayFromLastControl = e.target === this.lastControl;

		if ( isTabbingAwayFromFirstControl || isTabbingAwayFromLastControl) {
			return this.hide();
		}

		return true;
	}

	handleFocus = () => {
		this.setState({ show: true });
	}

	handleSectionJump = () => {
		this.setState({ show: false });
	}

	skipToEditor = () => {
		const editor = document.querySelector('#editor');
		editor.focus();
		this.setState({ show: false });
	}

	render() {

		const styles = {};

		if ( this.state.show ) {
			styles.opacity = 1;
			styles.zIndex = 10;
			styles.top = 0;
		}

		return (
			<div className="a11y-menu" style={ styles }>
				<SkipLink setRef={ this.setFirstControlRef } onClick={ this.skipToEditor } />
				<div className="a11y-menu-sections">
					<div className="a11y-menu-left">
						<label htmlFor="a11y-menu-jump-menu">Jump to</label>
						<SiteSections
							id="a11y-menu-jump-menu"
							onChange={ this.handleSectionJump }
							onFocus={ this.handleFocus } />
					</div>
					<div className="a11y-menu-right">
						<A11yMenuCloseButton setRef={ this.setLastControlRef } onClick={ this.hide } />
					</div>
				</div>
			</div>
		);
	}
}

export default A11yMenu;



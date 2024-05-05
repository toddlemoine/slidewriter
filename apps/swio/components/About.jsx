import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Modal from './Modal.jsx';
import content from '../docs/about.md';
import marked from 'marked';
import './About.css';

@inject('store')
class About extends Component {
	handleCloseClick = () => {
		this.props.store.toggleAbout(false);
	}

	render() {
		const html = marked(content);
		return (
			<Modal className="about" title="About" onClose={ this.handleCloseClick }>
				<div dangerouslySetInnerHTML={ { __html: html }}/>
			</Modal>
		);
	}
}

export default About;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './SiteSections.css';

const tabs = {
	slidesTab: 'Slides',
	stylesTab: 'Styles',
	helpTab: 'Help'
};

const panels = {
	editor: 'Slide Editor',
	styles: 'Styles'
};

const presentation = {
	presentation: 'Current Slide',
	play: 'Play',
	playFromStart: 'Play From Start',
	nextSlide: 'Next Slide'
};

function disabledOption(id, activePanel) {
	if (id === 'editor' && activePanel === 'slides')
		return {};

	if (id === 'styles' && activePanel === 'styles')
		return {};

	return { disabled: true };
}

@inject('store')
@observer
class SiteSections extends Component {

	handleOptionSelect = (e) => {
		const node = document.querySelector(`#${e.target.value}`);
		node.focus();
		this.props.onChange();
	}

	render() {
		const { id, onFocus, store } = this.props;

		return (
			<select
				id={ id }
				className="site-sections"
				onFocus={ onFocus }
				onChange={ this.handleOptionSelect }>
				<option key="default">Choose a control or section</option>
				<optgroup label="Editor Panels" key="group-panels">
				{ Object.entries(panels)
						.map(([id, label]) => <option key={id} value={id} {...disabledOption(id, store.activePanel)}>{label}</option>)}
				</optgroup>
				<optgroup label="Presentation" key="group-presentation">
				{ Object.entries(presentation)
						.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
				</optgroup>
				<optgroup label="Editor Tabs" key="group-tabs">
					{ Object.entries(tabs)
							.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
				</optgroup>
			</select>
		);
	}
}

export default SiteSections;

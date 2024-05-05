import React from 'react';
import AlignmentButton from './AlignmentButton.jsx';
import './AlignmentChooser.css';

export default function AlignmentChooser({ id, value, onChange, disabled }) {
	return (
		<div className="alignment-chooser">
			{ ['left', 'center', 'right'].map(alignment =>
				<AlignmentButton
					id={ id }
					key={alignment}
					value={alignment}
					disabled={ disabled }
					onClick={ onChange }
					selected={ alignment === value }
					/>
			)}
		</div>
	);

}

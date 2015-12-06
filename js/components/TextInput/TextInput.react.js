'use strict';

import React from 'react';

import './TextInput.post.css';

const REACT_PROP_TYPES = React.PropTypes;
const ENTER_KEY_CODE = 13;

class TextInput extends React.Component {
	constructor() {
		super();

		if (!this.props) {
			this.props = {};
		}

		this.state = {
			value: this.props.value || ''
		}
	}

	static propTypes = {
		id: REACT_PROP_TYPES.string,
		className: REACT_PROP_TYPES.string,
		placeholder: REACT_PROP_TYPES.string,
		onSave: REACT_PROP_TYPES.func.isRequired,
		value: REACT_PROP_TYPES.string
	};

	render = () => {
		return (
			<input
				className = {this.props.className}
				id = {this.props.id}
				placeholder = {this.props.placeholder}
				value = {this.state.value}
				autoFocus = {true}
				onBlur = {this._save}
				onChange = {this._onChange}
				onKeyDown = {this._onKeyDown}
			/>
		);
	};

	_save = () => {
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	};

	_onChange = (event) => {
		this.setState({
			value: event.target.value
		});
	};

	_onKeyDown = (event) => {
		if (event.keyCode === ENTER_KEY_CODE) {
			this._save();
		}
	};
}

export default TextInput;
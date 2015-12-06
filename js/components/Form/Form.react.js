'use strict';

import React from 'react';

const REACT_PROP_TYPES = React.PropTypes;

class Form extends React.Component {
	constructor() {
		super();

		if (!this.props) {
			this.props = {};
		}
	}

	static propTypes = {
		id: REACT_PROP_TYPES.string,
		className: REACT_PROP_TYPES.string,
		method: REACT_PROP_TYPES.string,
		action: REACT_PROP_TYPES.string
	};

	render = () => {
		return (
			<form
				id={this.props.id}
				className={this.props.className}
				method={this.props.method}
				action={this.props.action}
				onSubmit={this._onSubmit}
				>
				{this.props.children}
			</form>
		);
	};

	_onSubmit = (event) => {
		event.preventDefault();
	};
}

export default Form;
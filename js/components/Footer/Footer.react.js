'use strict';

import React from 'react';
import TodoActions from '../../actions/TodoActions.js';

import './Footer.post.css';

const REACT_PROP_TYPES = React.PropTypes;

class Footer extends React.Component {
	constructor() {
		super();
	}

	static propTypes = {
		todoList: REACT_PROP_TYPES.object.isRequired
	};

	render = () => {
		let todoList = this.props.todoList;
		let totalCount = Object.keys(todoList).length;

		if (!totalCount) {
			return null;
		}

		let completed = 0;
		for (let key in todoList) {
			if (todoList[key].complete) {
				completed++;
			}
		}

		let itemsLeft = totalCount - completed;
		let clearCompletedButton;
		if (completed) {
			clearCompletedButton =
				<button
					className="footer__clear-completed"
					onClick={this._onClearCompletedClick}
				>
					Clear completed ({completed})
				</button>
		}

		return (
			<footer className="footer">
				<span className="footer__todo-count">
					Items left: <strong>{itemsLeft}</strong>
				</span>
				{clearCompletedButton}
			</footer>
		);
	};

	_onClearCompletedClick = () => {
		TodoActions.destroyCompleted();
	};
}

export default Footer;
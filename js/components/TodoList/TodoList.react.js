'use strict';

import React from 'react';

import TodoActions from '../../Actions/TodoActions.js';
import TodoItem from '../TodoItem/TodoItem.react.js';

import './TodoList.post.css';

const REACT_PROP_TYPES = React.PropTypes;

class TodoList extends React.Component {
	constructor() {
		super();
	}

	static propTypes = {
		todoList: REACT_PROP_TYPES.object.isRequired,
		isAllDone: REACT_PROP_TYPES.bool.isRequired
	};

	render = () => {
		if (!Object.keys(this.props.todoList).length) {
			return null;
		}
		let renderData = [];
		for (let key in this.props.todoList) {
			renderData.push(<TodoItem key={key} item={this.props.todoList[key]}/>);
		}

		return (
			<section className="todo-list">
				<input
					id="toggle-all"
					className="todo-list__toggle-all"
					type="checkbox"
					onChange={this._onToggleAllChange}
					checked={this.props.isAllDone ? 'checked' : ''}
				/>
				<label htmlFor="toggle-all">Mark all as completed</label>
				<ul className="todo-list__holder">
					{renderData}
				</ul>
			</section>
		)
	};

	_onToggleAllChange = () => {
		TodoActions.toggleCompleteAll();
	}
}

export default TodoList;
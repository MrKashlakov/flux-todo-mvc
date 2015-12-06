'use strict';

import React from 'react';
import ClassNames from 'classnames';

import TodoActions from '../../Actions/TodoActions.js';
import TextInput from '../TextInput/TextInput.react.js';

import './TodoItem.post.css';

const REACT_PROP_TYPES = React.PropTypes;

class TodoItem extends React.Component {
	constructor() {
		super();

		this.state = {
			isEditing: false
		};
	}

	static propTypes = {
		item: REACT_PROP_TYPES.object.isRequired
	};

	render = () => {
		let todoItem = this.props.item;
		let className = 'todo-item';
		let stateClassName = ClassNames({
			'todo-item_done': todoItem.complete,
			'todo-item_editing': this.state.isEditing
		});

		let input;
		if (this.state.isEditing) {
			input =
				<TextInput
					className="text-input text-input_editing"
					onSave={this._onTextSave}
					value={todoItem.text}
				/>
		}

		return (
			<li
				className={[className, stateClassName].join(' ')}
				key={todoItem.id}
			>
				<div className="todo-item__details">
					<input
						className="todo-item__mark"
						type="checkbox"
						checked={todoItem.complete}
						onChange={this._onMarkComplete}
					/>
					<label className="todo-item__content" onDoubleClick={this._onDoubleClick}>
						{todoItem.text}
					</label>
					<button className="todo-item__remove" onClick={this._onRemoveClick}/>
				</div>
				{input}
			</li>
		)
	};

	_onTextSave = (text) => {
		TodoActions.updateText(this.props.item.id, text);
		this.setState({isEditing: false});
	};

	_onMarkComplete = () => {
		TodoActions.toggleComplete(this.props.item);
	};

	_onDoubleClick = () => {
		this.setState({isEditing: true});
	};

	_onRemoveClick = () => {
		TodoActions.destroy(this.props.item.id);
	};
}

export default TodoItem;
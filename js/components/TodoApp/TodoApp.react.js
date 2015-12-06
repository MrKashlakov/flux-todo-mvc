'use strict';

import React from 'react';

import TodoStore from '../../stores/TodoStore.js';
import TodoActions from '../../actions/TodoActions.js';

import Form from '../Form/Form.react.js';
import TextInput from '../TextInput/TextInput.react.js';
import TodoList from '../TodoList/TodoList.react.js';

import './TodoApp.post.css';

const REACT_PROP_TYPES = React.PropTypes;

class TodoApp extends React.Component {
	constructor() {
		super();
	}

	static propTypes = {
		todoList: REACT_PROP_TYPES.object.isRequired,
		isAllDone: REACT_PROP_TYPES.bool.isRequired
	};

	render = () => {
		return (
			<section className="todo-app">
				<Form id="add-new-todo" className="todo-from" method="GET">
					<TextInput
						id="new-todo"
						placeholder="Create new todo just now!"
						className="text-input text-input_add-new"
						onSave={this._onTextSave}
					/>
				</Form>
				<TodoList
					todoList={this.props.todoList}
					isAllDone={this.props.isAllDone}
				/>
			</section>
		);
	};

	_onTextSave = (text) => {
		if (text.trim()) {
			TodoActions.create(text);
		}
	};
}

export default TodoApp;
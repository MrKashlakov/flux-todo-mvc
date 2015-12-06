'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

let TodoActions = {
	/**
	 * Create todo entry
	 * @param  {String} text todo entry content
	 */
	create(text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},

	/**
	 * Update content of the todo entry
	 * @param  {String} id   identifier of the todo entry
	 * @param  {[type]} text new todo entry content
	 */
	updateText(id, text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});
	},

	/**
	 * Toggle whethet a single todo is complete
	 * @param  {Object} todo todo entry
	 */
	toggleComplete(todo) {
		let id = todo.id;
		let actionType = todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE;

		AppDispatcher.dispatch({
			actionType: actionType,
			id: id
		});
	},

	/**
	 * Toggle all todo's as complete
	 */
	toggleCompleteAll() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
		});
	},

	/**
	 * Delete single todo entry
	 * @param  {String} id identifier of the todo entry
	 */
	destroy(id) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	},

	/**
	 * Deleta all completed todo's
	 */
	destroyCompleted() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED
		});
	}
};

export default TodoActions;
'use strict';

import Events from 'events';
import Assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher.js'
import TodoConstants from '../constants/TodoConstants.js'

const CHANGE_EVENT = 'change';

let EventEmitter = Events.EventEmitter;
let _todoList = {};

/**
 * Store todo entry in client-side memory
 * @param  {String} text todo entry content
 */
let create = function (text) {
	let id = (+new Date() + Math.floor(Math.random() * 9999999)).toString();
	_todoList[id] = {
		id: id,
		complete: false,
		text: text
	};
};

/**
 * Update todo entry
 * @param  {String} id      identifier of the todo entry
 * @param  {Object} updates todo content data
 */
let update = function (id, updates) {
	_todoList[id] = Assign({}, _todoList[id], updates);
};

/**
 * Update add todo's in list
 * @param  {Object} updates todo content data
 */
let updateAll = function (updates) {
	for (let id in _todoList) {
		update(id, updates);
	}
};

/**
 * Delete single todo entry
 * @param  {String} id identifier of the todo entry
 */
let destroy = function (id) {
	delete _todoList[id];
};

/**
 * Delete all completed todo's
 */
let destroyCompleted = function () {
	for (let id in _todoList) {
		if (_todoList[id].complete) {
			destroy(id);
		}
	}
};



let TodoStore = Assign({}, EventEmitter.prototype, {
	/**
	 * Check whather all todo's are completed
	 * @return {Boolean}
	 */
	isAllDone() {
		for (let id in _todoList) {
			if (!_todoList[id].complete) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Get all todo's
	 * @return {Object}
	 */
	getAll() {
		return _todoList;
	},

	/**
	 * Trigger change event
	 */
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Subscribe to change event
	 * @param {Function} callback listener callback function
	 */
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Unsubscribe to change event
	 * @param  {Function} callback listener callback function
	 */
	removeChangeEvent(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register((action) => {
	let text;

	switch (action.actionType) {
		case TodoConstants.TODO_CREATE:
			text = action.text.trim();
			if (text) {
				create(text);
				TodoStore.emitChange();
			}
			break;
		case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
			updateAll({complete: !TodoStore.isAllDone()});
			TodoStore.emitChange();
			break;
		case TodoConstants.TODO_UNDO_COMPLETE:
			update(action.id, {complete: false});
			TodoStore.emitChange();
			break;
		case TodoConstants.TODO_COMPLETE:
			update(action.id, {complete: true});
			TodoStore.emitChange();
			break;
		case TodoConstants.TODO_UPDATE_TEXT:
			text = action.text.trim();
			if (text) {
				update(action.id, {text: text});
				TodoStore.emitChange();
			}
			break;
		case TodoConstants.TODO_DESTROY:
			destroy(action.id);
			TodoStore.emitChange();
			break;
		case TodoConstants.TODO_DESTROY_COMPLETED:
			destroyCompleted();
			TodoStore.emitChange();
			break;
	}
});

export default TodoStore;

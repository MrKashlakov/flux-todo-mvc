'use strict';

jest.dontMock('../../constants/TodoConstants');
jest.dontMock('../../dispatcher/AppDispatcher');
jest.dontMock('../TodoStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

var TodoConstants = require('../../constants/TodoConstants').default;

describe('TodoStore', function () {
	var AppDispatcher;
	var TodoStore;
	var callback;

	// mock actions
	var actionTodoCreate = {
		actionType: TodoConstants.TODO_CREATE,
		text: 'foo'
	};
	var actionTodoDestroy = {
		actionType: TodoConstants.TODO_DESTROY,
		id: 'replace me in test'
	};

	beforeEach(function() {
		AppDispatcher = require('../../dispatcher/AppDispatcher').default;
		TodoStore = require('../TodoStore').default;
		callback = AppDispatcher.register.mock.calls[0][0];
	});

	it('registers a callback with the dispatcher', function() {
		expect(AppDispatcher.register.mock.calls.length).toBe(1);
	});

	it('should initialize with no to-do items', function() {
		var all = TodoStore.getAll();
		expect(all).toEqual({});
	});

	it('creates a to-do item', function() {
		callback(actionTodoCreate);
		var all = TodoStore.getAll();
		var keys = Object.keys(all);
		expect(keys.length).toBe(1);
		expect(all[keys[0]].text).toEqual('foo');
	});

	it('destroys a to-do item', function() {
		callback(actionTodoCreate);
		var all = TodoStore.getAll();
		var keys = Object.keys(all);
		expect(keys.length).toBe(1);
		actionTodoDestroy.id = keys[0];
		callback(actionTodoDestroy);
		expect(all[keys[0]]).toBeUndefined();
	});

	it('can determine whether all to-do items are complete', function() {
		var i = 0;
		for (; i < 3; i++) {
			callback(actionTodoCreate);
		}
		expect(Object.keys(TodoStore.getAll()).length).toBe(3);
		expect(TodoStore.isAllDone()).toBe(false);

		var all = TodoStore.getAll();
		for (var key in all) {
			callback({
				actionType: TodoConstants.TODO_COMPLETE,
				id: key
			});
		}
		expect(TodoStore.isAllDone()).toBe(true);

		callback({
			actionType: TodoConstants.TODO_UNDO_COMPLETE,
			id: key
		});
		expect(TodoStore.isAllDone()).toBe(false);
	});
});

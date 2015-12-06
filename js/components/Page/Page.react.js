'use strict';

import React from 'react';
import TodoApp from '../TodoApp/TodoApp.react.js';
import Header from '../Header/Header.react.js';
import Footer from '../Footer/Footer.react.js';

import TodoStore from '../../stores/TodoStore.js';

import './Page.post.css';

class Page extends React.Component {
	constructor() {
		super();
		this.state = this._getState();
	}

	componentDidMount = () => {
		TodoStore.addChangeListener(this._onChange);
	};

	componentWillUnmount = () => {
		TodoStore.removeChangeListener(this._onChange);
	};

	render = () => {
		return (
			<div className="page">
				<Header/>
				<TodoApp todoList={this.state.todoList} isAllDone={this.state.isAllDone}/>
				<Footer todoList={this.state.todoList}/>
			</div>
		);
	};

	_onChange = () => {
		this.setState(this._getState());
	};

	_getState = () => {
		return {
			todoList: TodoStore.getAll(),
			isAllDone: TodoStore.isAllDone()
		};
	};
}

export default Page;


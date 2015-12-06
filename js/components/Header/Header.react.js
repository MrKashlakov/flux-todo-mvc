'use strict';

import React from 'react';
import TextInput from './../TextInput/TextInput.react.js';

import './Header.post.css';

class Header extends React.Component {
	render() {
		return (
			<header className="header">
				<div className="header__title">Todo List</div>
			</header>
		);
	}
}

export default Header;
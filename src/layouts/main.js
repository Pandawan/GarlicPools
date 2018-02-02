import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/index';
import About from '../pages/about'

class Header extends Component {
	render() {
		return (
			<main className='section'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/about' component={About} />
				</Switch>
			</main>
		);
	}
}

export default Header;

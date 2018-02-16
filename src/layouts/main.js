import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/index';
import Pool from '../pages/pool'

class Header extends Component {
	render() {
		return (
			<main className='section'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/pool/:id' component={Pool} />
					<Route path='/pool' component={Pool} />
				</Switch>
			</main>
		);
	}
}

export default Header;

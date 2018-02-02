import React, { Component } from 'react';

import Header from './header'
import Main from './main'

class Layouts extends Component {
	render() {
		return (
			<div className='container'>
				<Header />
				<Main />
			</div>
		);
	}
}

export default Layouts; 
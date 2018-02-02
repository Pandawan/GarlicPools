import React, { Component } from 'react';

import data from '../data.json';

class Home extends Component {
	render() {
		return(
			<div>
				<h1>About {data.site.title}</h1>
				<p>Site for stuff</p>
			</div>
		);
	}
}

export default Home;


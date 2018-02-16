import React, { Component } from 'react';

import PoolList from '../components/poollist';
import About from '../components/about';
import data from '../data.json';

class Home extends Component {
	render() {
		return(
			<div>
				<h1 className='title'>{data.site.title}</h1>
				<PoolList data={data}/>
				<About />
			</div>
		);
	}
}

export default Home;

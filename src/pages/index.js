import React, { Component } from 'react';

import PoolList from '../components/poollist';
import data from '../data.json';

class Home extends Component {
	render() {
		return(
			<div>
				<h1 className='title'>{data.site.title}</h1>
				<PoolList data={data}/>
			</div>
		);
	}
}

export default Home;

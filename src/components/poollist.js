import React from 'react';

import ListItem from './listitem';
import BoxItem from './boxitem';
import Helper from '../helpers';

class PoolList extends React.Component {
	constructor () {
		super();
		this.state = {
			pools: [],
			totalRate: 0,
			width: window.innerWidth
		}
	};
	componentDidMount () {
		window.addEventListener('resize', () => { 
			this.setState({ width: window.innerWidth });
		});
		this.fetchData(() => {
			let rate = 0;
			for (var index in this.state.pools) {
				// Skip prototypes and such
				if (!this.state.pools.hasOwnProperty(index)) continue;

				// eslint-disable-next-line
				Helper.getLatestStats(this.state.pools[index].stats, (newLatest) => {
					rate += (newLatest.data) ? newLatest.data.hashrate : 0;
				});
			}
			this.setState({totalRate: rate});
		});
	};
	componentWillUnmount() {
		window.removeEventListener('resize', () => { 
			this.setState({ width: window.innerWidth });
		});
	};
 	fetchData(cb) {
		const api = this.props.data.api;
		// Fetch data from API
		fetch(api)
			.then((response) => response.json())
			.then((responseJson) => {
				if (!responseJson.success) console.error('Something went wrong...');

				// Create a list of pools from data
				let pools = [];
				for (let index in responseJson.data) {
					// Skip prototypes and such
					if (!responseJson.data.hasOwnProperty(index)) continue;

					// Get pool and add it to array
					let pool = responseJson.data[index];
					pools.push(pool);
				}
				// Set in state so that everything is saved
				this.setState({ api: api, pools: pools }, cb);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	render() {
		const isMobile = this.state.width <= 768;

		if (isMobile) {
			return (
				<div>
					{this.state.pools.map((data, index) =>
						<BoxItem data={data} key={index} totalRate={this.state.totalRate}/>
					)}
				</div>
			);
		}
		else {
			return (
				<div>
					<table className='table is-hoverable is-fullwidth'>
						<thead>
							<tr>
								<th>Pool</th>
								<th>Hashrate</th>
								<th>Ping</th>
								<th>Workers</th>
								<th>% of Total</th>
								<th>Fee</th>
								<th>Owner(s)</th>
							</tr>
						</thead>
						<tbody>
							{this.state.pools.map((data, index) =>
								<ListItem data={data} key={index} mobile={false} totalRate={this.state.totalRate}/>
							)}
						</tbody>
					</table>
				</div>
			);
		}
	};
}

export default PoolList;

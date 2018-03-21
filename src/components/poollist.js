import React from 'react';
import { connect } from 'react-redux';
import { poolsFetchData } from '../actions/pools';

import ListItem from './listitem';
import BoxItem from './boxitem';

class PoolList extends React.Component {
	constructor () {
		super();
		this.state = {
			pools: [],
			totalRate: 0,
			width: window.innerWidth,
			loading: false,
			error: false
		}
	};
	componentDidMount () {
		window.addEventListener('resize', () => { 
			this.setState({ width: window.innerWidth });
		});
		this.props.fetchData(this.props.data.api);
	};
	componentWillUnmount() {
		window.removeEventListener('resize', () => { 
			this.setState({ width: window.innerWidth });
		});
	};
	render() {
		const isMobile = this.state.width <= 768;

		if (this.props.loading || !this.props.pools || !this.props.pools.success) {
			return (
				<div>
					<p>Loading...</p>
				</div>
			);
		}
		else if (this.props.error) {
			return (
				<div>
					<p>Oops, something went wrong... Please try again.</p>
				</div>
			);
		}
		else if (isMobile) {
			return (
				<div>
					{this.props.pools.array.map((data, index) =>
						<BoxItem data={data} key={index}/>
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
								<th>Fee</th>
							</tr>
						</thead>
						<tbody>
							{this.props.pools.array.map((data, index) =>
								<ListItem data={data} key={index} mobile={false}/>
							)}
						</tbody>
					</table>
				</div>
			);
		}
	};
}

const mapStateToProps = (state) => {
    return {
        pools: state.pools,
        error: state.poolsHasErrored,
        loading: state.poolsIsLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(poolsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolList);
import React, { Component } from 'react';

import data from '../data.json';
import PoolInfo from '../components/poolinfo';

import { connect } from 'react-redux';
import { poolsFetchData } from '../actions/pools';

class Pool extends Component {
	componentDidMount () {
		this.props.fetchData(data.api);
	};
	render() {
		const id = this.props.match.params.id;

		if (!id) {
			return (
				<div>
					<p>Error: No pool id given...</p>
				</div>
			);
		}
		else if (this.props.loading || !this.props.pools || !this.props.pools.success) {
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
		else {
			return(
				<div>
					<PoolInfo data={this.props.pools.array[id]}/>
				</div>
			);
		}
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(Pool);

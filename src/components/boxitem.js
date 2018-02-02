import React from 'react';
import Helper from '../helpers';

class BoxItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			latest: {}
		}
	};
	componentDidMount () {
		Helper.getLatestStats(this.state.data.stats, (newLatest) => {
			this.setState({ latest: newLatest });
		});
	};
	render() {
		const { latest } = this.state;
		if (latest.done) {
			if (latest.data) {
				return this.renderItem();
			}
			else {
				/*
				return (
					<div className='card'>
						<div className='card-container'><p>Failed to load data for {this.state.data.pool.name}</p></div>
					</div>
				);
				*/
				return null;
			}
		}
		else {
			return (
				<div className='card'>
					<div className='card-container'><p>Loading data...</p></div>
				</div>
			);
		}
	};
	renderItem() {
		return (
			<div className='card'>
				<div className='card-header'>
					<h3 className='card-header-title is-h3'><a href={this.state.data.pool.website}>{this.state.data.pool.name}</a></h3>
				</div>
				<div className='card-content'>
					<ul>
						<li><b>Hashrate</b>: {Helper.convertToReadable(this.state.latest.data.hashrate)}</li>
						<li><b>Workers</b>: {this.state.latest.data.workers}</li>
						<li><b>Fee</b>: {this.state.data.pool.fee}%</li>
					</ul>
				</div>
			</div>
		);
	};
}

export default BoxItem;
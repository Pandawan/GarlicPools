import React from 'react';
import Helper from '../helpers';

class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			latest: {}
		}
	};
	componentDidMount () {
		Helper.getLatestStats(this.state.data.stats, (newLatest) => {
			this.setState({ latest: newLatest },);
		});
	};
	render() {
		const { latest } = this.state;
		if (latest.done) {
			if (latest.data) {
				return this.renderTable();
			}
			else {
				/*
				return (
					<tr>
						<td><span>Failed to load data for {this.state.data.pool.name}</span></td>
					</tr>
				);
				*/
				return null;
			}
		}
		else {
			return (
				<tr>
					<td><span>Loading data...</span></td>
				</tr>
			);
		}
	};
	renderTable() {
		return (
			<tr>
				<td><a href={this.state.data.pool.website}>{this.state.data.pool.name}</a></td>
				<td>{Helper.convertToReadable(this.state.latest.data.hashrate)}</td>
				<td>{this.state.latest.data.ping}</td>
				<td>{this.state.latest.data.workers}</td>
				<td>{this.state.latest.data.hashrate ? (Math.round(this.state.latest.data.hashrate / this.props.totalRate * 100)) : 0}%</td>
				<td>{this.state.data.pool.fee}%</td>
				<td>{this.state.data.pool.owner}</td>
			</tr>
		);
	};
}

export default ListItem;
import React from 'react';
import Helper from '../helpers';

class PoolInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latest: {}
		}
	};
	componentDidMount () {
		Helper.getLatestStats(this.props.data.stats, (newLatest) => {
			this.setState({ latest: newLatest });
		});
	};
	render() {
		const { latest } = this.state;
		if (latest.done) {
			if (latest.data) {
				return (
					<div>
						<h1 className='title'>{this.props.data.pool.name}</h1>
						<pre>{JSON.stringify(this.props.data, null, '\t')}</pre>
					</div>
				);
			}
			else {
				return null;
			}
		}else {
			return (
				<div>
					<p>Loading data...</p>
				</div>
			);
		}
		
	};
}

export default PoolInfo;
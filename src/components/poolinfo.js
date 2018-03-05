import React from 'react';
import Helper from '../helpers';
import { Link } from 'react-router-dom';

// Import font awesome icons
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
fontawesome.library.add(regular.faTimesCircle);

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
						<div className='pool-header'>
							<h1 className='title'>{this.props.data.pool.name}</h1>
							<Link to='/' className='close-button'><i className="far fa-times-circle"></i></Link>
						</div>
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
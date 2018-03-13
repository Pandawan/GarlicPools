/* global Plotly:true */

import React from 'react';
import Helper from '../helpers';
import { Link } from 'react-router-dom';
import createPlotlyComponent from 'react-plotly.js/factory';

// Import font awesome icons
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
fontawesome.library.add(regular.faTimesCircle);

const Plot = createPlotlyComponent(Plotly);

class PoolInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latest: {},
			plotData: { data: { hashrate: []}, layout: {}}
		}
	};
	componentDidMount () {
		Helper.getLatestStats(this.props.data.stats, (newLatest) => {
			this.setState({ latest: newLatest });
			this.getPlotData();
		});
	};
	getPlotData() {
		const plotData = { data: { hashrate: [], workers: [], ping: []}, layout: { plotBackground: '#f3f6fa', margin: {t: 40, b: 35}, xaxis: { type: 'date' }, yaxis: { tickformat: 's', type: 'linear' } } };
		// Hashrate plot
		let hashrateResults = Object.values(this.props.data.stats).map(a => a.hashrate);
		plotData.data.hashrate.push({ x: Object.keys(this.props.data.stats).map(a => new Date(parseInt(a * 1000, 10))), y: hashrateResults, hovertext: hashrateResults.map(a => Helper.convertToReadable(a)), hoverinfo: 'text' } );
		// Workers
		let workersResults = Object.values(this.props.data.stats).map(a => a.workers);
		plotData.data.workers.push({ x: Object.keys(this.props.data.stats).map(a => new Date(parseInt(a * 1000, 10))), y: workersResults});
		// Ping
		let pingResults = Object.values(this.props.data.stats).map(a => a.ping);
		plotData.data.ping.push({ x: Object.keys(this.props.data.stats).map(a => new Date(parseInt(a * 1000, 10))), y: pingResults});

		this.setState({plotData: plotData});
	};
	updateLabels() {

	};
	render() {
		const { latest } = this.state;
		if (latest.done) {
			if (latest.data) {
				return (
					<div>
						<div className='pool-header'>
							<h1 className='title pool-info-name'>{this.props.data.pool.name}</h1>
							<Link to='/' className='close-button'><i className="far fa-times-circle"></i></Link>
						</div>
						<h2 className='subtitle pool-info-stratum'><code>{this.props.data.pool.stratum}</code></h2>
						<div className='pool-info-section pool-info-extra'>
							<p className='pool-info-owner'></p>
						</div>
						<div className='pool-info-section pool-info-latest'>
							<p className='pool-info-hashrate'>Current hashrate {Helper.convertToReadable(latest.data.hashrate)}</p>
							<p className='pool-info-hashrate'>Current workers {latest.data.workers}</p>
							<p className='pool-info-hashrate'>Current ping {latest.data.ping}</p>
						</div>
						<div className='pool-info-section pool-info-plots'>
							<h1>Past Data</h1>
							<Plot className='data-plots' data={this.state.plotData.data.hashrate} layout={this.state.plotData.layout} config={{displayModeBar: false}} onRelayout={this.updateLabels()}/>
							<Plot className='data-plots' data={this.state.plotData.data.workers} layout={this.state.plotData.layout} config={{displayModeBar: false}} onRelayout={this.updateLabels()}/>
							<Plot className='data-plots' data={this.state.plotData.data.ping} layout={this.state.plotData.layout} config={{displayModeBar: false}} onRelayout={this.updateLabels()}/>
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
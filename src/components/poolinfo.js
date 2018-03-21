/* global Plotly:true */

import React from 'react';
import Helper from '../helpers';
import { Link } from 'react-router-dom';
import createPlotlyComponent from 'react-plotly.js/factory';
import update from 'immutability-helper';

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
			this.getPlotData(() => {
				// Resize once plot data has been made
				this.setupPlotResize();
			});
		});
	};
	getPlotData(cb) {
		let plotData = { data: { hashrate: [], workers: [], ping: []}, layout: { plotBackground: '#f3f6fa', margin: {t: 40, b: 35}, xaxis: { type: 'date' }, yaxis: { tickformat: 's', type: 'linear' } } };
		// Hashrate plot
		//let hashrateResults = Object.values(this.cleanupData(this.props.data.stats, 1000)).map(a => a.hashrate);
		let hashrateResults = Object.values(this.props.data.stats).map(a => a.hashrate);
		plotData.data.hashrate.push({ x: Object.keys(this.props.data.stats).map(a => new Date(parseInt(a * 1000, 10))), y: hashrateResults, hovertext: hashrateResults.map(a => Helper.convertToReadable(a)), hoverinfo: 'text' } );
		// Workers
		let workersResults = Object.values(this.props.data.stats).map(a => a.workers);
		plotData.data.workers.push({ x: Object.keys(this.props.data.stats).map(a => new Date(parseInt(a * 1000, 10))), y: workersResults});
		// Ping
		let pingResults = Object.values(this.props.data.stats).map(a => a.ping);
		plotData.data.ping.push({ x: Object.keys(this.props.data.stats).map(a => new Date(parseInt(a * 1000, 10))), y: pingResults});

		this.setState({plotData: plotData}, cb);
	};
	/*
	cleanupData(data, threshold){
		let newData = {};
		newData[Object.keys(data)[0]] = Object.values(data)[0];
		for(let i = 1; i < Object.keys(data).length; i++){
			let average = (parseInt(Object.keys(data)[--i], 10) + parseInt(Object.keys(data)[++i], 10))/2;
			if (Math.abs(Object.keys(data)[i] - average) > threshold){
				newData[Object.keys(data)[i]] = Object.values(data)[i];
			}
		}
		newData[Object.keys(data)[Object.keys(data).length - 1]] = Object.values(data)[Object.keys(data).length - 1];
		console.log('Cleaned up Data. Original: ' + Object.keys(data).length + ' New: ' + Object.keys(newData).length + ' Removed: ' + (Object.keys(data).length - Object.keys(newData).length));
		return newData;
	};
	*/
	setupPlotResize() {
		// Add auto-resizing of plot
		let resizePlots = function () {
			let width = document.querySelector('main.section').getBoundingClientRect().width;
			let plotData = update(this.state.plotData, { layout: { width: { $set: width * 0.9 } } });
			this.setState({plotData: plotData});
		}.bind(this);
		window.addEventListener('resize', resizePlots);
		resizePlots();
	};
	getLayoutForPlot(name) {
		let layout = Object.assign({}, this.state.plotData.layout);
		layout.title = name;
		return layout;
	};
	render() {
		const { latest } = this.state;
		if (latest.done) {
			if (latest.data) {
				return (
					<div>
						<div className='pool-header'>
							<h1 className='title is-2 pool-info-name'>{this.props.data.pool.name}</h1>
							<Link to='/' className='close-button'><i className="far fa-times-circle"></i></Link>
						</div>
						<h2 className='subtitle pool-info-stratum'><code>{this.props.data.pool.stratum}</code></h2>
						<div className='pool-info-section pool-info-extra'>
							<p className='pool-info-website'><a href={this.props.data.pool.website}>Website</a></p>
							<p className='pool-info-fee'>Fee: {this.props.data.pool.fee}%</p>
							<p className='pool-info-owner'>Owned by {this.props.data.pool.owner}</p>
						</div>
						<div className='pool-info-section pool-info-latest'>
							<h1 className='title'>Latest Stats</h1>
							<p className='pool-info-hashrate'>Hashrate: {Helper.convertToReadable(latest.data.hashrate)}</p>
							<p className='pool-info-hashrate'>Workers: {latest.data.workers}</p>
							<p className='pool-info-hashrate'>Ping: {latest.data.ping}ms</p>
						</div>
						<div className='pool-info-section pool-info-plots'>
							<h1 className='title'>Past Data</h1>
							<Plot className='data-plots' data={this.state.plotData.data.hashrate} layout={this.getLayoutForPlot('Hashrate (H/s)')} config={{displayModeBar: true}}/>
							<Plot className='data-plots' data={this.state.plotData.data.workers} layout={this.getLayoutForPlot('Workers')} config={{displayModeBar: true}}/>
							<Plot className='data-plots' data={this.state.plotData.data.ping} layout={this.getLayoutForPlot('Ping (ms)')} config={{displayModeBar: true}}/>
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
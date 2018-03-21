import React from 'react';
import Chart from 'chart.js'; 


class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			data: this.formattedData(),
			options: this.customOptions()
		}
	};
	customOptions() {
		let data = Object.assign({}, this.props.options);
		// Set general options for all graphs here
		return data;
	}
	formattedData() {
		let data = { datasets: []};
		for(let index in this.props.keys) {
			let obj = {x: this.props.keys[index], y: this.props.values[index]};
			data.datasets.push(obj);
		}
		return data;
	};
	componentDidMount(){
		// After render
		let ctx = document.getElementById("chart-" + this.state.name);
		let chart = new Chart(ctx, {
			type: 'line',
			data: this.state.data,
			options: this.state.options
		});
	};
	render() {
		return (
			<div>
				<canvas id={"chart-" + this.state.name} width="400" height="400"></canvas>
			</div>
		);
	};
}

export default Graph;
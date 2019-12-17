// Importing dependencies
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import theme from '../../Constants/Theme.js';

// Creating class for Gender Chart so it can hold state and receive props
class GenderChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			totalCount: 0,
			data: [],
			keys: ['Female', 'Male'],
			color: 'nivo',
			femalePercentage: 0,
			malePercentage: 0,
			femaleCount: 0,
			maleCount: 0
		};
	}

	componentDidMount() {
		this.props.getDropDownDefault(this.props.pathname);

		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/users/all/gender/all`)
			.then(res => {
				//console.log('totalCount', res.data.length)
				this.setState(
					{
						...this.state,
						users: res.data,
						totalCount: res.data.length,
						femaleCount: res.data.reduce(function(n, user) {
							return n + (user.gender === 'Female');
						}, 0),
						maleCount: res.data.reduce(function(n, user) {
							return n + (user.gender === 'Male');
						}, 0)
					},
					() => {
						console.log('Female Count New Method', this.state.femaleCount);
						console.log('Male Count New Method', this.state.maleCount);
						this.setPercentages();
					}
				);
			});
	}

	setPercentages = () => {
		const totalCount = this.state.totalCount;
		console.log('totalCount', totalCount);
		console.log('maleCount', this.state.maleCount);
		// let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
		let femalePercentage = Math.round(
			(this.state.femaleCount / totalCount) * 100
		);
		let malePercentage = Math.round((this.state.maleCount / totalCount) * 100);
		this.setState(
			{
				...this.state,
				femalePercentage: femalePercentage,
				malePercentage: malePercentage
			},
			() => {
				this.setState({
					...this.state,
					data: [
						{
							Gender: 'Female',
							Female: this.state.femalePercentage,
							FemaleColor: 'hsl(65, 70%, 50%)'
						},
						{
							Gender: 'Male',
							Male: this.state.malePercentage,
							MaleColor: 'hsl(65, 70%, 50%)'
						}
					]
				});
			}
		);
	};

	render() {
		return (
			<div className="Chart">
				<h2>Gender</h2>
				<ResponsiveBar
					data={this.state.data} // Data needed
					keys={this.state.keys} // Values to display in Y axis
					indexBy="Gender"
					margin={{ top: 50, right: 130, bottom: 75, left: 80 }}
					padding={0.3}
					groupMode="stacked"
					colors={{ scheme: this.state.color }}
					labelFormat={d => <tspan y={-15}>{d}% </tspan>}
					labelForm={d => <text>{d}% </text>}
					borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
					maxValue={100}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'Gender',
						legendPosition: 'middle',
						legendOffset: 65
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'Percentage of Traders',
						legendPosition: 'middle',
						legendOffset: -70
					}}
					labelSkipWidth={0}
					labelSkipHeight={0}
					labelTextColor="black"
					theme={theme}
					tooltip={({ id, value }) => (
						<strong
							style={{
								color: '#000000',
								fontSize: '15px',
								fontFamily: 'Helvetica'
							}}>
							{id}: {value}%
						</strong>
					)}
					legends={[
						{
							dataFrom: 'keys',
							anchor: 'bottom-right',
							direction: 'column',
							justify: false,
							translateX: 120,
							translateY: 0,
							itemsSpacing: 2,
							itemWidth: 100,
							itemHeight: 20,
							itemDirection: 'left-to-right',
							itemOpacity: 0.85,
							symbolSize: 20,
							effects: [
								{
									on: 'hover',
									style: {
										itemOpacity: 1
									}
								}
							]
						}
					]}
					animate={true}
					motionStiffness={90}
					motionDamping={15}
				/>
				<div className="lineCont">
					<div className="lineOne">
						<h2 className="method-title">Methodology Note</h2>
					</div>
					<div className="lineTwo"></div>
				</div>
				<p>
					It is a long established fact that a reader will be distracted by the
					readable content of a page when looking at its layout. The point of
					using Lorem Ipsum is that it has a more-or-less normal distribution of
					letters, as opposed to using 'Content here, content here', making it
					look like readable English. Many desktop publishing packages and web
					page editors now use Lorem Ipsum as their default model text, and a
					search for 'lorem ipsum' will uncover many web sites still in their
					infancy. Various versions have evolved over the years, sometimes by
					accident, sometimes on purpose (injected humour and the like).
				</p>
			</div>
		);
	}
}

export default GenderChart;

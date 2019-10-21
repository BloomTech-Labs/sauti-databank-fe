import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import theme from '../../../Constants/Theme';

class ProceduresComChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			totalCount: 0,
			data: [],
			keys: [
				'Maize',
				'Clothes_and_Shoes_New',
				'Clothes_and_Shoes_Used',
				'Rice_Processed',
				'Cosmetics',
				'Millet',
				'Bananas_Matoke',
				'Oranges',
				'Tomatoes',
				'Maize_Flour',
				'Avocado'
			],
			color: 'nivo',
			// Percentages
			Maize_Percentage: 0,
			Clothes_and_shoes_Percentage_New: 0,
			Clothes_and_shoes_Percentage_Used: 0,
			Rice_Processed_Percentage: 0,
			Cosmetics_Percentage: 0,
			Millet_Percentage: 0,
			Bananas_Matoke_Percentage: 0,
			Oranges_Percentage: 0,
			Tomatoes_Percentage: 0,
			Maize_Flour_Percentage: 0,
			Avocado_Percentage: 0,

			//  Count
			Maize_Count: 0,
			Clothes_and_shoes_new_Count: 0,
			Clothes_and_shoes_used_Count: 0,
			Rice_Processed_Count: 0,
			Cosmetics_Count: 0,
			Millet_Count: 0,
			Bananas_Matoke_Count: 0,
			Oranges_Count: 0,
			Tomatoes_Count: 0,
			Maize_Flour_Count: 0,
			Avocado_Count: 0
		};
	}

	componentDidMount() {
		this.props.getDropDownDefault(this.props.pathname);

		// Hard work put to backend will change axios calls
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/procedure-com`)
			.then(res => {
				//console.log('totalCount', res.data.length)
				this.setState(
					{
						...this.state,
						users: res.data,
						totalCount: res.data.length,
						Maize_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Maize');
						}, 0),
						Clothes_and_shoes_new_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Clothes and Shoes (New)');
						}, 0),
						Clothes_and_shoes_used_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Clothes and Shoes (Used)');
						}, 0),
						Rice_Processed_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Rice - Processed');
						}, 0),
						Cosmetics_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Cosmetics');
						}, 0),
						Millet_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Millet');
						}, 0),
						Bananas_Matoke_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Bananas - Matoke');
						}, 0),
						Oranges_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Oranges');
						}, 0),
						Tomatoes_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Tomatoes');
						}, 0),
						Maize_Flour_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Maize Flour');
						}, 0),
						Avocado_Count: res.data.reduce(function(n, user) {
							return n + (user.request_value === 'Avocado');
						}, 0)
					},
					() => {
						this.setPercentages();
					}
				);
			});
	}

	setPercentages = () => {
		const totalCount = this.state.totalCount;
		// let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
		let Maize_Percentage = Math.round(
			(this.state.Maize_Count / totalCount) * 100
		);
		let Clothes_and_shoes_Percentage_New = Math.round(
			(this.state.Clothes_and_shoes_new_Count / totalCount) * 100
		);
		let Clothes_and_shoes_Percentage_Used = Math.round(
			(this.state.Clothes_and_shoes_used_Count / totalCount) * 100
		);
		let Rice_Processed_Percentage = Math.round(
			(this.state.Rice_Processed_Count / totalCount) * 100
		);
		let Cosmetics_Percentage = Math.round(
			(this.state.Cosmetics_Count / totalCount) * 100
		);
		let Millet_Percentage = Math.round(
			(this.state.Millet_Count / totalCount) * 100
		);
		let Bananas_Matoke_Percentage = Math.round(
			(this.state.Bananas_Matoke_Count / totalCount) * 100
		);
		let Oranges_Percentage = Math.round(
			(this.state.Oranges_Count / totalCount) * 100
		);
		let Tomatoes_Percentage = Math.round(
			(this.state.Tomatoes_Count / totalCount) * 100
		);
		let Maize_Flour_Percentage = Math.round(
			(this.state.Maize_Flour_Count / totalCount) * 100
		);
		let Avocado_Percentage = Math.round(
			(this.state.Avocado_Count / totalCount) * 100
		);
		this.setState(
			{
				...this.state,
				Maize_Percentage: Maize_Percentage,
				Clothes_and_shoes_Percentage_New: Clothes_and_shoes_Percentage_New,
				Clothes_and_shoes_Percentage_Used: Clothes_and_shoes_Percentage_Used,
				Rice_Processed_Percentage: Rice_Processed_Percentage,
				Cosmetics_Percentage: Cosmetics_Percentage,
				Millet_Percentage: Millet_Percentage,
				Bananas_Matoke_Percentage: Bananas_Matoke_Percentage,
				Oranges_Percentage: Oranges_Percentage,
				Tomatoes_Percentage: Tomatoes_Percentage,
				Maize_Flour_Percentage: Maize_Flour_Percentage,
				Avocado_Percentage: Avocado_Percentage
			},
			() => {
				this.setState({
					...this.state,
					data: [
						{
							Commodity: 'Maize',
							Maize: this.state.Maize_Percentage,
							MaizeColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: '(New)',
							Clothes_and_Shoes_New: this.state
								.Clothes_and_shoes_Percentage_New,
							ClothesNewColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: '(Used)',
							Clothes_and_Shoes_Used: this.state
								.Clothes_and_shoes_Percentage_Used,
							ClothesUsedColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Rice',
							Rice_Processed: this.state.Rice_Processed_Percentage,
							Rice_ProcessedColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Cosmetics',
							Cosmetics: this.state.Cosmetics_Percentage,
							CosmeticsColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Millet',
							Millet: this.state.Millet_Percentage,
							MilletColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Bananas',
							Bananas_Matoke: this.state.Bananas_Matoke_Percentage,
							Bananas_MatokeColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Oranges',
							Oranges: this.state.Oranges_Percentage,
							OrangesColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Tomatoes',
							Tomatoes: this.state.Tomatoes_Percentage,
							TomatoesColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'M_Flour',
							Maize_Flour: this.state.Maize_Flour_Percentage,
							Maize_FlourColor: 'hsl(65, 70%, 50%)'
						},
						{
							Commodity: 'Avocado',
							Avocado: this.state.Avocado_Percentage,
							AvocadoColor: 'hsl(65, 70%, 50%)'
						}
					]
				});
			}
		);
	};

	render() {
		return (
			<div className="Chart">
				<h2>Most Requested Procedures for Commodities</h2>
				<ResponsiveBar
					data={this.state.data} // Data needed
					keys={this.state.keys} // Values to display in Y axis
					indexBy="Commodity"
					margin={{ top: 50, right: 195, bottom: 75, left: 80 }}
					padding={0.1}
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
						legend: 'Commodities',
						legendPosition: 'middle',
						legendOffset: 65
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'Percentage of Commodities',
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

export default ProceduresComChart;

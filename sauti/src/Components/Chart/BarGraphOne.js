import React from 'react';
// import { useContext } from "react";
// import { GraphContext } from '../../../context';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import { ResponsiveBar } from "@nivo/bar";


class BarGraphOne extends React.Component {
    constructor(props) {
     super(props);
    };

    // const GenderFilter = ({ gender }) => {
    //   const context  = useContext(GraphContext);
    //     const {type} = context;
    //     const {data, color} = this.props.state
    //     const types = ["All", "Male", "Female"];
    //     types = types.map((item, index) => (
    //       <option key={index} value={item}>
    //         {item}
    //       </option>
    //     ));

    render(props) {
      const {data, color} = this.props.state
      const options = [
        'All', 'Male', 'Female'
      ]
      const defaultOption = options[0];
       return (
        <div className="Chart">
        <ResponsiveBar
          data={data} // Data needed 
          keys={["Male", "Female"]} // Values to display in Y axis 
          indexBy="Year"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          colors={{ scheme: color }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Year",
            legendPosition: "middle",
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "%",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
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

        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        

        {/* <form className="filter-form">
        {/* select type
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            {types}
          </select>
        </div>
        </form>
        */}
      </div>
      )
    }

}






export default BarGraphOne;
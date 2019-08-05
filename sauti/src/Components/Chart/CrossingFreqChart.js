import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ResponsiveBar } from "@nivo/bar";

class CrossingFreqChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: "All",
        yearValue: "All"
    };
  }

  onSelect = props => {
    let gender = props.value;
    this.setState({
      value: gender
    });
    this.props.genderFilter(gender);
  };

  onSelectYear = props => {
    let year = props.value;
    this.setState({
      ...this.state,
      yearValue: year
    });
    this.props.populateChart(year);
  };

  render() {
    const { data, color, keys } = this.props.state;
    const genderOptions = ["All", "Male", "Female"];
    const yearOptions = ["All", "2017", "2018", "2019"]

    return (
      <div className="Chart">
        <h2>
          Border Crossing Frequency
        </h2>
        <ResponsiveBar
          data={data} // Data needed
          keys={keys} // Values to display in Y axis
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
      </div>
    );
  }
}

export default CrossingFreqChart;
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

class CrossingFreqChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: "All",
        yearValue: "All",
        data: 
        [{
          Frequency: "Daily",
          Daily: 20,
          MaleColor: "hsl(65, 70%, 50%)",
        },
        {
          Frequency: "Weekly",
          Weekly: 30,
          MaleColor: "hsl(65, 70%, 50%)",
        },
        {
          Frequency: "Monthly",
          Monthly: 25,
          MaleColor: "hsl(65, 70%, 50%)",
        },
        {
          Frequency: "Never",
          Never: 25,
          MaleColor: "hsl(65, 70%, 50%)",
        }],
        keys: ["Daily", "Weekly", "Monthly", "Never"],
        color: "nivo",
        dailyPercent: 0,
        weeklyPercent: 0,
        monthlyPercent: 0,
        neverPercent: 0
    };
  }


  

//   onSelect = props => {
//     let gender = props.value;
//     this.setState({
//       value: gender
//     });
//     this.props.genderFilter(gender);
//   };

//   onSelectYear = props => {
//     let year = props.value;
//     this.setState({
//       ...this.state,
//       yearValue: year
//     });
//     this.props.populateChart(year);
//   };


  render() {
    const genderOptions = ["All", "Male", "Female"];
    const yearOptions = ["All", "Daily", "Weekly", "Monthly", "Never"]

    return (
      <div className="Chart">
        <h2>
          Border Crossing Frequency
        </h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Frequency"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Border Crossing Frequency",
            legendPosition: "middle",
            legendOffset: 30
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
              dataFrom: "frequency",
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
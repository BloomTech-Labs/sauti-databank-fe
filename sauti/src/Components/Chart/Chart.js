import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    Year: "2017",
    Male: 60,
    MaleColor: "hsl(65, 70%, 50%)",
    Female: 40,
    FemaleColor: "hsl(212, 70%, 50%)"
  },
  {
    Year: "2018",
    Male: 50,
    MaleColor: "hsl(65, 70%, 50%)",
    Female: 50,
    FemaleColor: "hsl(212, 70%, 50%)"
  },
  {
    Year: "2019",
    Male: 35,
    MaleColor: "hsl(65, 70%, 50%)",
    Female: 65,
    FemaleColor: "hsl(212, 70%, 50%)"
  }
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      color: "nivo"
    };
  }

  changeColor = e => {
    e.preventDefault();
    let color = "nivo"
    if (this.state.color == "nivo") {
      color = "dark2"
    }
    this.setState({
      ...this.state,
      color: color
    })
  }

  render() {
    return (
      <div className="Chart">
        <ResponsiveBar
          data={this.state.data}
          keys={["Male", "Female"]}
          indexBy="Year"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          colors={{ scheme: this.state.color }}
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
        <button onClick={this.changeColor}>Change color!</button>
      </div>
    );
  }
}

export default Chart;

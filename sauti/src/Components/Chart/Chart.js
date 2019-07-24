import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

// Nivo instructions:
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// Displays chart based on Nivo's required format
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Data array Nivo needs to display chart
      color: "nivo", // Default chart color
      sessions: [], // Sessions data pulled from backend
      male2017: 0, // Number of male searches for a given product in 2017
      female2017: 0,
      male2018: 0,
      female2018: 0,
      male2019: 0,
      female2019: 0,
      male2017percent: 0, // Percentage of people that are male that searched for a product in 2017
      female2017percent: 0,
      male2018percent: 0,
      female2018percent: 0,
      male2019percent: 0,
      female2019percent: 0
    };
  }

  componentDidMount() {
    // Axios call to get sessions data from awesome backend
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/sessions/products/1`)
      .then(res => {
        console.log(res.data);
        this.setState({
          ...this.state,
          sessions: res.data
        });
      })
      .then(() => {
        let male2017 = 0;
        let female2017 = 0;
        let male2018 = 0;
        let female2018 = 0;
        let male2019 = 0;
        let female2019 = 0;

        // Map over the sessions array to count number of males and females per year
        this.state.sessions.map(session => {
          if (session.date.includes("2017")) {
            if (session.gender == "male") {
              male2017 = male2017 + 1;
            } else {
              female2017 = female2017 + 1;
            }
          } else if (session.date.includes("2018")) {
            if (session.gender == "male") {
              male2018 = male2018 + 1;
            } else {
              female2018 = female2018 + 1;
            }
          } else {
            if (session.gender == "male") {
              male2019 = male2019 + 1;
            } else {
              female2019 = female2019 + 1;
            }
          }
        });

        console.log("2017", male2017, female2017)
        console.log("2018", male2018, female2018)
        console.log("2019", male2019, female2019)

        let total2017 = male2017 + female2017;
        let male2017percent = Math.round((male2017 / total2017) * 100);
        let female2017percent = Math.round((female2017 / total2017) * 100);

        let total2018 = male2018 + female2018;
        let male2018percent = Math.round((male2018 / total2018) * 100);
        let female2018percent = Math.round((female2018 / total2018) * 100);

        let total2019 = male2019 + female2019;
        let male2019percent = Math.round((male2019 / total2019) * 100);
        let female2019percent = Math.round((female2019 / total2019) * 100);

        console.log(male2017percent);

        this.setState({
          ...this.state,
          male2017percent: male2017percent,
          female2017percent: female2017percent,
          male2018percent: male2018percent,
          female2018percent: female2018percent,
          male2019percent: male2019percent,
          female2019percent: female2019percent
        });
        this.populateChart();
      });
  }

  populateChart = () => {
    let data = [
      {
        Year: "2017",
        Male: this.state.male2017percent,
        MaleColor: "hsl(65, 70%, 50%)",
        Female: this.state.female2017percent,
        FemaleColor: "hsl(212, 70%, 50%)"
      },
      {
        Year: "2018",
        Male: this.state.male2018percent,
        MaleColor: "hsl(65, 70%, 50%)",
        Female: this.state.female2018percent,
        FemaleColor: "hsl(212, 70%, 50%)"
      },
      {
        Year: "2019",
        Male: this.state.male2019percent,
        MaleColor: "hsl(65, 70%, 50%)",
        Female: this.state.female2019percent,
        FemaleColor: "hsl(212, 70%, 50%)"
      }
    ];
    console.log(data);
    this.setState({
      ...this.state,
      data: data
    });
  };

  changeColor = e => {
    e.preventDefault();
    let color = "nivo";
    if (this.state.color == "nivo") {
      color = "dark2";
    }
    this.setState({
      ...this.state,
      color: color
    });
  };

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

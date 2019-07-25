// Displays chart based on Nivo's required format

// Requiring dependencies 
import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

// Nivo instructions:
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// Class component because we need to store state
// Props to futureproof 

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Empty array that updates for Nivo to display 
      color: "nivo", // Default chart color
      sessions: [], // Sessions data will be pulled from backend
      male2017: 0, // Number of male searches for a given product in 2017
      female2017: 0, // Setting at zero because updates based on backend data 
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
        // Variables need to be set to zero here as well, before we do this.setState 
        let male2017 = 0;
        let female2017 = 0;
        let male2018 = 0;
        let female2018 = 0;
        let male2019 = 0;
        let female2019 = 0;

        // Map over the sessions array to count number of males and females per year
        this.state.sessions.map(session => {
          if (session.date.includes("2017")) {
            if (session.gender === "male") {
              male2017 += 1;
              // total2017 += 1; Possible way to clean up 
            } else {
              female2017 += 1;
              // total2017 += 1;
            }
          } else if (session.date.includes("2018")) {
            if (session.gender === "male") {
              male2018 += 1;
            } else {
              female2018 += 1;
            }
          } else {
            if (session.gender === "male") {
              male2019 += 1;
            } else {
              female2019 += 1;
            }
          }
        });

        // Made code more DRY by defining calcTotal and calcPercentage functions
        const calcTotal = (maleCount, femaleCount) => {
           let totalCount = maleCount + femaleCount
           return totalCount
        }
        let total2017 = calcTotal(male2017, female2017);
        let total2018 = calcTotal(male2018, female2018);
        let total2019 = calcTotal(male2019, female2019);

        const calcPercentage = (genderCount, totalCount) => {
          return Math.round((genderCount / totalCount) * 100);
        }

        let male2017percent = calcPercentage(male2017, total2017);
        let male2018percent = calcPercentage(male2018, total2018);
        let male2019percent = calcPercentage(male2019, total2019);
        let female2017percent = calcPercentage(female2017, total2017);
        let female2018percent = calcPercentage(female2018, total2018);
        let female2019percent = calcPercentage(female2019, total2019);

        // Setting state 
        this.setState({
          ...this.state,
          male2017percent: male2017percent,
          female2017percent: female2017percent,
          male2018percent: male2018percent,
          female2018percent: female2018percent,
          male2019percent: male2019percent,
          female2019percent: female2019percent
        });

        // Calls function that puts data in Nivo's format 
        this.populateChart();
      });
  }

  // Function that formats data in Nivo's format using this.state 
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
    
    this.setState({
      ...this.state,
      data: data
    });
  };

  // Displays the chart 
  // Going to move Responsive Bar into its own component, and render it here, will need to change props
  render() {
    return (
      <div className="Chart">
        <ResponsiveBar
          data={this.state.data} // Data needed 
          keys={["Male", "Female"]} // Values to display in Y axis 
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
      </div>
    );
  }
}

// Exporting 
export default Chart;

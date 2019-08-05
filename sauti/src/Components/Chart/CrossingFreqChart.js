import React from "react";
import { ResponsiveBar } from "@nivo/bar";

class CrossingFreqChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        keys: ["Daily", "Weekly", "Monthly", "Never"],
        color: "nivo",
        dailyPercent: 0,
        weeklyPercent: 0,
        monthlyPercent: 0,
        neverPercent: 0,
    };
  }

//  getPercentages = () => {


//  }

componentDidMount(props) {
    let dailyCount = 0;
    let weeklyCount = 0;
    let monthlyCount = 0;
    let neverCount = 0;

    console.log('akjshdajd', this.props.distinctUsers)
    this.props.distinctUsers.map(element => {
        if (element.crossing_freq === 'Daily') {
            dailyCount += 1;
        }
        else if(element.crossing_freq === 'Weekly') {
            weeklyCount += 1;
        }
        else if(element.crossing_freq === 'Monthly') {
            monthlyCount += 1;
        }
        else if(element.crossing_freq === 'Never') {
            neverCount += 1;
        }
    })
    

     let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;

    let dailyPercent = Math.round((weeklyCount / totalCount) * 100);
    let weeklyPercent = Math.round((weeklyCount / totalCount) * 100);
    let monthlyPercent = Math.round((monthlyCount / totalCount) * 100);
    let neverPercent = Math.round((neverCount / totalCount) * 100);
    console.log('monthlyPercent', monthlyPercent)
    console.log('monthly count', monthlyCount)
    
    this.setState({
        ...this.state,
        dailyPercent: dailyPercent,
        weeklyPercent: weeklyPercent,
        monthlyPercent: monthlyPercent,
        neverPercent: neverPercent,
        data: [
            {   Frequency: "Daily",
                Daily: this.state.dailyPercent,
                DailyColor: "hsl(65, 70%, 50%)",
              },
              {
                Frequency: "Weekly",
                Weekly: this.state.weeklyPercent,
                WeeklyColor: "hsl(65, 70%, 50%)",
              },
              {
                Frequency: "Monthly",
                Monthly: this.state.monthlyPercent,
                MonthlyColor: "hsl(65, 70%, 50%)",
              },
              {
                Frequency: "Never",
                Never: this.state.neverPercent,
                NeverColor: "hsl(65, 70%, 50%)",
              }
        ],
    })

}

  
  render() {
    // const genderOptions = ["All", "Male", "Female"];
    // const yearOptions = ["All", "Daily", "Weekly", "Monthly", "Never"]
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
import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from '../../Constants/Theme.js'
// Creating theme for nivo graphs


class CrossingFreqChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Daily", "Weekly", "Monthly", "Never"],
      color: "nivo",
      dailyPercentage: 0,
      weeklyPercentage: 0,
      monthlyPercentage: 0,
      neverPercentage: 0,
      dailyCount: 0,
      weeklyCount: 0,
      monthlyCount: 0,
      neverCount: 0
    };
  }
  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);
    
    axios
      .get(
        "https://staging-sauti-labs-14.herokuapp.com/users/all/crossingfreq/all"
      )
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length,
            dailyCount: res.data.reduce(function(n, user) {
              return n + (user.crossing_freq === "Daily")
            }, 0),
            weeklyCount: res.data.reduce(function(n, user) {
              return n + (user.crossing_freq === "Weekly")
            }, 0),
            monthlyCount: res.data.reduce(function(n, user) {
              return n + (user.crossing_freq === "Monthly")
            }, 0),
            neverCount: res.data.reduce(function(n, user) {
              return n + (user.crossing_freq === "Never")
            }, 0),
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
    let dailyPercentage = Math.round(
      (this.state.dailyCount / totalCount) * 100
    );
    let weeklyPercentage = Math.round(
      (this.state.weeklyCount / totalCount) * 100
    );
    let monthlyPercentage = Math.round(
      (this.state.monthlyCount / totalCount) * 100
    );
    let neverPercentage = Math.round(
      (this.state.neverCount / totalCount) * 100
    );
    this.setState(
      {
        ...this.state,
        dailyPercentage: dailyPercentage,
        weeklyPercentage: weeklyPercentage,
        monthlyPercentage: monthlyPercentage,
        neverPercentage: neverPercentage
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Frequency: "Daily",
              Daily: this.state.dailyPercentage,
              DailyColor: "hsl(65, 70%, 50%)"
            },
            {
              Frequency: "Weekly",
              Weekly: this.state.weeklyPercentage,
              WeeklyColor: "hsl(65, 70%, 50%)"
            },
            {
              Frequency: "Monthly",
              Monthly: this.state.monthlyPercentage,
              MonthlyColor: "hsl(65, 70%, 50%)"
            },
            {
              Frequency: "Never",
              Never: this.state.neverPercentage,
              NeverColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };
  render() {
    return (
      <div className="Chart">
        <h2>Border Crossing Frequency</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Frequency"
          margin={{ top: 50, right: 130, bottom: 75, left: 80 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          // Testing: borderWidth = {2}
          // labelFormat={(d3.format(".0f"))}
          labelFormat={d => <tspan y={-15}>{d}% </tspan>}
          labelForm={d => <text>{d}% </text>}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Crossing Frequency",
            legendPosition: "middle",
            legendOffset: 65,
            legendColor: "red"
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Traders",
            legendPosition: "middle",
            legendOffset: -70
          }}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelTextColor="black"
          theme={theme}
          tooltip={({ id, value}) => (
            <strong style={{color: "#000000", fontSize: "15px", fontFamily: "Helvetica"}}>
                {id}: {value}%
            </strong>
        )}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
        <div className="lineCont">
          <div className="lineOne">
            <h2 className="method-title">Methodology Note</h2>
          </div>
          <div className="lineTwo" />
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
export default CrossingFreqChart;

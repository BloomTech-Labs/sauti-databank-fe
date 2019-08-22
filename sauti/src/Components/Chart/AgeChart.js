import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from '../../Constants/Theme.js'


class AgeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Twenties", "Thirties", "Forties", "Teens", "Fifties", "Sixties"],
      color: "nivo",
      twentiesPercentage: 0,
      thirtiesPercentage: 0,
      fortiesPercentage: 0,
      teensPercentage: 0,
      fiftiesPercentage: 0,
      sixtiesPercentage: 0,
      twentiesCount: 0,
      thirtiesCount: 0,
      fortiesCount: 0,
      teensCount: 0,
      fiftiesCount: 0,
      sixtiesCount: 0
    };
  }

  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);

    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/age/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length,
            twentiesCount: res.data.reduce(function(n, user) {
              return n + (user.age === "10-20")
            }, 0),
            thirtiesCount: res.data.reduce(function(n, user) {
              return n + (user.age === "20-30")
            }, 0),
            fortiesCount: res.data.reduce(function(n, user) {
              return n + (user.age === "30-40")
            }, 0),
            teensCount: res.data.reduce(function(n, user) {
              return n + (user.age === "40-50")
            }, 0),
            fiftiesCount: res.data.reduce(function(n, user) {
              return n + (user.age === "50-60")
            }, 0),
            sixtiesCount: res.data.reduce(function(n, user) {
              return n + (user.age === "60-70")
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
    let twentiesPercentage = Math.round(
      (this.state.twentiesCount / totalCount) * 100
    );
    let thirtiesPercentage = Math.round(
      (this.state.thirtiesCount / totalCount) * 100
    );
    let fortiesPercentage = Math.round(
      (this.state.thirtiesCount / totalCount) * 100
    );
    let teensPercentage = Math.round(
      (this.state.teensCount / totalCount) * 100
    );
    let fiftiesPercentage = Math.round(
      (this.state.fiftiesCount / totalCount) * 100
    );
    let sixtiesPercentage = Math.round(
      (this.state.sixtiesCount / totalCount) * 100
    );
    this.setState(
      {
        ...this.state,
        twentiesPercentage: twentiesPercentage,
        thirtiesPercentage: thirtiesPercentage,
        fortiesPercentage: fortiesPercentage,
        teensPercentage: teensPercentage,
        fiftiesPercentage: fiftiesPercentage,
        sixtiesPercentage: sixtiesPercentage
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Age: "20-30",
              Twenties: this.state.twentiesPercentage,
              TwentiesColor: "hsl(65, 70%, 50%)"
            },
            {
              Age: "30-40",
              Thirties: this.state.thirtiesPercentage,
              ThirtiesColor: "hsl(65, 70%, 50%)"
            },
            {
              Age: "40-50",
              Forties: this.state.fortiesPercentage,
              FortiesColor: "hsl(65, 70%, 50%)"
            },
            {
              Age: "10-20",
              Teens: this.state.teensPercentage,
              TeensColor: "hsl(65, 70%, 50%)"
            },
            {
              Age: "50-60",
              Fifties: this.state.fiftiesPercentage,
              FiftiesColor: "hsl(65, 70%, 50%)"
            },
            {
              Age: "60-70",
              Sixties: this.state.sixtiesPercentage,
              SixtiesColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };

  render() {

    return (
      <div className="Chart">
        <h2>Age</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Age"
          margin={{ top: 50, right: 130, bottom: 75, left: 80 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          labelSkipHeight={0}
          labelSkipWidth={0}
          labelFormat={d => <tspan y={-15}>{d}% </tspan>}
          labelForm={d => <text>{d} % </text>}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Age",
            legendPosition: "middle",
            legendOffset: 65
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Traders",
            legendPosition: "middle",
            legendOffset: -70
          }}
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

export default AgeChart;

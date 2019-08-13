// Importing dependencies
import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const theme = {
  //background: "#222222",
  axis: {
    // fontSize: "100px",
    // tickColor: "#eee",
    ticks: {
      // line: {
      //   stroke: "#555555"
      // },
      text: {
        fill: "#595b5f"
      }
    },
    legend: {
      text: {
        fill: "#3c3e43"
      }
    }

  },
  labels: {
    text: {
      fontSize: "18px",
      fontWeight: "lighter",
      fontFamily: "Helvetica"
    }
  }
  // Grid Lines
  // grid: {
  //   line: {
  //     stroke: "#555555"
  //   }
  // }
};

// Creating class for Gender Chart so it can hold state and receive props
class GenderChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Male", "Female"],
      color: "nivo",
      femalePercentage: 0,
      malePercentage: 0,
      femaleCount: 0,
      maleCount: 0
    };
  }

  componentDidMount() {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/gender/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length
          },
          () => {
            this.getGenderFemale();
          }
        );
      });
  }

  getGenderFemale = () => {
    axios
      .get(
        "https://staging-sauti-labs-14.herokuapp.com/users/all/gender/female/count"
      )
      .then(res => {
        console.log("female res count", res.data);
        this.setState(
          {
            ...this.state,
            femaleCount: res.data
          },
          () => {
            this.getGenderMale();
          }
        );
        console.log(this.state.femaleCount);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getGenderMale = () => {
    axios
      .get(
        "https://staging-sauti-labs-14.herokuapp.com/users/all/gender/male/count"
      )
      .then(res => {
        this.setState(
          {
            ...this.state,
            maleCount: res.data
          },
          () => {
            this.setPercentages();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  setPercentages = () => {
    const totalCount = this.state.totalCount;
    console.log("femalecount", totalCount);
    console.log("maleCount", this.state.maleCount);
    // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
    let femalePercentage = Math.round(
      (this.state.femaleCount / totalCount) * 100
    );
    let malePercentage = Math.round((this.state.maleCount / totalCount) * 100);
    this.setState(
      {
        ...this.state,
        femalePercentage: femalePercentage,
        malePercentage: malePercentage
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Gender: "Female",
              Female: this.state.femalePercentage,
              FemaleColor: "hsl(65, 70%, 50%)"
            },
            {
              Gender: "Male",
              Male: this.state.malePercentage,
              MaleColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Gender</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Gender"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          labelFormat= {d => <tspan y={ -15 }>{d}% </tspan>}
          labelForm= {d => <text >{d}% </text>}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Gender",
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
          labelTextColor="black"
          theme={theme}
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

export default GenderChart;

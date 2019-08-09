import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

class EducationChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Primary", "Secondary", "University", "None"],
      color: "nivo",
      primaryPercentage: 0,
      secondaryPercentage: 0,
      uniPercentage: 0,
      nonePercentage: 0,
      primaryCount: 0,
      secondaryCount: 0,
      uniCount: 0,
      noneCount: 0
    };
  }

  componentDidMount() {
    axios
      .get("https://sa-stage.herokuapp.com/users/all/education/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length
          },
          () => {
            this.getPrimary();
          }
        );
      });
  }

  getPrimary = () => {
    axios
      .get("https://sa-stage.herokuapp.com/users/all/education/primary/count")
      .then(res => {
        console.log("primary res count", res.data);
        this.setState(
          {
            ...this.state,
            primaryCount: res.data
          },
          () => {
            this.getSecondary();
          }
        );
        console.log(this.state.primaryCount);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSecondary = () => {
    axios
      .get("https://sa-stage.herokuapp.com/users/all/education/secondary/count")
      .then(res => {
        this.setState(
          {
            ...this.state,
            secondaryCount: res.data
          },
          () => {
            this.getUni();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUni = () => {
    axios
      .get("https://sa-stage.herokuapp.com/users/all/education/uni/count")
      .then(res => {
        this.setState(
          {
            ...this.state,
            uniCount: res.data
          },
          () => {
            this.getNone();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  getNone = () => {
    axios
      .get("https://sa-stage.herokuapp.com/users/all/education/none/count")
      .then(res => {
        this.setState(
          {
            ...this.state,
            noneCount: res.data
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
    console.log("totalcount", totalCount);
    console.log("primaryCount", this.state.primaryCount);
    console.log("uniCount", this.state.uniCount);
    // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
    let primaryPercentage = Math.round(
      (this.state.primaryCount / totalCount) * 100
    );
    let secondaryPercentage = Math.round(
      (this.state.secondaryCount / totalCount) * 100
    );
    let uniPercentage = Math.round((this.state.uniCount / totalCount) * 100);
    let nonePercentage = Math.round((this.state.noneCount / totalCount) * 100);
    console.log(primaryPercentage);
    console.log(uniPercentage);
    this.setState(
      {
        ...this.state,
        primaryPercentage: primaryPercentage,
        secondaryPercentage: secondaryPercentage,
        uniPercentage: uniPercentage,
        nonePercentage: nonePercentage
      },
      () => {
        console.log(this.state.uniPercentage);
        this.setState({
          ...this.state,
          data: [
            {
              Education: "Primary",
              Primary: this.state.primaryPercentage,
              PrimaryColor: "hsl(65, 70%, 50%)"
            },
            {
              Education: "Secondary",
              Secondary: this.state.secondaryPercentage,
              SecondaryColor: "hsl(65, 70%, 50%)"
            },
            {
              Education: "University/College",
              University: this.state.uniPercentage,
              UniversityColor: "hsl(65, 70%, 50%)"
            },
            {
              Education: "No Formal Education",
              None: this.state.nonePercentage,
              NoneColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Education Level</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Education"
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
            legend: "Education Level",
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

export default EducationChart;

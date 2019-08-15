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
        fill: "#4d4f52",
        fontSize: "1.6rem"
      }
    },
    legend: {
      text: {
        fill: "#4d4f52",
        fontSize: "1.6rem",
        fontWeight: 550,
        fontFamily: "Helvetica"
      }
    }
  },
  labels: {
    text: {
      fontSize: "1.6rem",
      fontWeight: 550,
      fontFamily: "Helvetica",
      fill: "#4d4f52",
    }
  }
  // Grid Lines
  // grid: {
  //   line: {
  //     stroke: "#555555"
  //   }
  // }
};

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
    this.props.getDropDownDefault(this.props.pathname);
    
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/education/all")
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
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/education/primary/count")
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
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/education/secondary/count")
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
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/education/uni/count")
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
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/education/none/count")
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
          margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
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
            legend: "Education Level",
            legendPosition: "middle",
            legendOffset: 50
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Traders",
            legendPosition: "middle",
            legendOffset: -50
          }}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelTextColor="black"
          theme={theme}
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

export default EducationChart;

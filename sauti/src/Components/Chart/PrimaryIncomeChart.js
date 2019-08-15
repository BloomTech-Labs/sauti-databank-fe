
import React from 'react'; 
import { ResponsiveBar } from "@nivo/bar"; 
import axios from 'axios';

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

// Creating class for Primary Income Chart so it can hold state and receive props
class PrimaryIncomeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Yes", "No"],
      color: "nivo",
      noPercentage: 0,
      yesPercentage: 0,
      noCount: 0,
      yesCount: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/primary-income/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState({
            ...this.state,
            users: res.data,
            totalCount: res.data.length
          },
          () => {
            this.getPrimaryIncomeYes();
          }
        );
      })
  }

  getPrimaryIncomeYes = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/primary-income/yes/count")
      .then(res => {
        this.setState({
          ...this.state,
          yesCount: res.data
        },
        () => {
          this.getPrimaryIncomeNo();
        }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  getPrimaryIncomeNo = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/primary-income/no/count")
      .then(res => {
        this.setState({
          ...this.state,
          noCount: res.data
        }, () => {
          this.setPercentages();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  setPercentages = () => {
    const totalCount = this.state.totalCount;
    let noPercentage = Math.round((this.state.noCount / totalCount) * 100);
    let yesPercentage = Math.round((this.state.yesCount / totalCount) * 100);
    this.setState(
      {
        ...this.state,
        noPercentage: noPercentage,
        yesPercentage: yesPercentage
      },
      () => {
         this.setState({
          ...this.state,
          data: [
            {
              Primary_Income: "Yes",
              Yes: this.state.yesPercentage,
              YesColor: "hsl(65, 70%, 50%)"
            },
            {
              Primary_Income: "No",
              No: this.state.noPercentage,
              NoColor: "hsl(65, 70%, 50%)"
            },
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Cross Border Trade As Primary Income</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Primary_Income"
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
            legend: "Cross Border Trade As Primary Soure Of Income",
            legendPosition: "middle",
            legendOffset: 41
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

export default PrimaryIncomeChart;
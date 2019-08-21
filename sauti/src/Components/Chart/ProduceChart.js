import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from '../../Constants/Theme.js'


// Creating class for Produce Chart so it can hold state and receive props
class ProduceChart extends React.Component {
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
      yesCount: 0
    };
  }

  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);
    
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/produce/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length,
            yesCount: res.data.reduce(function(n, user) {
              return n + (user.primary_income === "Yes")
            }, 0),
            noCount: res.data.reduce(function(n, user) {
              return n + (user.primary_income === "No")
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
              Grower: "Yes",
              Yes: this.state.yesPercentage,
              YesColor: "hsl(65, 70%, 50%)"
            },
            {
              Grower: "No",
              No: this.state.noPercentage,
              NoColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Primary Grower of Produce</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Grower"
          margin={{ top: 50, right: 130, bottom: 75, left: 80 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
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
            legend: "Primary Grower Of Produce",
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

export default ProduceChart;

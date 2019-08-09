import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from 'axios';

class CrossingFreqChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Kenya", "Uganda", "Rwanda"],
      color: "nivo",
      kenyaPercentage: 0,
      ugandaPercentage: 0,
      rwandaPercentage: 0,
      kenyaCount: 0,
      ugandaCount: 0,
      rwandaCount: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/country/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length
          },
          () => {
            this.getKenya();
          }
        );
      })
  }

  getKenya = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/country/kenya/count")
      .then(res => {
        console.log("Kenya Count", res.data);
        this.setState({
          ...this.state,
          kenyaCount: res.data
        },
        () => {
          this.getUganda();
        }
        );
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUganda = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/country/uganda/count")
      .then(res => {
        console.log("weekly Count", res.data);
        this.setState({
          ...this.state,
          ugandaCount: res.data
        }, () => {
          this.getRwanda();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getRwanda = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/country/rwanda/count")
      .then(res => {
        console.log("weekly Count", res.data);
        this.setState({
          ...this.state,
          rwandaCount: res.data
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
    // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
    let kenyaPercentage = Math.round((this.state.kenyaCount / totalCount) * 100);
    let ugandaPercentage = Math.round((this.state.ugandaCount / totalCount) * 100);
    let rwandaPercentage = Math.round((this.state.rwandaCount / totalCount) * 100);
    this.setState(
      {
        ...this.state,
        kenyaPercentage: kenyaPercentage,
        ugandaPercentage: ugandaPercentage,
        rwandaPercentage: rwandaPercentage,
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Country: "Kenya",
              Kenya: this.state.kenyaPercentage,
              KenyaColor: "hsl(65, 70%, 50%)"
            },
            {
              Country: "Uganda",
              Uganda: this.state.ugandaPercentage,
              UgandaColor: "hsl(65, 70%, 50%)"
            },
            {
              Country: "Rwanda",
              Rwanda: this.state.rwandaPercentage,
              RwandaColor: "hsl(65, 70%, 50%)"
            },
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Country of Origin</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Country"
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
            legend: "Country",
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
      </div>
    );
  }
}

export default CrossingFreqChart;
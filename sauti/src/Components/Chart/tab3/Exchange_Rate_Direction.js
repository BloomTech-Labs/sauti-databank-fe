import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../../Constants/Theme";

class TopCommodityCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: [
        "KES_UGX",
        "UGX_KES",
        "USD_KES",
        "RWF_UGX",
        "UGX_RWF",
        "KES_RWF",
        "USD_RWF",
        "KES_TZS",
        "KES_USD",
        "TZS_KES",
        "RWF_USD"
      ],
      color: "nivo",
      // Percentages
      UGX_KES_Percentage: 0,
      KES_UGX_Percentage: 0,
      USD_KES_Percentage: 0,
      RWF_UGX_Percentage: 0,
      UGX_RWF_Percentage: 0,
      USD_RWF_Percentage: 0,
      KES_TZS_Percentage: 0,
      KES_USD_Percentage: 0,
      KES_RWF_Percentage: 0,

      TZS_KES_Percentage: 0,
      RWF_USD_Percentage: 0,

      // Counts
      KES_UGX_Count: 0,
      UGX_KES_Count: 0,
      RWF_UGX_Count: 0,
      UGX_RWF_Count: 0,
      USD_KES_Count: 0,
      KES_TZS_Count: 0,
      USD_RWF_Count: 0,
      KES_RWF_Count: 0,
      KES_USD_Count: 0,
      TZS_KES_Count: 0,
      RWF_USD_Count: 0
    };
  }

  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);

    axios
      .get(`https://staging-sauti-labs-14.herokuapp.com/exchange-rate`)
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length,
            KES_UGX_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "KES->UGX");
            }, 0),
            UGX_KES_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "UGX->KES");
            }, 0),
            USD_KES_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "USD->KES");
            }, 0),
            RWF_UGX_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "RWF->UGX");
            }, 0),
            UGX_RWF_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "UGX->RWF");
            }, 0),
            KES_TZS_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "KES->TZS");
            }, 0),
            USD_RWF_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "USD->RWF");
            }, 0),
            KES_RWF_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "KES->RWF");
            }, 0),
            KES_USD_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "KES->USD");
            }, 0),
            TZS_KES_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "TZS->KES");
            }, 0),
            RWF_USD_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "RWF->USD");
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
    let UGX_KES_Percentage = Math.round(
      (this.state.UGX_KES_Percentage / totalCount) * 100
    );

    let KES_UGX_Percentage = Math.round(
      (this.state.KES_UGX_Count / totalCount) * 100
    );

    let RWF_UGX_Percentage = Math.round(
      (this.state.RWF_UGX_Count / totalCount) * 100
    );

    let UGX_RWF_Percentage = Math.round(
      (this.state.UGX_RWF_Count / totalCount) * 100
    );

    let USD_KES_Percentage = Math.round(
      (this.state.USD_KES_Count / totalCount) * 100
    );

    let KES_TZS_Percentage = Math.round(
      (this.state.KES_TZS_Count / totalCount) * 100
    );

    let USD_RWF_Percentage = Math.round(
      (this.state.USD_RWF_Count / totalCount) * 100
    );

    let KES_RWF_Percentage = Math.round(
      (this.state.KES_RWF_Count / totalCount) * 100
    );

    let KES_USD_Percentage = Math.round(
      (this.state.KES_USD_Percentage / totalCount) * 100
    );

    let TZS_KES_Percentage = Math.round(
      (this.state.TZS_KES_Count / totalCount) * 100
    );
    let RWF_USD_Percentage = Math.round(
      (this.state.RWF_USD_Count / totalCount) * 100
    );

    this.setState(
      {
        ...this.state,
        UGX_KES_Percentage: UGX_KES_Percentage,
        KES_UGX_Percentage: KES_UGX_Percentage,

        RWF_UGX_Percentage: RWF_UGX_Percentage,
        UGX_RWF_Percentage: UGX_RWF_Percentage,
        USD_KES_Percentage: USD_KES_Percentage,
        KES_TZS_Percentage: KES_TZS_Percentage,
        USD_RWF_Percentage: USD_RWF_Percentage,
        KES_RWF_Percentage: KES_RWF_Percentage,
        KES_USD_Percentage: KES_USD_Percentage,
        TZS_KES_Percentage: TZS_KES_Percentage,
        RWF_USD_Percentage: RWF_USD_Percentage
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Origin: "UGX_KES",
              UGX_KES: this.state.UGX_KES_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "KES_UGX",
              KES_UGX: this.state.KES_UGX_Percentage,
              OutsideEACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "RWF_UGX",
              RWF_UGX: this.state.RWF_UGX_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "UGX_RWF",
              UGX_RWF: this.state.UGX_RWF_Percentage,
              OutsideEACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "USD_KES",
              USD_KES: this.state.USD_KES_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "KES_TZS",
              KES_TZS: this.state.KES_TZS_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "USD_RWF",
              USD_RWF: this.state.USD_RWF_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "KES_RWF",
              KES_RWF: this.state.KES_RWF_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "KES_USD",
              KES_USD: this.state.KES_USD_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "TZS_KES",
              TZS_KES: this.state.TZS_KES_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "RWF_USD",
              RWF_USD: this.state.RWF_USD_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };

  render() {
    console.log(this.state.KES_UGX_Percentage)
    return (
      <div className="Chart">
        <h2>Origin of Traders' Goods</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Origin"
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
            legend: "Origin",
            legendPosition: "middle",
            legendOffset: 65
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Origin",
            legendPosition: "middle",
            legendOffset: -70
          }}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelTextColor="black"
          theme={theme}
          tooltip={({ id, value }) => (
            <strong
              style={{
                color: "#000000",
                fontSize: "15px",
                fontFamily: "Helvetica"
              }}
            >
              {id}: {value}%
            </strong>
          )}
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

export default TopCommodityCategories;

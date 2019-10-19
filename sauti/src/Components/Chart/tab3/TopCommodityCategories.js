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
        "Cereals_Maize",
        "Beans",
        "Cereals_Other",
        "Seeds_Nuts",
        "Fruits",
        "Cereals_Rice",
        "AnimalProducts",
        "Roots_Tubers",
        "Vegetables",
        "Peas",
      ],
      color: "nivo",
      // Percentages
      Beans_Percentage: 0,
      Cereals_Maize_Percentage: 0,

      Seeds_Nuts_Percentage: 0,
      Fruits_Percentage: 0,
      Cereals_Other_Percentage: 0,
      Animal_Products_Percentage: 0,
      Cereals_Rice_Percentage: 0,
      Roots_Tubers_Percentage: 0,
      Vegetables_Percentage: 0,
      Peas_Percentage: 0,
     

      // Counts
      Cereals_Maize_Count: 0,
      Beans_Count: 0,
      Seeds_Nuts_Count: 0,
      Fruits_Count: 0,
      Cereals_Other_Count: 0,
      Animal_Products_Count: 0,
      Cereals_Rice_Count: 0,
      Roots_Tubers_Count: 0,
      Vegetables_Count: 0,
      Peas_Count: 0,
     
    };
  }

  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);

    axios
      .get(`https://staging-sauti-labs-14.herokuapp.com/top-cat`)
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length,
            Cereals_Maize_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Cereals - Maize");
            }, 0),
            Beans_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Beans");
            }, 0),
            Cereals_Other_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Cereals - Other");
            }, 0),
            Seeds_Nuts_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Seeds & Nuts");
            }, 0),
            Fruits_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Fruits");
            }, 0),
            Animal_Products_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Animal Products");
            }, 0),
            Cereals_Rice_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Cereals - Rice");
            }, 0),
            Roots_Tubers_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Roots & Tubers");
            }, 0),
            Vegetables_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Vegetables");
            }, 0),
            Peas_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Peas");
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
    let Beans_Percentage = Math.round(
      (this.state.Beans_Count / totalCount) * 100
    );

    let Cereals_Maize_Percentage = Math.round(
      (this.state.Cereals_Maize_Count / totalCount) * 100
    );

    let Seeds_Nuts_Percentage = Math.round(
      (this.state.Seeds_Nuts_Count / totalCount) * 100
    );

    let Fruits_Percentage = Math.round(
      (this.state.Fruits_Count / totalCount) * 100
    );

    let Cereals_Other_Percentage = Math.round(
      (this.state.Cereals_Other_Count / totalCount) * 100
    );

    let Animal_Products_Percentage = Math.round(
      (this.state.Animal_Products_Count / totalCount) * 100
    );

    let Cereals_Rice_Percentage = Math.round(
      (this.state.Cereals_Rice_Count / totalCount) * 100
    );

    let Roots_Tubers_Percentage = Math.round(
      (this.state.Roots_Tubers_Count / totalCount) * 100
    );

    let Vegetables_Percentage = Math.round(
      (this.state.Vegetables_Count / totalCount) * 100
    );

    let Peas_Percentage = Math.round(
      (this.state.Peas_Count / totalCount) * 100
    );

    this.setState(
      {
        ...this.state,
        Beans_Percentage: Beans_Percentage,
        Cereals_Maize_Percentage: Cereals_Maize_Percentage,

        Seeds_Nuts_Percentage: Seeds_Nuts_Percentage,
        Fruits_Percentage: Fruits_Percentage,
        Cereals_Other_Percentage: Cereals_Other_Percentage,
        Animal_Products_Percentage: Animal_Products_Percentage,
        Cereals_Rice_Percentage: Cereals_Rice_Percentage,
        Roots_Tubers_Percentage: Roots_Tubers_Percentage,
        Vegetables_Percentage: Vegetables_Percentage,
        Peas_Percentage: Peas_Percentage,
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Origin: "Beans",
              Beans: this.state.Beans_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "C_Maize",
              Cereals_Maize: this.state.Cereals_Maize_Percentage,
              OutsideEACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "S & N",
              Seeds_Nuts: this.state.Seeds_Nuts_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "Fruits",
              Fruits: this.state.Fruits_Percentage,
              OutsideEACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "C_Other",
              Cereals_Other: this.state.Cereals_Other_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "Animal",
              AnimalProducts: this.state.Animal_Products_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "C_Rice",
              Cereals_Rice: this.state.Cereals_Rice_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "Roots",
              Roots_Tubers: this.state.Roots_Tubers_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "Veg",
              Vegetables: this.state.Vegetables_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "Peas",
              Peas: this.state.Peas_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
          ]
        });
      }
    );
  };

  render() {
    console.log(this.state.Other_Percentage)
    return (
      <div className="Chart">
        <h2>Top Commodity Categories</h2>
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
            legend: "Commodity",
            legendPosition: "middle",
            legendOffset: 65
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Commodity",
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

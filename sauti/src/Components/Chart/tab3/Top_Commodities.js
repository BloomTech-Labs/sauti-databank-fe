import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../../Constants/Theme";

class TopCommodity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: [
        "Dry_Maize ",
        "Mixed_Beans ",
        "Yellow_Beans  ",
        "Beans_Rosecoco ",
        "Ground_Nuts ",
        "Millet_Grain ",
        "Green_Gram ",
        "Red_Beans ",
        "Rice",
        "Eggs ",
        "Soya_Beans"
      ],
      color: "nivo",
      // Percentages
      Mixed_Beans_Percentage: 0,
      Dry_Maize_Percentage: 0,

     Yellow_Beans_Percentage: 0,
     Beans_Rosecoco_Percentage: 0,
      Ground_Nuts_Percentage: 0,
      
      Green_Gram_Percentage: 0,
      Millet_Grain_Percentage: 0,
      Red_Beans_Percentage: 0,
      Rice_Percentage: 0,
      Eggs_Percentage: 0,
      Soya_Beans_Percentage: 0,

      // Counts
      Dry_Maize_Count: 0,
      Mixed_Beans_Count: 0,
     Yellow_Beans_Count: 0,
      Ground_Nuts_Count: 0,
      Beans_Rosecoco_Count: 0,
      Green_Gram_Count: 0,
      Millet_Grain_Count: 0,
      Red_Beans_Count: 0,
      Rice_Count: 0,
      Eggs_Count: 0,
      Soya_Beans_Count: 0
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
            Dry_Maize_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Dry Maize ");
            }, 0),
            Mixed_Beans_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Mixed Beans");
            }, 0),
            Beans_Rosecoco_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Beans Rosecoco ");
            }, 0),
           Yellow_Beans_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Yellow Beans");
            }, 0),
            Ground_Nuts_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Ground Nuts");
            }, 0),
            Green_Gram_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Green Gram ");
            }, 0),
            Millet_Grain_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Millet Grain ");
            }, 0),
            Red_Beans_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Red Beans ");
            }, 0),
            Rice_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Rice");
            }, 0),
            Eggs_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Eggs");
            }, 0),
            Soya_Beans_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Soya_Beans");
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
    let  Mixed_Beans_Percentage = Math.round((this.state.Mixed_Beans_Percentage/ totalCount) * 100);


    let Dry_Maize_Percentage = Math.round(
      (this.state.Dry_Maize_Count / totalCount) * 100
    );



    letYellow_Beans_Percentage= Math.round((this.state.Seeds_Nuts_Count / totalCount) * 100);

    let Ground_Nuts_Percentage = Math.round(
      (this.state.Ground_Nuts_Count / totalCount) * 100
    );


    let Beans_Rosecoco_Percentage = Math.round((this.state.Beans_Rosecoco_Count / totalCount) * 100);

    let Green_Gram_Percentage = Math.round(
      (this.state.Green_Gram_Count/ totalCount) * 100
    );

    let  Millet_Grain_Percentage = Math.round((this.state.Millet_Grain_Count / totalCount) * 100);

    let Red_Beans_Percentage= Math.round(
      (this.state.Red_Beans_Count / totalCount) * 100
    );
    
    
    let Rice_Percentage = Math.round((this.state.Rice_Percentage/ totalCount) * 100);

    let Eggs_Percentage = Math.round(
      (this.state.Eggs_Count/ totalCount) * 100
    );
    let Soya_Beans_Percentage = Math.round((this.state.Soya_Beans_Count/ totalCount) * 100);
   
    this.setState(
      {
        ...this.state,
        Mixed_Beans_Percentage: Mixed_Beans_Percentage,
        Dry_Maize_Percentage:Dry_Maize_Percentage,
  
       Yellow_Beans_Percentage:Yellow_Beans_Percentage,
        Ground_Nuts_Percentage: Ground_Nuts_Percentage,
        Beans_Rosecoco_Percentage: Beans_Rosecoco_Percentage,
        Green_Gram_Percentage: Green_Gram_Percentage,
        Millet_Grain_Percentage:Millet_Grain_Percentage,
        Red_Beans_Percentage: Red_Beans_Percentage,
        Rice_Percentage: Rice_Percentage,
        Eggs_Percentage: Eggs_Percentage,
        Soya_Beans_Percentage: Soya_Beans_Percentage,
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Origin: "Mixed_Beans",
              EAC: this.state.Mixed_Beans_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "ODry_Maize",
              OutsideEAC: this.state.Dry_Maize_Percentage,
              OutsideEACColor: "hsl(65, 70%, 50%)"
            },    {
              Origin: "Seeds&Nuts",
              EAC: this.state.Seeds_Nuts_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
            {
              Origin: "Ground_Nuts",
              OutsideEAC: this.state.Ground_Nuts_Percentage,
              OutsideEACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: "Beans_Rosecoco",
              EAC: this.state.Beans_Rosecoco_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: " Green_Gram",
              EAC: this.state.Green_Gram_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: "Millet_Grain",
              EAC: this.state.Millet_Grain_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: "Red_Beans",
              EAC: this.state.Red_Beans_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: "Rice",
              EAC: this.state.Rice_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: "Eggs",
              EAC: this.state.Eggs_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            }, {
              Origin: "Soya_Beans",
              EAC: this.state.Soya_Beans_Percentage,
              EACColor: "hsl(65, 70%, 50%)"
            },
          ]
        });
      }
    );
  };

  render() {
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

export default TopCommodity;
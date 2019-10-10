import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../../Constants/Theme";

class DocumentsInfoChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: [
        "Import_Permit",
        "Simplified_Certificate",
        "Yellow_Fever_Card",
        "Bill_of_Lading",
        "National_ID_Card",
        "Phytosanitary_Certificate"
      ],
      color: "nivo",
      // Percentages
      Import_Permit_Percentage: 0,
      Simplified_Certificate_Percentage: 0,
      Yellow_Fever_Card_Percentage: 0,
      Bill_of_Lading_Percentage: 0,
      National_ID_Card_Percentage: 0,
      Phytosanitary_Certificate_Percentage: 0,
      // Counts
      Bill_of_Lading_Count: 0,
      Import_Permit_Count: 0,
      Simplified_Certificate_Count: 0,
      Yellow_Fever_Card_Count: 0,
      National_ID_Card_Count: 0,
      Phytosanitary_Certificate_Count: 0
    };
  }

  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);

    axios
      .get(`https://staging-sauti-labs-14.herokuapp.com/info-pro`)
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length,
            Import_Permit_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Import Permit");
            }, 0),
            Simplified_Certificate_Count: res.data.reduce(function(n, user) {
              return (
                n +
                (user.request_value ===
                  "Simplified Certificate Of Origin (SCOO)")
              );
            }, 0),
            Yellow_Fever_Card_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Yellow Fever Card");
            }, 0),
            National_ID_Card_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "National ID Card - Passport");
            }, 0),
            Bill_of_Lading_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Bill of Lading");
            }, 0),
            Phytosanitary_Certificate_Count: res.data.reduce(function(n, user) {
              return n + (user.request_value === "Phytosanitary Certificate");
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
    let Import_Permit_Percentage = Math.round(
      (this.state.Import_Permit_Count / totalCount) * 100
    );
    let Simplified_Certificate_Percentage = Math.round(
      (this.state.Simplified_Certificate_Count / totalCount) * 100
    );
    let Yellow_Fever_Card_Percentage = Math.round(
      (this.state.Yellow_Fever_Card_Count / totalCount) * 100
    );
    let Bill_of_Lading_Percentage = Math.round(
      (this.state.Bill_of_Lading_Count / totalCount) * 100
    );
    let National_ID_Card_Percentage = Math.round(
      (this.state.National_ID_Card_Percentage / totalCount) * 100
    );
    let Phytosanitary_Certificate_Percentage = Math.round(
      (this.state.National_ID_Card_Percentage / totalCount) * 100
    );
    this.setState(
      {
        ...this.state,
        Import_Permit_Percentage: Import_Permit_Percentage,
        Simplified_Certificate_Percentage: Simplified_Certificate_Percentage,
        Yellow_Fever_Card_Percentage: Yellow_Fever_Card_Percentage,
        Bill_of_Lading_Percentage: Bill_of_Lading_Percentage,
        National_ID_Card_Percentage: National_ID_Card_Percentage,
        Phytosanitary_Certificate_Percentage: Phytosanitary_Certificate_Percentage
      },
      () => {
        this.setState({
          ...this.state,
          data: [
            {
              Destination: "Import ",
              Import_Permit: this.state.Import_Permit_Percentage,
              KENColor: "hsl(65, 70%, 50%)"
            },
            {
              Destination: "Simplified ",
              Simplified_Certificate: this.state
                .Simplified_Certificate_Percentage,
              UGAColor: "hsl(65, 70%, 50%)"
            },
            {
              Destination: "Yellow ",
              Yellow_Fever_Card: this.state.Yellow_Fever_Card_Percentage,
              UGAColor: "hsl(65, 70%, 50%)"
            },
            {
              Destination: "Bill ",
              Bill_of_Lading: this.state.Bill_of_Lading_Percentage,
              UGAColor: "hsl(65, 70%, 50%)"
            },
            {
              Destination: "National ",
              National_ID_Card: this.state.National_ID_Card_Percentage,
              UGAColor: "hsl(65, 70%, 50%)"
            },
            {
              Destination: "Phytosanitary",
              Phytosanitary_Certificate: this.state
                .Phytosanitary_Certificate_Percentage,
              UGAColor: "hsl(65, 70%, 50%)"
            }
          ]
        });
      }
    );
  };

  render() {
    console.log(this.state.Yellow_Fever_Card_Percentage);
    return (
      <div className="Chart">
        <h2>Requested Procedures for Destination (Imports to:)</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Destination"
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
            legend: "Destination (Imports To)",
            legendPosition: "middle",
            legendOffset: 65
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Destination",
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
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
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

export default DocumentsInfoChart;

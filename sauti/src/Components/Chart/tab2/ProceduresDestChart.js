import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from 'axios';
import theme from '../../../Constants/Theme'



class ProceduresDestChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: ["KEN", "UGA"],
            color: "nivo",
            // Percentages
            KEN_Percentage: 0,
            UGA_Percentage: 0,
            // Counts
            KEN_Count: 0,
            UGA_Count: 0 
        };
    }

    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);

        axios
            .get(`https://staging-sauti-labs-14.herokuapp.com/dest-info`)
            .then(res => {
                //console.log('totalCount', res.data.length)
                this.setState(
                    {
                        ...this.state,
                        users: res.data,
                        totalCount: res.data.length,
                        KEN_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "KEN")
                        }, 0),
                        UGA_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "UGA")
                        }, 0),
                    },
                    () => {
                        this.setPercentages();
                    }
                );
            })
    }



    setPercentages = () => {
        const totalCount = this.state.totalCount;
        // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
        let KEN_Percentage = Math.round((this.state.KEN_Count / totalCount) * 100);
        let UGA_Percentage = Math.round((this.state.UGA_Count / totalCount) * 100);
        this.setState(
            {
                ...this.state,
                KEN_Percentage: KEN_Percentage,
                UGA_Percentage: UGA_Percentage,
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            Destination: "KEN",
                            KEN: this.state.KEN_Percentage,
                            KENColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Destination: "UGA",
                            UGA: this.state.UGA_Percentage,
                            UGAColor: "hsl(65, 70%, 50%)",
                        },
                    
                    ]
                });
            }
        );
    };

    render() {
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
                    labelForm={d => <text >{d}% </text>}
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
                        <strong style={{ color: "#000000", fontSize: "15px", fontFamily: "Helvetica" }}>
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
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
            </div>
        );
    }
}

export default ProceduresDestChart;
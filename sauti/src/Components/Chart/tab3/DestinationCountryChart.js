import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../../Constants/Theme";

class DestinationCountryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: [
                "UGA",
                "KEN",
                "RWA",
                "TZA",
                "SSD",
                "BDI",
                "DRC"
            ],
            color: "nivo",
            // Percentages
            UGA_Percentage: 0,
            KEN_Percentage: 0,
            RWA_Percentage: 0,
            TZA_Percentage: 0,
            SSD_Percentage: 0,
            BDI_Percentage: 0,
            DRC_Percentage: 0,

            // Counts
            UGA_Count: 0,
            KEN_Count: 0,
            RWA_Count: 0,
            TZA_Count: 0,
            SSD_Count: 0,
            BDI_Count: 0,
            DRC_Count: 0,
        };
    }

    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/dest-country`)
            .then(res => {
                console.log("totalCount", res.data.length);
                this.setState(
                    {
                        ...this.state,
                        users: res.data,
                        totalCount: res.data[0].length,
                        UGA_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "UGA");
                        }, 0),
                        KEN_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "KEN");
                        }, 0),
                        RWA_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "RWA");
                        }, 0),
                        TZA_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "TZA");
                        }, 0),
                        SSD_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "SSD");
                        }, 0),
                        BDI_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "BDI");
                        }, 0),
                        DRC_Count: res.data[0].reduce(function (n, user) {
                            return n + (user.request_value === "DRC");
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
        let UGA_Percentage = Math.round(
            (this.state.UGA_Count / totalCount) * 100
        );

        let KEN_Percentage = Math.round(
            (this.state.KEN_Count / totalCount) * 100
        );

        let RWA_Percentage = Math.round(
            (this.state.RWA_Count / totalCount) * 100
        );

        let TZA_Percentage = Math.round(
            (this.state.TZA_Count / totalCount) * 100
        );

        let SSD_Percentage = Math.round(
            (this.state.SSD_Count / totalCount) * 100
        );

        let BDI_Percentage = Math.round(
            (this.state.BDI_Count / totalCount) * 100
        );

        let DRC_Percentage = Math.round(
            (this.state.DRC_Count / totalCount) * 100
        );


        this.setState(
            {
                ...this.state,
                UGA_Percentage: UGA_Percentage,
                KEN_Percentage: KEN_Percentage,
                RWA_Percentage: RWA_Percentage,
                TZA_Percentage: TZA_Percentage,
                SSD_Percentage: SSD_Percentage,
                BDI_Percentage: BDI_Percentage,
                DRC_Percentage: DRC_Percentage,
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            Destination: "UGA",
                            UGA: this.state.UGA_Percentage,
                            UGAColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Destination: "KEN",
                            KEN: this.state.KEN_Percentage,
                            KENColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Destination: "RWA",
                            RWA: this.state.RWA_Percentage,
                            RWAColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Destination: "TZA",
                            TZA: this.state.TZA_Percentage,
                            TZAColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Destination: "SSD",
                            SSD: this.state.SSD_Percentage,
                            SSDColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Destination: "BDI",
                            BDI: this.state.BDI_Percentage,
                            BDIColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Origin: "DRC",
                            DRC: this.state.DRC_Percentage,
                            DRCColor: "hsl(65, 70%, 50%)"     
                        },
                    ]
                });
            }
        );
    };

    render() {
        // console.log(this.state.Sunflower_Seed_Percentage, "here");
        return (
            <div className="Chart">
                <h2>Final Destination Country</h2>
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
                        legend: "Destination",
                        legendPosition: "middle",
                        legendOffset: 65
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage of destination",
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

export default DestinationCountryChart;

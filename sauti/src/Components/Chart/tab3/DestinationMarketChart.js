import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../../Constants/Theme";

class DestinationMarketChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: [
                "Busia",
                "Eldoret",
                "Kampala",
                "Kisumu",
                "Nairobi",
                "Kitale",
                "Iganga",
                "Kabale",
                "Bujumbura",
                "Mbale",
                "Bugiri_Market"
            ],
            color: "nivo",
            // Percentages
            Busia_Percentage: 0,
            Eldoret_Percentage: 0,
            Kampala_Percentage: 0,
            Kisumu_Percentage: 0,
            Nairobi_Percentage: 0,
            Kitale_Percentage: 0,
            Iganga_Percentage: 0,
            Kabale_Percentage: 0,
            Bujumbura_Percentage: 0,
            Mbale_Percentage: 0,
            Bugiri_Market_Percentage: 0,

            //  Count
            Busia_Count: 0,
            Eldoret_Count: 0,
            Kampala_Count: 0,
            Kisumu_Count: 0,
            Nairobi_Count: 0,
            Kitale_Count: 0,
            Iganga_Count: 0,
            Kabale_Count: 0,
            Bujumbura_Count: 0,
            Mbale_Count: 0,
            Bugiri_Market_Count: 0
        };
    }

    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);

       
        axios
            .get(`https://staging-sauti-labs-14.herokuapp.com/dest-market`)
            .then(res => {
                //console.log('totalCount', res.data.length)
                this.setState(
                    {
                        ...this.state,
                        users: res.data,
                        totalCount: res.data.length,
                        Busia_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Busia");
                        }, 0),
                        Eldoret_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Eldoret");
                        }, 0),
                        Kampala_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kampala");
                        }, 0),
                        Kisumu_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kisumu");
                        }, 0),
                        Nairobi_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Nairobi");
                        }, 0),
                        Kitale_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kitale");
                        }, 0),
                        Iganga_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Iganga");
                        }, 0),
                        Kabale_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kabale");
                        }, 0),
                        Bujumbura_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Bujumbura");
                        }, 0),
                        Mbale_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Mbale");
                        }, 0),
                        Bugiri_Market_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Bugiri Market");
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
        let Busia_Percentage = Math.round(
            (this.state.Busia_Count / totalCount) * 100
        );
        let Eldoret_Percentage = Math.round(
            (this.state.Eldoret_Count / totalCount) * 100
        );
        let Kampala_Percentage = Math.round(
            (this.state.Kampala_Count / totalCount) * 100
        );
        let Kisumu_Percentage = Math.round(
            (this.state.Kisumu_Count / totalCount) * 100
        );
        let Nairobi_Percentage = Math.round(
            (this.state.Nairobi_Count / totalCount) * 100
        );
        let Kitale_Percentage = Math.round(
            (this.state.Kitale_Count / totalCount) * 100
        );
        let Iganga_Percentage = Math.round(
            (this.state.Iganga_Count / totalCount) * 100
        );
        let Kabale_Percentage = Math.round(
            (this.state.Kabale_Count / totalCount) * 100
        );
        let Bujumbura_Percentage = Math.round(
            (this.state.Bujumbura_Count / totalCount) * 100
        );
        let Mbale_Percentage = Math.round(
            (this.state.Mbale_Count / totalCount) * 100
        );
        let Bugiri_Market_Percentage = Math.round(
            (this.state.Bugiri_Market_Count / totalCount) * 100
        );
        this.setState(
            {
                ...this.state,
                Busia_Percentage: Busia_Percentage,
                Eldoret_Percentage: Eldoret_Percentage,
                Kampala_Percentage: Kampala_Percentage,
                Kisumu_Percentage: Kisumu_Percentage,
                Nairobi_Percentage: Nairobi_Percentage,
                Kitale_Percentage: Kitale_Percentage,
                Iganga_Percentage: Iganga_Percentage,
                Kabale_Percentage: Kabale_Percentage,
                Bujumbura_Percentage: Bujumbura_Percentage,
                Mbale_Percentage: Mbale_Percentage,
                Bugiri_Market_Percentage: Bugiri_Market_Percentage
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            Market: "Busia",
                            Busia: this.state.Busia_Percentage,
                            BusiaColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Eldoret",
                            Eldoret: this.state.Eldoret_Percentage,
                            EldoretNewColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Kampala",
                            Kampala: this.state.Kampala_Percentage,
                            KampalaColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Kisumu",
                            Kisumu: this.state.Kisumu_Percentage,
                            KisumuColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Nairobi",
                            Nairobi: this.state.Nairobi_Percentage,
                            NairobiColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Kitale",
                            Kitale: this.state.Kitale_Percentage,
                            KitaleColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Iganga",
                            Iganga: this.state.Iganga_Percentage,
                            IgangaColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Kabale",
                            Kabale: this.state.Kabale_Percentage,
                            KabaleColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Bujumbura",
                            Bujumbura: this.state.Bujumbura_Percentage,
                            BujumburaColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Mbale",
                            Mbale: this.state.Mbale_Percentage,
                            MbaleColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Market: "Bugiri_Market",
                            Bugiri_Market: this.state.Bugiri_Market_Percentage,
                            Bugiri_MarketColor: "hsl(65, 70%, 50%)"
                        }
                    ]
                });
            }
        );
    };

    render() {
        return (
            <div className="Chart">
                <h2>Final Destination Market</h2>
                <ResponsiveBar
                    data={this.state.data} // Data needed
                    keys={this.state.keys} // Values to display in Y axis
                    indexBy="Market"
                    margin={{ top: 50, right: 195, bottom: 75, left: 80 }}
                    padding={0.1}
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
                        legend: "Market",
                        legendPosition: "middle",
                        legendOffset: 65
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage of Market",
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

export default DestinationMarketChart;

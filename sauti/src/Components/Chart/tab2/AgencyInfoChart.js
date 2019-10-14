import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../../Constants/Theme";
class AgencyInfoChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: [
                "Clearing_Agent",
                "COMESA_Trade_Information_Desk_Office",
                "KEN_National_Chamber_of_Commerce_And_Industry",
                "Ministry_of_Agriculture_Animal_Industry_And_Fisheries",
                "Uganda_Police_Departments",
                "Kenya_Plant_Health_Inspectorate_Service",
                "Kenya_Revenue_Authority",
                "Kenya_Bureau_of_Standards",
                "Uganda_Revenue_Authority"
            ],
            color: "nivo",
            // Percentages
            Clearing_Agent_Percentage: 0,
            TIDO_Percentage: 0,
            KNCCI_Percentage: 0,
            MAAIF_Percentage: 0,
            Uganda_Police_Dpts_Percentage: 0,
            KEPHIS_Percentage: 0,
            KRA_Percentage: 0,
            Bureau_Percentage: 0,
            URA_Percentage: 0,
            //  Count
            Clearing_Agent_Count: 0,
            TIDO_Count: 0,
            KNCCI_Count: 0,
            MAAIF_Count: 0,
            Uganda_Police_Dpts_Count: 0,
            KEPHIS_Count: 0,
            KRA_Count: 0,
            Bureau_Count: 0,
            URA_Count: 0,
        };
    }
    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);
        // Hard work put to backend will change axios calls
        axios
            .get(`https://staging-sauti-labs-14.herokuapp.com/agency-info`)
            .then(res => {
                //console.log('totalCount', res.data.length)
                this.setState(
                    {
                        ...this.state,
                        users: res.data,
                        totalCount: res.data.length,
                        Clearing_Agent_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Clearing Agent");
                        }, 0),
                        TIDO_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "COMESA Trade Information Desk Office (TIDO)");
                        }, 0),
                        KNCCI_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kenya National Chamber of Commerce & Industry (KNCCI)");
                        }, 0),
                        MAAIF_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Ministry of Agriculture Animal Industry & Fisheries (MAAIF)");
                        }, 0),
                        Uganda_Police_Dpts_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Uganda Police Departments");
                        }, 0),
                        KEPHIS_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kenya Plant Health Inspectorate Service (KEPHIS)");
                        }, 0),
                        KRA_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kenya Revenue Authority (KRA)");
                        }, 0),
                        Bureau_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Kenya Bureau of Standards (KEBS)");
                        }, 0),
                        URA_Count: res.data.reduce(function (n, user) {
                            return n + (user.request_value === "Uganda Revenue Authority (URA)");
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
        let Clearing_Agent_Percentage = Math.round(
            (this.state.Clearing_Agent_Count / totalCount) * 100
        );
        let TIDO_Percentage = Math.round(
            (this.state.TIDO_Count / totalCount) * 100
        );
        let KNCCI_Percentage = Math.round(
            (this.state.KNCCI_Count / totalCount) * 100
        );
        let MAAIF_Percentage = Math.round(
            (this.state.MAAIF_Count / totalCount) * 100
        );
        let Uganda_Police_Dpts_Percentage = Math.round(
            (this.state.Uganda_Police_Dpts_Count / totalCount) * 100
        );
        let KEPHIS_Percentage = Math.round(
            (this.state.KEPHIS_Count / totalCount) * 100
        );
        let KRA_Percentage = Math.round(
            (this.state.KRA_Count / totalCount) * 100
        );
        let Bureau_Percentage = Math.round(
            (this.state.Bureau_Count / totalCount) * 100
        );
        let URA_Percentage = Math.round(
            (this.state.URA_Count / totalCount) * 100
        );
        this.setState(
            {
                ...this.state,
                Clearing_Agent_Percentage: Clearing_Agent_Percentage,
                TIDO_Percentage: TIDO_Percentage,
                KNCCI_Percentage: KNCCI_Percentage,
                MAAIF_Percentage: MAAIF_Percentage,
                Uganda_Police_Dpts_Percentage: Uganda_Police_Dpts_Percentage,
                KEPHIS_Percentage: KEPHIS_Percentage,
                KRA_Percentage: KRA_Percentage,
                Bureau_Percentage: Bureau_Percentage,
                URA_Percentage: URA_Percentage,
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            Info: "C Agent",
                            Clearing_Agent: this.state.Clearing_Agent_Percentage,
                            AgentColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "TIDO",
                            COMESA_Trade_Information_Desk_Office: this.state.TIDO_Percentage,
                            TIDOColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "KNCCI",
                            KEN_National_Chamber_of_Commerce_And_Industry: this.state.KNCCI_Percentage,
                            KNCCIColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "MAAIF",
                            Ministry_of_Agriculture_Animal_Industry_And_Fisheries: this.state.MAAIF_Percentage,
                            MAAIFColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "UGA Pol",
                            Uganda_Police_Departments: this.state.Uganda_Police_Dpts_Percentage,
                            UGA_PoliceColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "KEPHIS",
                            Kenya_Plant_Health_Inspectorate_Service: this.state.KEPHIS_Percentage,
                            KEPHISColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "KRA",
                            Kenya_Revenue_Authority: this.state.KRA_Percentage,
                            KRAColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "KEBS",
                            Kenya_Bureau_of_Standards: this.state.Bureau_Percentage,
                            BureauColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Info: "URA",
                            Uganda_Revenue_Authority: this.state.URA_Percentage,
                            URAColor: "hsl(65, 70%, 50%)"
                        },
                    ]
                });
            }
        );
    };
    render() {
        return (
            <div className="Chart">
                <h2>Most Requested Agency Information for Procedures</h2>
                <ResponsiveBar
                    data={this.state.data} // Data needed
                    keys={this.state.keys} // Values to display in Y axis
                    indexBy="Info"
                    margin={{ top: 50, right: 300, bottom: 75, left: 80 }}
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
                        legend: "Agency Information",
                        legendPosition: "middle",
                        legendOffset: 65
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage of Agency Information",
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
                translateX: 650,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 650,
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
export default AgencyInfoChart;






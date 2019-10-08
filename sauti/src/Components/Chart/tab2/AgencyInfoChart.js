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
                "Clearing Agent",
                "COMESA Trade Information Desk Office (TIDO)",
                "Kenya National Chamber of Commerce and Industry (KNCCI)",
                "Ministry of Agriculture Animal Industry and Fisheries (MAAIF)",
                "Uganda Police Dpts",
                "Kenya Plant Health Inspectorate Services (KEPHIS)",
                "Kenya Revenue Authority (KRA)",
                "PORT Health",
                "Uganda Revenue Authority (URA)"
            ],
            color: "nivo",
            // Percentages
            Clearing_Agent_Percentage: 0,
            COMESA_Trade_Information_Desk_Office_Percentage: 0,
            Kenya_National_Chamber_of_Commerce_and_Industry_Percentage: 0,
            Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Percentage: 0,
            Uganda_Police_Dpts_Percentage: 0,
            Kenya_Plant_Health_Inspectorate_Services_Percentage: 0,
            Kenya_Revenue_Authority_Percentage: 0,
            PORT_Health_Percentage: 0,
            Uganda_Revenue_Authority_Percentage: 0,

            //  Count
            Clearing_Agent_Count: 0,
            COMESA_Trade_Information_Desk_Office_Count: 0,
            Kenya_National_Chamber_of_Commerce_and_Industry_Count: 0,
            Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Count: 0,
            Uganda_Police_Dpts_Count: 0,
            Kenya_Plant_Health_Inspectorate_Services_Count: 0,
            Kenya_Revenue_Authority_Count: 0,
            PORT_Health_Count: 0,
            Uganda_Revenue_Authority_Count: 0,
        };
    }

    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);

        // Hard work put to backend will change axios calls
        axios.get(`https://staging-sauti-labs-14.herokuapp.com/agency-info`).then(res => {
            console.log('totalCount', res.data)
            this.setState(
                {
                    ...this.state,
                    users: res.data,
                    totalCount: res.data.length,
                    Clearing_Agent_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Clearing Agent");
                    }, 0),
                    COMESA_Trade_Information_Desk_Office_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "COMESA Trade Information Desk Office (TIDO)");
                    }, 0),
                    Kenya_National_Chamber_of_Commerce_and_Industry_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Kenya National Chamber of Commerce & Industry (KNCCI)");
                    }, 0),
                     Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Ministry of Agriculture Animal Industry & Fisheries (MAAIF)");
                    }, 0),
                    Uganda_Police_Dpts_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Uganda Police Departments");
                    }, 0),
                    Kenya_Plant_Health_Inspectorate_Services_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Kenya Plant Health Inspectorate Service (KEPHIS)");
                    }, 0),
                    Kenya_Revenue_Authority_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Kenya Revenue Authority");
                    }, 0),
                    PORT_Health_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "PORT Health");
                    }, 0),
                    Uganda_Revenue_Authority_Count: res.data.reduce(function (n, user) {
                        return n + (user.request_value === "Uganda Revenue Authority");
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
        console.log("total",totalCount)
        console.log('here',this.state.Clearing_Agent_Count,'portlll')
        let Clearing_Agent_Percentage = Math.round(
            (this.state.Clearing_Agent_Count / totalCount) * 100
        );
        let COMESA_Trade_Information_Desk_Office_Percentage = Math.round(
            (this.state.COMESA_Trade_Information_Desk_Office_Count / totalCount) * 100
        );
        let Kenya_National_Chamber_of_Commerce_and_Industry_Percentage = Math.round(
            (this.state.Kenya_National_Chamber_of_Commerce_and_Industry_Count / totalCount) * 100
        ); let Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Percentage = Math.round(
            (this.state.Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Count / totalCount) * 100
        ); let Uganda_Police_Dpts_Percentage = Math.round(
            (this.state.Uganda_Police_Dpts_Count / totalCount) * 100
        ); let Kenya_Plant_Health_Inspectorate_Services_Percentage = Math.round(
            (this.state.Kenya_Plant_Health_Inspectorate_Services_Count / totalCount) * 100
        );
        
          let  Kenya_Revenue_Authority_Percentage = Math.round(
                (this.state.Kenya_Revenue_Authority_Count / totalCount) * 100
            );
         let PORT_Health_Percentage = Math.round(
            (this.state.PORT_Health_Count / totalCount) * 100
        );
      let  Uganda_Revenue_Authority_Percentage = Math.round(
            (this.state.Uganda_Revenue_Authority_Count / totalCount) * 100
        );
        this.setState(
            {
                ...this.state,
                Clearing_Agent_Percentage: Clearing_Agent_Percentage,
                COMESA_Trade_Information_Desk_Office_Percentage: COMESA_Trade_Information_Desk_Office_Percentage,
                Kenya_National_Chamber_of_Commerce_and_Industry_Percentage: Kenya_National_Chamber_of_Commerce_and_Industry_Percentage,
                Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Percentage: Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Percentage,
                Uganda_Police_Dpts_Percentage: Uganda_Police_Dpts_Percentage,
                Kenya_Plant_Health_Inspectorate_Services_Percentage: Kenya_Plant_Health_Inspectorate_Services_Percentage,
                Kenya_Revenue_Authority_Percentage: Kenya_Revenue_Authority_Percentage,
                PORT_Health_Percentage: PORT_Health_Percentage,
                Uganda_Revenue_Authority_Percentage: Uganda_Revenue_Authority_Percentage,
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            Documentation: "Clearing Agent",
                            ClearingAgent: this.state.Clearing_Agent_Percentage,
                            ClearingAgentColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "COMESA Trade Information Desk Office",
                            COMESATradeInfo: this.state.COMESA_Trade_Information_Desk_Office_Percentage,
                            COMESATradeInfoColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "Kenya National Chamber of Commerce and Industry",
                            KenyaNationalChamberofCommerceAndIndustry: this.state.Kenya_National_Chamber_of_Commerce_and_Industry_Percentage,
                            KenyaNationalChamberofCommerceAndIndustrColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "Ministry of Agriculture Animal Industry and Fisheries",
                            MinistryOfAgricultureAnimalIndustryAndFisheries: this.state.Ministry_of_Agriculture_Animal_Industry_and_Fisheries_Percentage,
                            MinistryOfAgricultureAnimalIndustryAndFisheriesColor: "hsl(65, 70%, 50%)"
                        }, {
                            Documentation: "Uganda_Police_Dpts",
                            UgandaPoliceDpts: this.state.Uganda_Police_Dpts_Percentage,
                            UgandaPoliceDptsColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "Kenya Plant Health Inspectorate Services",
                            KenyaPlantHealthInspectorateServices: this.state.Kenya_Plant_Health_Inspectorate_Services_Percentage,
                            KenyaPlantHealthInspectorateServicesColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Commodity: "Kenya Revenue Authority",
                            KenyaRevenueAuthority: this.state.Kenya_Revenue_Authority_Percentage,
                            KenyaRevenueAuthorityColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Commodity: "PORT Health",
                            PORTHealth: this.state.PORT_Health_Percentage,
                            PORTHealthColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Commodity: "Uganda Revenue Authority",
                            UgandaRevenueAuthority: this.state.Uganda_Revenue_Authority_Percentage,
                            UgandaRevenueAuthorityColor: "hsl(65, 70%, 50%)"
                        },
                    ]
                });
            }
        );
    };

    render() {
        console.log(this.state.data,'here')
        return  (
            <div className="Chart">
                <h2>Most Requested Agency Information for Procedures</h2>
                <ResponsiveBar
                    data={ this.state.data} // Data needed
                    keys={this.state.keys} // Values to display in Y axis
                    indexBy="Documentation"
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
                        legend: "Documentation",
                        legendPosition: "middle",
                        legendOffset: 65
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage of Agency Info",
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

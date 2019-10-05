import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../Constants/Theme.js";

class DocumentsInfoChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: [
                "Import Permit",
                "National ID Card / Passport",
                "Simplified Certificate Of Origin",
                "Yellow Fever Card",
                "Valid Invoice",
                "Import Entry Declaration Form",
                "Phytosanitary Certificate"
            ],
            color: "nivo",
            // Percentages
            Import_Permit_Percentage: 0,
            National_ID_Card_Passport_Percentage: 0,
            Simplified_Certificate_Of_Origin_Percentage: 0,
            Yellow_Fever_Card_Percentage: 0,
            Valid_Invoice_Percentage: 0,
            Import_Entry_Declaration_Form_Percentage: 0,
            Phytosanitary_Certificate_Percentage: 0,

            //  Count
            Import_Permit_Count: 0,
            National_ID_Card_Passport_Count: 0,
            Simplified_Certificate_Of_Origin_Count: 0,
            Yellow_Fever_Card_Count: 0,
            Valid_Invoice_Count: 0,
            Import_Entry_Declaration_Form_Count: 0,
            Phytosanitary_Certificate_Count: 0,
        };
    }

    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);

        // Hard work put to backend will change axios calls
        axios.get(`${process.env.REACT_APP_BE_URL}/country/all`).then(res => {
            //console.log('totalCount', res.data.length)
            this.setState(
                {
                    ...this.state,
                    users: res.data,
                    totalCount: res.data.length,
                    Import_Permit_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "KEN");
                    }, 0),
                    National_ID_Card_Passport_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                    Simplified_Certificate_Of_Origin_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Yellow_Fever_Card_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Valid_Invoice_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Import_Entry_Declaration_Form_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Phytosanitary_Certificate_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
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
        let Import_Permit_Percentage = Math.round(
            (this.state.Import_Permit_Count / totalCount) * 100
        );
        let National_ID_Card_Passport_Percentage = Math.round(
            (this.state.National_ID_Card_Passport_Count / totalCount) * 100
        );
        let Simplified_Certificate_Of_Origin_Percentage = Math.round(
            (this.state.Simplified_Certificate_Of_Origin_Count / totalCount) * 100
        ); let Yellow_Fever_Card_Percentage = Math.round(
            (this.state.Yellow_Fever_Card_Count / totalCount) * 100
        ); let Valid_Invoice_Percentage = Math.round(
            (this.state.Valid_Invoice_Count / totalCount) * 100
        ); let Import_Entry_Declaration_Form_Percentage = Math.round(
            (this.state.Import_Entry_Declaration_Form_Count / totalCount) * 100
        );
        let
            Phytosanitary_Certificate_Percentage = Math.round(
                (this.state.Phytosanitary_Certificate_Count / totalCount) * 100
            ); 
        this.setState(
            {
                ...this.state,
                Import_Permit_Percentage: Import_Permit_Percentage ,
                National_ID_Card_Passport_Percentage: National_ID_Card_Passport_Percentage,
                Simplified_Certificate_Of_Origin_Percentage: Simplified_Certificate_Of_Origin_Percentage,
                Yellow_Fever_Card_Percentage: Yellow_Fever_Card_Percentage,
                Valid_Invoice_Percentage: Valid_Invoice_Percentage,
                Import_Entry_Declaration_Form_Percentage: Import_Entry_Declaration_Form_Percentage,
                Phytosanitary_Certificate_Percentage: Phytosanitary_Certificate_Percentage,
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            Documentation: "Import Permit",
                            ImportPermit: this.state.Import_Permit_Percentage,
                            ImportPermitColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "National ID /Card Passport",
                            NationalIDCardPassport: this.state.National_ID_Card_Passport_Percentage,
                            NationalIDCardPassportColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "Simplified Certificate Of Origin Percentage",
                            SimplifiedCertOfOrigin: this.state.Simplified_Certificate_Of_Origin_Percentage,
                            SimplifiedCertOfOriginColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "Yellow Fever Card",
                            YellowFeverCard: this.state.Yellow_Fever_Card_Percentage,
                            YellowFeverCardColor: "hsl(65, 70%, 50%)"
                        }, {
                            Documentation: "Valid Invoice",
                            ValidInvoice: this.state.Valid_Invoice_Percentage,
                            ValidInvoiceColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Documentation: "Import Entry Declaration Form",
                            ImportEntryDeclarationForm: this.state.Import_Entry_Declaration_Form_Percentage,
                            ImportEntryDeclarationFormColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            Commodity: "Phytosanitary Certificate",
                            PhytosanitaryCert: this.state.Phytosanitary_Certificate_Percentage,
                            PhytosanitaryCertColor: "hsl(65, 70%, 50%)"
                        }, 
                    ]
                });
            }
        );
    };

    render() {
        return (
            <div className="Chart">
                <h2>Most Requested Document Information for Procedures</h2>
                <ResponsiveBar
                    data={this.state.data} // Data needed
                    keys={this.state.keys} // Values to display in Y axis
                    indexBy="Documents"
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
                        legend: "Documents",
                        legendPosition: "middle",
                        legendOffset: 65
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage of Documents",
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

export default DocumentsInfoChart;

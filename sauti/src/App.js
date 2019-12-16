import React from "react";
import axios from "axios";
import Chart from "./Components/Chart/Chart";
// import Transformation from "../Transformation"
import "./App.scss";
import './index.css'

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";

import Queries from './GQL Components/Queries'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      sessions_production: [],
      realData: [],
      defaultOption: "Select a Chart"
    };
  }

  componentDidMount() {
    // this.getDropDownDefault();

    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/sessions/all`).then(res => {
    //   console.log(res);
    //   this.setState({
    //     sessions: res.data[0]
    //   });
    // });

    //   axios
    //     // For development: ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
    //     .get(`https://sa-stage.herokuapp.com/sessions/lance/all`)
    //     .then(res => {
    //       // Log to see the response from server: console.log(res.data);
    //       this.setState({
    //         ...this.state,
    //         realData: res.data
    //       });
    //     });
  }


  /// NO LONGER FUNCTIONAL DUE TO NOT USING ROUTES ANYMORE
  // getDropDownDefault(pathname = this.props.history.location.pathname) {
  //   if (pathname === "/gender-chart" || pathname === "/") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Gender"
  //     });
  //   } else if (pathname === "/crossing-frequency-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Border Crossing Frequency"
  //     });
  //   } else if (pathname === "/education-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Education Level"
  //     });
  //   } else if (pathname === "/age-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Age"
  //     });
  //   } else if (pathname === "/country-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Country of Residence"
  //     });
  //   } else if (pathname === "/language-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Language"
  //     });
  //   } else if (pathname === "/primaryincome-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Primary Income"
  //     });
  //   } else if (pathname === "/produce-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Produce"
  //     });
  //   } else if (pathname === "/Commodities-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Procedures Commodities"
  //     });
  //   } else if (pathname === "/Commodity-Categories-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Procedure Commodity Categories"
  //     });
  //   } else if (pathname === "/Destination-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Requested Procedures for Destination (Imports to:)"
  //     });
  //   } else if (pathname === "/Document-Information-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Document Information for Procedures"
  //     });
  //   } else if (pathname === "/Agency-Information-chart") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Agency Information for Procedures"
  //     });
  //   } else if (pathname === "/top-commodity") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Top Commodity"
  //     });
  //   } else if (pathname === "/top-commodity-categories") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Top Commodity Categories"
  //     });
  //   } else if (pathname === "/exchange_rate_direction") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Exchange Rate Direction"
  //     });
  //   } else if (pathname === "/dest-country") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Final Destination Country"
  //     });
  //   } else if (pathname === "/dest-market") {
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Final Destination Market"
  //     });
  //   }
  // }

  // onSelect = option => {
  //   if (option.label === "Gender") {
  //     this.props.history.push("/gender-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Gender"
  //     });
  //   } else if (option.label === "Border Crossing Frequency") {
  //     this.props.history.push("/crossing-frequency-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Border Crossing Frequency"
  //     });
  //   } else if (option.label === "Education Level") {
  //     this.props.history.push("/education-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Education Level"
  //     });
  //   } else if (option.label === "Age") {
  //     this.props.history.push("/age-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Age"
  //     });
  //   } else if (option.label === "Country of Residence") {
  //     this.props.history.push("/country-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Country of Residence"
  //     });
  //   } else if (option.label === "Language") {
  //     this.props.history.push("/language-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Language"
  //     });
  //   } else if (option.label === "Primary Income") {
  //     this.props.history.push("/primaryincome-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Primary Income"
  //     });
  //   } else if (option.label === "Produce") {
  //     this.props.history.push("/produce-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Produce"
  //     });
  //   } else if (option.label === "Most Requested Procedures Commodities") {
  //     this.props.history.push("/Commodities-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Procedures Commodities"
  //     });
  //   } else if (
  //     option.label === "Most Requested Procedure Commodity Categories"
  //   ) {
  //     this.props.history.push("/Commodity-Categories-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Procedure Commodity Categories"
  //     });
  //   } else if (
  //     option.label === "Requested Procedures for Destination (Imports to:)"
  //   ) {
  //     this.props.history.push("/Destination-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Requested Procedures for Destination (Imports to:)"
  //     });
  //   } else if (
  //     option.label === "Most Requested Document Information for Procedures"
  //   ) {
  //     this.props.history.push("/Document-Information-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Document Information for Procedures"
  //     });
  //   } else if (
  //     option.label === "Most Requested Agency Information for Procedures"
  //   ) {
  //     this.props.history.push("/Agency-Information-chart");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Most Requested Agency Information for Procedures"
  //     });
  //   } else if (option.label === "Origin of Traders' Goods") {
  //     this.props.history.push("/traders-goods");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Origin of Traders' Goods"
  //     });
  //   } else if (option.label === "Final Destination Country") {
  //     this.props.history.push("/dest-country");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Final Destination Country"
  //     });
  //   } else if (option.label === "Final Destination Market") {
  //     this.props.history.push("/dest-market");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Final Destination Market"
  //     });
  //   } else if (option.label === "Top Commodity") {
  //     this.props.history.push("/top-commodity");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Top Commodity"
  //     });
  //   } else if (option.label === "Top Commodity Categories") {
  //     this.props.history.push("/top-commodity-categories");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Top Commodity Categories"
  //     });
  //   } else if (option.label === "Exchange Rate Direction") {
  //     this.props.history.push("/exchange_rate_direction");
  //     this.setState({
  //       ...this.state,
  //       defaultOption: "Exchange Rate Direction"
  //     });
  //   }
  // };

  render() {

    // probably needs to be a component
    const options = [
      "Gender",
      "Education Level",
      "Border Crossing Frequency",
      "Age",
      "Country of Residence",
      "Primary Income",
      "Language",
      "Produce",
      "Most Requested Procedures Commodities",
      "Most Requested Procedure Commodity Categories",
      "Requested Procedures for Destination (Imports to:)",
      "Most Requested Document Information for Procedures",
      "Most Requested Agency Information for Procedures",
      "Origin of Traders' Goods",
      "Final Destination Country",
      "Final Destination Market",
      "Top Commodity",
      "Top Commodity Categories",
      "Exchange Rate Direction"
    ];

    return (
      <div className="App">
      {/*//THIS CODE NEEDS TO BE A COMPONENT*/}
        <div className="TopBar">
          <div className="Sauti-Logo">
            <a href="http://sautiafrica.org/">
              <p>
                Sauti<span>.</span>
              </p>
            </a>
          </div>
          <div className="Navigation">
            <a href="http://sautiafrica.org/">HOME</a>
            <a href="http://sautiafrica.org/our-approach/">ABOUT US</a>
            <a href="http://sautiafrica.org/information-platform/">SERVICES</a>
            <a href="http://sautiafrica.org/our-team/">OUR TEAM</a>
            <a href="http://sautiafrica.org/news/">NEWS & UPDATES</a>
            <a href="http://sautiafrica.org/contact/">CONTACT US</a>
          </div>
        </div>
        {/* CODE ABOVE NEEDS TO BE A COMPONENT///*/}
        <div className="main-container">
          <div className="header">
            <h1>Informal Cross-Border Trade Data</h1>
          </div>
          <div className="content-container">
            <div className="chart-container">
              {/* <Chart getDropDownDefault={this.getDropDownDefault.bind(this)} /> */}
              <Queries />
            </div>
            <div className="dropdown-container">
              <p>Key Trader Demographics</p>

              {/* probably will not use current dropdown */}
              <Dropdown
                controlClassName="myControlClassName"
                arrowClassName="myArrowClassName"
                className="dropdown"
                options={options}
                onChange={this.onSelect}
                value={this.state.defaultOption}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);

// Displays chart based on Nivo's required format

// Requiring dependencies
import { Route } from "react-router-dom";
import React from "react";
//import { ResponsiveBar } from "@nivo/bar";
//import axios from "axios";

// Importing components
import CrossingFreqChart from "./CrossingFreqChart.js";
import GenderChart from "./GenderChart.js";
// import Transformation from '../../../Transformation.js/index.js'
import EducationChart from "./EducationChart";
import AgeChart from "./AgeChart";
import CountryChart from "./CountryChart";
import LanguageChart from "./LanguageChart";
import PrimaryIncomeChart from "./PrimaryIncomeChart";
import ProduceChart from "./ProduceChart";



import ProceduresComChart from './tab2/ProceduresComChart'
import DestinationChart from './tab2/ProceduresDestChart'
import Agency_info from './tab2/AgencyInfoChart'
import ProceduresComCatChart from './tab2/ProceduresComCatChart'
import DocumentChart from './tab2/DocumentsInfoChart'
// Nivo instructions:
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// Class component because we need to store state
// Props to futureproof

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Empty array that updates for Nivo to display
      color: "category10", // Default chart color
      sessions: [], // Sessions data will be pulled from backend
      male2017: 0, // Number of male searches for a given product in 2017
      female2017: 0, // Setting at zero because updates based on backend data
      male2018: 0,
      female2018: 0,
      male2019: 0,
      female2019: 0,
      male2017percent: 0, // Percentage of people that are male that searched for a product in 2017
      female2017percent: 0,
      male2018percent: 0,
      female2018percent: 0,
      male2019percent: 0,
      female2019percent: 0,
      keys: ["Male", "Female"],
      selectedGender: "All"
    };
  }


  // Displays the chart
  // Going to move Responsive Bar into its own component, and render it here, will need to change props
  render() {
    return (
      <div className="Chart-Container">
        <div>
          <Route
            exact
            path="/crossing-frequency-chart"
            render={props => (
              <CrossingFreqChart
                pathname={"/crossing-frequency-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />

          <Route
            exact
            path="/gender-chart"
            render={props => (
              <GenderChart
                pathname={"/gender-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <GenderChart
              pathname={"/"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/education-chart"
            render={props => (
              <EducationChart
                pathname={"/education-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/age-chart"
            render={props => (
              <AgeChart
              pathname={"/age-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/country-chart"
            render={props => (
              <CountryChart
              pathname={"/country-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/language-chart"
            render={props => (
              <LanguageChart
              pathname={"/language-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/primaryincome-chart"
            render={props => (
              <PrimaryIncomeChart
              pathname={"/primaryincome-chart"}
                routerProps={props}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/produce-chart"
            render={props => (
              <ProduceChart
              pathname={"/produce-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />

{/* ///////////////////////////////////Tab2////////////////// */}
<Route
            exact
            path="/Agency-Information-chart"
            render={props => (
              <Agency_info
              pathname={"/Agency-Information-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />


<Route
            exact
            path="/Destination-chart"
            render={props => (
              <DestinationChart
              pathname={"/Destination-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />

<Route
            exact
            path="/Commodities-chart"
            render={props => (
              <ProceduresComChart
              pathname={"/Commodities-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />


<Route
            exact
            path="/Commodity-Categories-chart"
            render={props => (
              <ProceduresComCatChart
              pathname={"/Commodity-Categories-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />


<Route
            exact
            path="/Document-Information-chart"
            render={props => (
              <DocumentChart
              pathname={"/Document-Information-chart"}
                getDropDownDefault={this.props.getDropDownDefault}
                state={this.state}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

// Exporting
export default Chart;

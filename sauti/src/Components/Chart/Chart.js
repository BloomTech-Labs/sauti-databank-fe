// Displays chart based on Nivo's required format

// Requiring dependencies
import { Route } from "react-router-dom";
import React from "react";
//import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

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

  componentDidMount() {
    // Axios call to get sessions data from awesome backend
    axios
      // ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
      .get(`https://staging-sauti-labs-14.herokuapp.com/sessions/products/1`)
      .then(res => {
        console.log(res.data);
        this.setState({
          ...this.state,
          sessions: res.data
        });
      })
      .then(() => {
        // Variables need to be set to zero here as well, before we do this.setState
        let male2017 = 0;
        let female2017 = 0;
        let male2018 = 0;
        let female2018 = 0;
        let male2019 = 0;
        let female2019 = 0;

        // Map over the sessions array to count number of males and females per year
        this.state.sessions.map(session => {
          if (session.date.includes("2017")) {
            if (session.gender === "male") {
              male2017 += 1;
              // total2017 += 1; Possible way to clean up
            } else {
              female2017 += 1;
              // total2017 += 1;
            }
          } else if (session.date.includes("2018")) {
            if (session.gender === "male") {
              male2018 += 1;
            } else {
              female2018 += 1;
            }
          } else {
            if (session.gender === "male") {
              male2019 += 1;
            } else {
              female2019 += 1;
            }
          }
        });

        // Made code more DRY by defining calcTotal and calcPercentage functions
        const calcTotal = (maleCount, femaleCount) => {
          let totalCount = maleCount + femaleCount;
          return totalCount;
        };
        let total2017 = calcTotal(male2017, female2017);
        let total2018 = calcTotal(male2018, female2018);
        let total2019 = calcTotal(male2019, female2019);

        const calcPercentage = (genderCount, totalCount) => {
          return Math.round((genderCount / totalCount) * 100);
        };

        let male2017percent = calcPercentage(male2017, total2017);
        let male2018percent = calcPercentage(male2018, total2018);
        let male2019percent = calcPercentage(male2019, total2019);
        let female2017percent = calcPercentage(female2017, total2017);
        let female2018percent = calcPercentage(female2018, total2018);
        let female2019percent = calcPercentage(female2019, total2019);

        // Setting state
        this.setState({
          ...this.state,
          male2017percent: male2017percent,
          female2017percent: female2017percent,
          male2018percent: male2018percent,
          female2018percent: female2018percent,
          male2019percent: male2019percent,
          female2019percent: female2019percent
        });

        // Calls function that puts data in Nivo's format
        this.populateChart();
      });
  }

  genderFilter = gender => {
    if (gender === "All") {
      this.changeGenderToAll();
    } else if (gender === "Male") {
      this.changeGenderAllToMale();
    } else if (gender === "Female") {
      this.changeGenderAllToFemale();
    }
  };
  changeGenderAllToMale = () => {
    if (
      (this.state.keys.includes("Female") &&
        this.state.keys.includes("Male")) ||
      !this.state.keys.includes("Male")
    ) {
      this.setState({ keys: ["Male"] });
    }
    // else {
    //   return alert('You have already filtered for male')
    // }
  };

  changeGenderAllToFemale = () => {
    if (
      (this.state.keys.includes("Female") &&
        this.state.keys.includes("Male")) ||
      !this.state.keys.includes("Female")
    ) {
      this.setState({ keys: ["Female"] });
    }
    // else {
    //   return alert('You have already filtered for female')
    // }
  };

  changeGenderToAll = () => {
    if (
      (this.state.keys.includes("Male") &&
        !this.state.keys.includes("Female")) ||
      (this.state.keys.includes("Female") && !this.state.keys.includes("Male"))
    ) {
      this.setState({ keys: ["Male", "Female"] });
    }
    // else {
    //   return alert('You have already filtered for both')
    // }
  };

  // Function that formats data in Nivo's format using this.state
  populateChart = year => {
    let data = [];

    if (year === "2017") {
      data = [
        {
          Year: "2017",
          Male: this.state.male2017percent,
          MaleColor: "hsl(65, 70%, 50%)",
          Female: this.state.female2017percent,
          FemaleColor: "hsl(212, 70%, 50%)"
        }
      ];
    } else if (year === "2018") {
      data = [
        {
          Year: "2018",
          Male: this.state.male2018percent,
          MaleColor: "hsl(65, 70%, 50%)",
          Female: this.state.female2018percent,
          FemaleColor: "hsl(212, 70%, 50%)"
        }
      ];
    } else if (year === "2019") {
      data = [
        {
          Year: "2019",
          Male: this.state.male2019percent,
          MaleColor: "hsl(65, 70%, 50%)",
          Female: this.state.female2019percent,
          FemaleColor: "hsl(212, 70%, 50%)"
        }
      ];
    } else {
      data = [
        {
          Year: "2017",
          Male: this.state.male2017percent,
          MaleColor: "hsl(65, 70%, 50%)",
          Female: this.state.female2017percent,
          FemaleColor: "hsl(212, 70%, 50%)"
        },
        {
          Year: "2018",
          Male: this.state.male2018percent,
          MaleColor: "hsl(65, 70%, 50%)",
          Female: this.state.female2018percent,
          FemaleColor: "hsl(212, 70%, 50%)"
        },
        {
          Year: "2019",
          Male: this.state.male2019percent,
          MaleColor: "hsl(65, 70%, 50%)",
          Female: this.state.female2019percent,
          FemaleColor: "hsl(212, 70%, 50%)"
        }
      ];
    }

    this.setState({
      ...this.state,
      data: data
    });
  };

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
        </div>
      </div>
    );
  }
}

// Exporting
export default Chart;

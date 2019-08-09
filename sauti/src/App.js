import React from "react";
import axios from "axios";
import Chart from "./Components/Chart/Chart";
// import Transformation from "../Transformation"
// import ComSelTransformation from "./Components/ComSelTransformation"
import "./App.scss";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      sessions_production: [],
      realData: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/sessions/all`).then(res => {
      console.log(res);
      this.setState({
        sessions: res.data[0]
      });
    });

    axios
      // For development: ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
      .get(`https://sa-stage.herokuapp.com/sessions/lance/all`)
      .then(res => {
        // Log to see the response from server: console.log(res.data);
        this.setState({
          ...this.state,
          realData: res.data
        });
      });
  }

  onSelect = option => {
    console.log("You selected ", option.label);
    this.setState({ selected: option });
    if (option.label == "Gender") {
      this.props.history.push("/gender-chart");
    } else if (option.label == "Crossing Frequency") {
      this.props.history.push("/crossing-frequency-chart");
    } else {
      this.props.history.push("/education-chart");
    }
  };

  render() {
    console.log(this.props);
    const options = ["Gender", "Education", "Crossing Frequency"];
    const defaultOption = options[2];

    return (
      <div className="App">
        <h1>Welcome to the Sauti Databank!</h1>
        <div className="main-container">
          <div className="header">
            <h1>Informal Cross-Border Trade Data</h1>
          </div>
          <div className="content-container">
            <div className="chart-container">
              <Chart />
            </div>
            {/* <ComSelTransformation /> */}
            <div className="dropdown-container">
              <p>Key Trader Demographics</p>
              <Dropdown
                className="dropdown"
                options={options}
                onChange={this.onSelect}
                value={defaultOption}
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

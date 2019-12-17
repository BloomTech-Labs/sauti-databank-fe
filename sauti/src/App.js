import React, { Component, useState } from "react";
import "./App.scss";
import "./index.css";

import Navbar from "./Components/Navbar";
import Options from "./Constants/Options";
import Dropdown from "react-dropdown";
import FilterForm from './GQL Components/FilterBox'
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";

import Queries from "./GQL Components/Queries";

const App = () => {
  const [defaultOption, setDefaultOption] = useState("Select a Chart");
  const [input, setInput] = useState("");

  const onChange = event => {
    setInput(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setDefaultOption(input);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <div className="header">
          <h1>Informal Cross-Border Trade Data</h1>
        </div>
        <div className="content-container">
          <div className="chart-container">
            <Queries />
          </div>
            <div className="dropdown-container">
              <p>Choose Index</p>
              <FilterForm />
              {/* <Dropdown
                controlClassName="myControlClassName"
                arrowClassName="myArrowClassName"
                className="dropdown"
                options={options}
                onChange={this.onSelect}
                value={this.state.defaultOption}
                placeholder="Select an option"
              /> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default withRouter(App);

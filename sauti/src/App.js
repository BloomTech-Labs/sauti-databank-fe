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
  const [index, setIndex] = useState("gender");
  const [crossFilter, setCrossFilter] = useState("");
  const [allowNulls, setAllowNulls] = useState(true);

  const onChange = event => {
    setIndex(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setCrossFilter(e.target.value);
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
            <Queries index={index} crossFilter={crossFilter} allowNulls={allowNulls} />
          </div>
            <div className="dropdown-container">
              <p>Choose Index</p>
              <FilterForm onChange={onChange} onSubmit={onSubmit} index={index} setIndex={setIndex} setCrossFilter={setCrossFilter} />
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

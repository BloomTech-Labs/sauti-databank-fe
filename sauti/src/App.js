import React, { useState } from "react";
import "./App.scss";
import "./index.css";

import Navbar from "./Components/Navbar";
import FilterForm from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";

import Queries from "./Components/Queries";

const App = () => {
  const [index, setIndex] = useState("gender");
  const [crossFilter, setCrossFilter] = useState("");
  const [query, setQuery] = useState("tradersUsers");
  const [label, setLabel] = useState('Gender')
  const [argForQuery, setArgForQuery] = useState('')


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
            <Queries
              index={index}
              crossFilter={crossFilter}
              query={query}
              label={label}
              argForQuery={argForQuery}
            />
          </div>
          <div className="dropdown-container">
            <p>Choose Index</p>
            <FilterForm
              onChange={onChange}
              onSubmit={onSubmit}
              index={index}
              setIndex={setIndex}
              setCrossFilter={setCrossFilter}
              setQuery={setQuery}
              label={label}
              setLabel={setLabel}
              setArgForQuery={setArgForQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);

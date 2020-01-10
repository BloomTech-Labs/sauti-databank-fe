import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from 'react-ga';
import Navbar from "./Components/Navbar";
import FilterForm from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";

import Queries from "./Components/Queries";

const App = () => {
  const [index, setIndex] = useState({ type: 'education', query: 'Users'});
  const [crossFilter, setCrossFilter] = useState({ type: 'crossing_freq', query: 'Users'});
  const [label, setLabel] = useState("Gender");
  const [label2, setLabel2] = useState("");
  const [argForQuery, setArgForQuery] = useState("");
  const [optionsForCheckbox, setCheckboxOptions] = useState([])

  useEffect (()=> {
    ReactGa.initialize('UA-155468784-1')
    
    //to report specified pageview:
    ReactGa.pageview('/')
  }, []);

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
              label={label}
              label2={label2}
              argForQuery={argForQuery}
            />
          </div>
          <div className="dropdown-container">
            <p>Choose Index</p>
            <FilterForm
              onChange={onChange}
              onSubmit={onSubmit}
              index={index}
              // setOptions={setOptions}
              optionsForCheckbox={optionsForCheckbox}
              setCheckboxOptions={setCheckboxOptions}
              setIndex={setIndex}
              setCrossFilter={setCrossFilter}
              label={label}
              label2={label2}
              setLabel={setLabel}
              setLabel2={setLabel2}
              setArgForQuery={setArgForQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);

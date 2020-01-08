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
  const [index, setIndex] = useState("gender");
  const [index2, setIndex2] = useState("");
  const [crossFilter, setCrossFilter] = useState("age");
  const [query, setQuery] = useState("tradersUsers");
  const [label, setLabel] = useState("Gender");
  const [label2, setLabel2] = useState("");
  const [argForQuery, setArgForQuery] = useState("");

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
              index2={index2}
              setIndex={setIndex}
              setIndex2={setIndex2}
              setCrossFilter={setCrossFilter}
              setQuery={setQuery}
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

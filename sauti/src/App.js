import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";
import Queries from "./Components/Queries";

const App = () => {
  const [index, setIndex] = useState({
    type: "request_type",
    query: "Sessions"
  });
  const [crossFilter, setCrossFilter] = useState({ 
    type: "age", 
    query: "Users" 
  });
  const [indexLabel, setIndexLabel] = useState(
    "Most Requested Procedures Commodities"
  );
  const [crossLabel, setCrossLabel] = useState("");
  const [argForQuery, setArgForQuery] = useState("procedurecommodity");
  const [optionsForCheckbox, setCheckboxOptions] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState({});
  const [startDate, setStartDate] = useState("2012-01-01");
  const [endDate, setEndDate] = useState("2020-01-08");

  useEffect(() => {
    ReactGa.initialize("UA-155468784-1");
    //to report specified pageview:
    ReactGa.pageview("/");
  }, []);

  const onChange = event => {
    setIndex(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setCrossFilter(e.target.value);
  };

  console.log("selected checkbox!!!!", selectedCheckbox);

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
              label={indexLabel}
              crossLabel={crossLabel}
              argForQuery={argForQuery}
              selectedCheckbox={selectedCheckbox}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          {/* <div className="dropdown-container">
            <FilterBox
              onChange={onChange}
              onSubmit={onSubmit}
              index={index}
              optionsForCheckbox={optionsForCheckbox}
              crossFilter={crossFilter}
              setIndex={setIndex}
              setCrossFilter={setCrossFilter}
              setIndexLabel={setIndexLabel}
              setCrossLabel={setCrossLabel}
              setArgForQuery={setArgForQuery}
              setSelectedCheckbox={setSelectedCheckbox}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);

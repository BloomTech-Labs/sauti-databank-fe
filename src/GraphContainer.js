import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";
import Queries from "./Components/Queries2";

const GraphContainer = () => {
  // I think heroku crashed as it was stil working before this
  const [filters, setFilters] = useState({
    // should eliminate the need to use index and crossFilter in FilterBox and Queries2
    0: {
      selectedCategory: "",
      selectedOption: "",
      selectedTable: "",
      // selectedCategory is actually being used for this field
      selectedTableColumnName: ""
    },
    1: {
      selectedCategory: "",
      selectedOption: "",
      selectedTable: "",
      selectedTableColumnName: ""
    },
    2: {
      selectedCategory: "",
      selectedOption: "",
      selectedTable: "",
      selectedTableColumnName: ""
    }
  });
  const [index, setIndex] = useState({
    type: "gender",
    query: "Users",
    label: ""
  });
  const [crossFilter, setCrossFilter] = useState({
    type: "",
    query: "Users",
    label: ""
  });
  const [additionalFilter, setAdditionalFilter] = useState({
    type: "",
    query: "",
    label: ""
  });
  const [firstSelectedCheckbox, setFirstSelectedCheckbox] = useState({});
  const [secondSelectedCheckbox, setSecondSelectedCheckbox] = useState({});
  const [selectedCheckbox, setSelectedCheckbox] = useState({});

  const [indexLabel, setIndexLabel] = useState("Gender");
  const [crossLabel, setCrossLabel] = useState("");

  const [checkboxOptions, setCheckboxOptions] = useState([]);
  const [secondCheckboxOptions, setSecondCheckboxOptions] = useState([]);

  const [startDate, setStartDate] = useState("2012-01-01");
  const [endDate, setEndDate] = useState("2020-01-08");

  // useEffect(() => {
  //   ReactGa.initialize("UA-155468784-1");
  //   //to report specified pageview:
  //   ReactGa.pageview("/");
  // }, []);

  const onChange = event => {
    setIndex(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setCrossFilter(e.target.value);
  };

  return (
    <div className="App">
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
              selectedCheckbox={selectedCheckbox}
              checkboxOptions={checkboxOptions}
              setCheckboxOptions={setCheckboxOptions}
              setSecondCheckboxOptions={setSecondCheckboxOptions}
              additionalFilter={additionalFilter}
              startDate={startDate}
              endDate={endDate}
              secondSelectedCheckbox={secondSelectedCheckbox}
              firstSelectedCheckbox={firstSelectedCheckbox}
              filters={filters}
            />
          </div>
          <div className="dropdown-container">
            <FilterBox
              onChange={onChange}
              onSubmit={onSubmit}
              index={index}
              checkboxOptions={checkboxOptions}
              crossFilter={crossFilter}
              setIndex={setIndex}
              setCrossFilter={setCrossFilter}
              setIndexLabel={setIndexLabel}
              setCrossLabel={setCrossLabel}
              setSelectedCheckbox={setSelectedCheckbox}
              setCheckboxOptions={setCheckboxOptions}
              setAdditionalFilter={setAdditionalFilter}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setFirstSelectedCheckbox={setFirstSelectedCheckbox}
              setSecondSelectedCheckbox={setSecondSelectedCheckbox}
              secondCheckboxOptions={secondCheckboxOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(GraphContainer);

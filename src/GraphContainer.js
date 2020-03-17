import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";
import Queries from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
// Data Filter
//  <p className="disclosure">
// *This optional filter adjusts samplesize and may not always alter the
// graph appearance.
// </p>
//{/* for future: more than 1 data filter */}
//{
/*
          what do worandon woman trade?
          what doe rwandon women over 50 trade?

          just filter what they already have set up from the first 2 filters
          they should be able to add another additional filter

          low priority:

            the dates on the calendar should be dynamically set to the dates in the items the categories are filterd

            be able to measure date periods by year

        */
//}

const GraphContainer = () => {
  const [filters, setFilters] = useState({
    // default query setup
    // show or hide is only for the first one
    // check with russ about changes
    // first one: show or hide
    // second one: always hide
    // all rest: always show
    0: {
      nameOfFilter: "Data Series",
      selectedCategory: "Gender", // label
      selectedOption: undefined,
      avaliableOptions: [],
      selectedTable: "Users", // value.query
      selectedTableColumnName: "gender", // value.type
      showOptions: false
    },

    1: {
      nameOfFilter: "Compare SubSamples",
      selectedCategory: "",
      selectedOption: undefined,
      avaliableOptions: [],
      selectedTable: "Users",
      selectedTableColumnName: "",
      showOptions: false
    },
    2: {
      nameOfFilter: "Data Filter",
      selectedCategory: "",
      selectedOption: undefined,
      avaliableOptions: [],
      selectedTable: "",
      selectedTableColumnName: "",
      showOptions: false
    }
  });
  // put the date here
  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = useCalendar();

  // const [index, setIndex] = useState({
  //   type: "gender",
  //   query: "Users",
  //   label: ""
  // });
  // const [crossFilter, setCrossFilter] = useState({
  //   type: "",
  //   query: "Users",
  //   label: ""
  // });
  // const [additionalFilter, setAdditionalFilter] = useState({
  //   type: "",
  //   query: "",
  //   label: ""
  // });
  // const [firstSelectedCheckbox, setFirstSelectedCheckbox] = useState({});
  // const [secondSelectedCheckbox, setSecondSelectedCheckbox] = useState({});
  // const [selectedCheckbox, setSelectedCheckbox] = useState({});

  // const [indexLabel, setIndexLabel] = useState("Gender");
  // const [crossLabel, setCrossLabel] = useState("");

  // const [checkboxOptions, setCheckboxOptions] = useState([]);
  // const [secondCheckboxOptions, setSecondCheckboxOptions] = useState([]);

  // const [startDate, setStartDate] = useState("2012-01-01");
  // const [endDate, setEndDate] = useState("2020-01-08");

  // useEffect(() => {
  //   ReactGa.initialize("UA-155468784-1");
  //   //to report specified pageview:
  //   ReactGa.pageview("/");
  // }, []);

  // const onChange = event => {
  //   // setIndex(event.target.value);
  // };
  /*
breaks search(creates an undefined search)
{0: {…}, 1: {…}, 2: {…}}
0:
selectedTableColumnName: "crossing_freq"
selectedTable: "Users"
selectedCategory: "Border Crossing Frequency"
selectedOption: undefined
__proto__: Object
1:
selectedCategory: ""
selectedOption: undefined
selectedTable: ""
selectedTableColumnName: ""
__proto__: Object
2:
selectedCategory: "Most Requested Procedure Commodity Categories"
selectedOption: undefined
selectedTable: "Sessions"
selectedTableColumnName: "procedurecommoditycat"
*/
  const onSubmit = e => {
    e.preventDefault();
    // setCrossFilter(e.target.value);
  };

  const [hidden, setHidden] = useState(false);

  function HideFilters() {
    setHidden(!hidden);
  }

  return (
    <div className="App">
      <div className="main-container">
        <TopBar className="header">
          <h1>Informal Cross-Border Trade Data</h1>
          <FilterHideButton onClick={HideFilters}>
            {hidden ? <p>Show Filters</p> : <p>Hide Filters</p>}
          </FilterHideButton>
        </TopBar>
        <div className="content-container">
          <div className={hidden ? "extend" : "chart-container"}>
            <Queries
              // index={index}
              // crossFilter={crossFilter}
              // label={indexLabel}
              // crossLabel={crossLabel}
              // selectedCheckbox={selectedCheckbox}
              // checkboxOptions={checkboxOptions}
              // setCheckboxOptions={setCheckboxOptions}
              // setSecondCheckboxOptions={setSecondCheckboxOptions}
              // additionalFilter={additionalFilter}
              // startDate={startDate}
              // endDate={endDate}
              // secondSelectedCheckbox={secondSelectedCheckbox}
              // firstSelectedCheckbox={firstSelectedCheckbox}
              filters={filters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </div>
          {/* can put a hide/show button here */}
          <div className="dropdown-container">
            <FilterBox
              // onChange={onChange}
              // onSubmit={onSubmit}
              // index={index}
              // checkboxOptions={checkboxOptions}
              // crossFilter={crossFilter}
              // setIndex={setIndex}
              // setCrossFilter={setCrossFilter}
              // setIndexLabel={setIndexLabel}
              // setCrossLabel={setCrossLabel}
              // setSelectedCheckbox={setSelectedCheckbox}
              // setCheckboxOptions={setCheckboxOptions}
              // setAdditionalFilter={setAdditionalFilter}
              // startDate={startDate}
              // endDate={endDate}
              // setStartDate={setStartDate}
              // setEndDate={setEndDate}
              // setFirstSelectedCheckbox={setFirstSelectedCheckbox}
              // setSecondSelectedCheckbox={setSecondSelectedCheckbox}
              // secondCheckboxOptions={secondCheckboxOptions}
              filters={filters}
              setFilters={setFilters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(GraphContainer);

const FilterHideButton = styled.button`
  padding: 20px;
  width: 200px;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  background-color: #eb5e52;
  color: white;
  margin-right: 20px;
  transition: 0.5s ease;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

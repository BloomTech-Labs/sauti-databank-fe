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

/*
          what do worandon woman trade?
          what doe rwandon women over 50 trade?

          just filter what they already have set up from the first 2 filters
          they should be able to add another additional filter

          low priority:

            the dates on the calendar should be dynamically set to the dates in the items the categories are filterd

            be able to measure date periods by year

sort asending all except for education level options
and border crossing frequency options



additional filters:
default to show
when next additional filter is picked
the previous filter is hiding all but the selected one



append additional filters here
Additional Filter: Country of Residence - 20-30
use a newline to separate them



downloading:
  export subsample needs to include all from the data series options
  It not currently doing that



huge space between title spaces
*/

const GraphContainer = () => {
  const [filters, setFilters] = useState({
    // old plan
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
      selectableOptions: {
        Female: false,
        male: false
      },
      selectedTable: "Users", // value.query
      selectedTableColumnName: "gender", // value.type
      showOptions: false
    },

    1: {
      nameOfFilter: "Compare SubSamples",
      selectedCategory: "",
      selectedOption: undefined,
      avaliableOptions: [],
      selectableOptions: {},
      selectedTable: "Users",
      selectedTableColumnName: "",
      showOptions: false
    },
    2: {
      nameOfFilter: "Data Filter",
      selectedCategory: "",
      selectedOption: undefined,
      avaliableOptions: [],
      selectableOptions: {},
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
              filters={filters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </div>
          {/* can put a hide/show button here */}
          <div
            className={
              hidden ? "dropdown-container hide" : "dropdown-container"
            }
          >
            <FilterBox
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

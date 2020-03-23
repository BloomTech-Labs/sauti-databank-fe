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
        <div className="header">
          <h1>Informal Cross-Border Trade Data</h1>
          {/* <FilterHideButton onClick={HideFilters}>
            {hidden ? <p>Show Filters</p> : <p>Hide Filters</p>}
          </FilterHideButton> */}
        </div>
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
          <FilterHideButton onClick={HideFilters}>
            {hidden ? <p>◀</p> : <p>▶</p>}
          </FilterHideButton>
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
  font-size: 2.5rem;
  font-weight: bold;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  color: grey;
  height: 200px;
  align-self: center;
  transition: 0.4s ease;
  &:hover {
    background-color: grey;
    color: white;
    cursor: pointer;
  }
`;

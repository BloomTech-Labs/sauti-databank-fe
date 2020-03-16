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
  console.log(startDate);
  const [endDate, setEndDate] = useState("2020-01-08");
  console.log(endDate);

  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = useCalendar();

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
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </div>
          <div
            className={
              hidden ? "dropdown-container hide" : "dropdown-container"
            }
          >
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

import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter, useParams, useHistory } from "react-router-dom";

import Queries from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
import { getAvaliableOptions, getSelectedOption } from "./OptionFunctions";
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
(did manually so not totally sure)




(seems to work now)
additional filters:
default to show
when next additional filter is picked
the previous filter is hiding all but the selected one


(seems to work now)
append additional filters here
Additional Filter: Country of Residence - 20-30
use a newline to separate them


(leave for monday morning meeting with lance)
downloading:
  export subsample needs to include all from the data series options
  It not currently doing that
  It seems as it's not including all from data series reguardless of wether subsample is chosen or not
  it's just including a few more if no subsample is chosen

  the items not included so far have no data, so does he want rows
  filled with zeros



huge space between title spaces





have the download file name and columns(no subsamples) to have column names
for additional filters
*/

const GraphContainer = () => {
  const [url, setUrl] = useState("");
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
      // selectedOption: undefined,
      // avaliableOptions: [],
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
      // selectedOption: undefined,
      // avaliableOptions: [],
      selectableOptions: {},
      selectedTable: "Users",
      selectedTableColumnName: "",
      showOptions: false
    },
    2: {
      nameOfFilter: "Data Filter",
      selectedCategory: "",
      // selectedOption: undefined,
      // avaliableOptions: [],
      selectableOptions: {},
      selectedTable: "",
      selectedTableColumnName: "",
      showOptions: true
    }
  });

  let urlSearchParams = {};
  Object.keys(filters).forEach(filterId => {
    // const filterName = 'filter' + String(filterId)
    urlSearchParams = {
      ...urlSearchParams,
      ["filter" + String(filterId)]: filters[filterId].selectedTableColumnName
    };
  });

  let useEffectFilterDependencies = Object.keys(filters).map(filterId => {
    return filters[filterId].selectedTableColumnName;
  });

  console.log(useParams());
  // const {slug} = useParams()
  // console.log(slug)
  // ?filter=1543345434&anotherNameDataSeries=something
  console.log(urlSearchParams);
  console.log(useEffectFilterDependencies);
  console.log(useHistory());
  // erased ?
  console.log("query stuff");
  let searchString = useHistory().location.search.slice(
    1,
    useHistory().location.search.length
  );
  let split1 = searchString.split("&");
  // console.log(split1)
  for (var i in split1) {
    let split2 = split1[i].split("=");
    console.log(
      "attribut name",
      split2[0].replace("%20", " "),
      "search",
      split2[1]
    );
  }
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

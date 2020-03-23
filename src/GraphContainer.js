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
import graphLabels from "./Components/graphLabels";

import { getAvaliableOptions, getSelectedOption } from "./OptionFunctions";

// redux "prop drilling" style
// know what filters will have before running this
/* <GraphContainer
    x={setupFilter()}
/>

setupFilter()
  if(history.search.length === 0)
    return default gender search object
  else
    return the urls search object
 */
const GraphContainer = props => {
  // const bla = () => {
  // //   if(history.search.length === 0)
  // //   return default gender search object
  // // else
  // //   return the urls search object
  // }
  const [url, setUrl] = useState("");
  const [filters, setFilters] = useState(props.filters);
  console.log("filters", filters);
  // useState(props.x)
  // old plan
  // default query setup
  // show or hide is only for the first one
  // check with russ about changes
  // first one: show or hide
  // second one: always hide
  // all rest: always show
  //   0: {
  //     nameOfFilter: "Data Series",
  //     selectedCategory: "Gender", // label
  //     // selectedOption: undefined,
  //     // avaliableOptions: [],
  //     selectableOptions: {
  //       Female: false,
  //       male: false
  //     },
  //     selectedTable: "Users", // value.query
  //     selectedTableColumnName: "gender", // value.type
  //     showOptions: false
  //   },

  //   1: {
  //     nameOfFilter: "Compare SubSamples",
  //     selectedCategory: "",
  //     // selectedOption: undefined,
  //     // avaliableOptions: [],
  //     selectableOptions: {},
  //     selectedTable: "Users",
  //     selectedTableColumnName: "",
  //     showOptions: false
  //   },
  //   2: {
  //     nameOfFilter: "Data Filter",
  //     selectedCategory: "",
  //     // selectedOption: undefined,
  //     // avaliableOptions: [],
  //     selectableOptions: {},
  //     selectedTable: "",
  //     selectedTableColumnName: "",
  //     showOptions: true
  //   }
  // });

  // let urlSearchParams = {};
  // Object.keys(filters).forEach(filterId => {
  //   // const filterName = 'filter' + String(filterId)
  //   urlSearchParams = {
  //     ...urlSearchParams,
  //     ["filter" + String(filterId)]: filters[filterId].selectedTableColumnName
  //   };
  // });

  // let useEffectFilterDependencies = Object.keys(filters).map(filterId => {
  //   return filters[filterId].selectedTableColumnName;
  // });

  // console.log(useParams());
  // // const {slug} = useParams()
  // // console.log(slug)
  // // ?filter=1543345434&anotherNameDataSeries=something
  // console.log(urlSearchParams);
  // console.log(useEffectFilterDependencies);
  // console.log(useHistory());
  // // erased ?
  // console.log("query stuff");
  // let searchString = useHistory().location.search.slice(
  //   1,
  //   useHistory().location.search.length
  // );
  // // "?filter0=gender%2CFemale&filter1=age%2Cundefined&filter2=crossing_freq%2CMonthly&filter3=education%2CSecondary"

  // let split1 = searchString.split("&");
  // // console.log(split1)
  // let newFilterObject = {};
  // for (var i in split1) {
  //   let split2 = split1[i].split("=");
  //   let split3 = split2[1].split("%2C");
  //   console.log(
  //     "filter name",
  //     split2[0],
  //     "search",
  //     "table name",
  //     split3[0],
  //     "option",
  //     split3[1]
  //   );
  //   let optionFlags = {};
  //   console.log();
  //   // get graphLabels[tableName].labels
  //   graphLabels[`${split3[0]}`].labels.forEach(option => {
  //     optionFlags = {
  //       ...optionFlags,
  //       [option]: false
  //     };
  //   });

  //   // the newFilterObject from the previous round is not
  //   // being used to make this one

  //   // wary of spreading using multiple sources inside the object
  //   newFilterObject = {
  //     ...newFilterObject,
  //     [i]: {
  //       // get rid of the "udefined" key
  //       // get already setup categories from the default
  //       ...filters[i],
  //       selectedTableColumnName: split3[0],
  //       // may permit more than 1 to be true
  //       // get the original set
  //       selectableOptions: {
  //         ...optionFlags,
  //         [split3[1]]: true
  //       }
  //     }
  //     // maybe the original filter could be reconstructed using the url data(filter is read only)
  //     // Redux?
  //   };
  //   console.log("new filter object", newFilterObject);

  // }
  // useEffect(()=>{
  //   setFilters(newFilterObject)

  // }, [])
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

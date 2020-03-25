import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from "react-loader-spinner";
import dataParse from "./dataParse";
import getIndex from "../DataParseHelpers/getIndex";
import graphLabels from "./graphLabels";
import removeMultiple from "../DataParseHelpers/removeMultiple";
import { getAvaliableOptions, getSelectedOption } from "../OptionFunctions";

const GetData = props => {
  let queryType = "tradersUsers";
  let QUERY;
  let thisQuery;

  const {
    filters,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;

  const filterIsSelected = (filter, i) => {
    // if the filter is the subsample or the data series
    // when the category name is selected
    if (i <= 1) {
      return filter.selectedCategory.length > 0;
    } else {
      // when the category name is selected and an option is selected
      return (
        filter.selectedCategory.length > 0 &&
        // 1 option is selected
        Object.keys(filter.selectableOptions).filter(
          selectableOption => filter.selectableOptions[selectableOption]
        ).length === 1
      );
    }
  };
  const firstThreeFilters = filterIds => {
    return (
      filterIds.length === 3 &&
      filterIds[0] == 0 &&
      filterIds[1] == 1 &&
      filterIds[2] == 2
    );
  };
  const onlyFirstThreeFiltersAreSelected = filters => {
    // console.log("in onlyFirstThreeFiltersAreSelected");

    const filterIds = Object.keys(filters);
    return (
      // we only have the first 3 filters
      firstThreeFilters(filterIds) &&
      // the filters we have are selected
      filterIds
        .map(filterId => filterIsSelected(filters[filterId], filterId))
        .filter(result => result === true).length === 3
    );
  };

  const isSessions = filters => {
    // console.log("in isSessions");

    // if at least 1 table says "Sessions" we use the sessions table
    return (
      Object.keys(filters).filter(
        filterId => filters[filterId].selectedTable === "Sessions"
      ).length > 0
    );
  };
  // if (only first 3 filters are selected) and (none of them are Sessions)

  console.log("filters", filters);
  // if all tables say users
  // go to users
  // else
  // got to sessions
  // const getAllTableNames = (filters) => {
  //   return Object.keys(filters).map(filterId => {
  //     return filters[filterId].selectedTable
  //   })
  // }
  // console.log()
  // const areAllUsers = (arrayOfTableNames, targetName) => {
  //   let count = 0
  //   arrayOfTableNames.forEach(tableName => {
  //     if(tableName === targetName) {
  //       count ++
  //     }
  //   })
  //   return count === arrayOfTableNames.length
  // }
  // if only first 3 filters are selected and none of them are Sessions
  // do tradersUsers query
  // if (onlyFirstThreeFiltersAreSelected(filters) && !isSessions(filters)) {
  //   // only use tradersUsers
  //   console.log("ONLY USE TRADERSUSERS");
  // }
  // if you are a free person you can only (use the first 3 filters)
  if (!isSessions(filters)) {
    queryType = "tradersUsers";
    console.log("Just Users");
    console.log(filters[0].selectedTable);
    console.log(filters[1].selectedTable);
    console.log(filters[2].selectedTable);
    thisQuery = {
      [filters[0].selectedTableColumnName]: getSelectedOption(filters, 0) // filters[0].selectedOption
    };
    QUERY = gql`
      query getUsers($queryTraders: newTraderInput){
        tradersUsers (input: $queryTraders) {
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}

        }
      }
      
      `;
  } else {
    console.log("Sessions Table Search");
    thisQuery = {};
    Object.keys(filters).forEach(filterId => {
      thisQuery = {
        ...thisQuery,
        [filters[filterId].selectedTableColumnName]: getSelectedOption(
          filters,
          filterId
        )
        //filters[filterId].selectedOption
      };
    });

    queryType = "sessionsData";
    QUERY = gql`
       query getData($queryTraders: newTraderSessionInput){
           sessionsData (input: $queryTraders){
           ${filters[0].selectedTableColumnName}
           ${filters[1].selectedTableColumnName}
           created_date
         }
       }
       `;
    // console.log(thisQuery, queryType, QUERY)
  }

  // it would be nice for this to run in a way that doesn't return any data untill the user actually sets up a query

  let { loading, data } = useQuery(QUERY, {
    variables: { queryTraders: thisQuery }
  });
  console.log("data", data);
  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={100000}
        />
      </div>
    );
  }

  const chartData = dataParse(
    filters[0].selectedTableColumnName,
    data[`${queryType}`],
    filters[1].selectedTableColumnName,

    filterBoxStartDate,

    filterBoxEndDate,
    filters[2].selectedTableColumnName,

    filters[0].selectedTable,
    filters[1].selectedTable
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs
  // console.log("csvData", chartData.dataStructure);
  // console.log(`cross filter type`, props.crossFilter.type);
  if (chartData === 1) {
    // alert(
    //   "There was an error getting the data. This can happen if you select too many filters and there is no data for that subset. The page will automatically refresh."
    // );
    // console.log(window)

    return (
      <div>
        <h1>Try a different search</h1>
      </div>
    );
  }
  console.log("chartdata_____-----", chartData);
  const makeFilterList = () => {
    console.log("makeFilterList WAS CALLED");
    // console.log("filtered list", Object.keys(filters)
    //                                     .filter(filterId => filterId >= 2)
    //                                     .map(filterId => (filters[filterId].selectedCategory))
    //                                     .join("\n"))
    return Object.keys(filters)
      .filter(filterId => filterId >= 2)
      .map(filterId => {
        return (
          <p>
            {filters[filterId].selectedCategory} -{" "}
            {getSelectedOption(filters, filterId)}
          </p>
        );
      });
  };
  /*
  just priting to the page
  data series
    bla
  subsample
    bla
  additional filter
    bla
    bla
  */
  if (filters[1].selectedTableColumnName !== "") {
    return (
      <div>
        <h1 className="graph-title">Data Series</h1>
        <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
        <h1 className="graph-title">Subsample</h1>
        <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>

        {filters[2].selectedTableColumnName && (
          <div>
            <h3 className="graph-title">Additional Filter:</h3>
            <h3 className="graph-title-small">{makeFilterList()}</h3>
          </div>
        )}
        {/* <h1 className="graph-title">
          {filters[0].selectedCategory} by {filters[1].selectedCategory}
        </h1>
        {filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter: {makeFilterList()} */}
        {/* {filters[1].selectedCategory} -{" "} */}
        {/* {Object.values({
              [filters[2].selectedCategory]: getSelectedOption(filters, 2)//filters[2].selectedOption
            }).length === 0
              ? "none"
              : Object.values({
                  [filters[2].selectedCategory]: getSelectedOption(filters, 2)//filters[2].selectedOption
                })[0]} */}
        {/* </h3> */}
        {/* )} */}

        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          // crossFilter={filters[1].selectedCategory}
          // additionalFilter={filters[2].selectedCategory}
          // selectedCheckbox={{
          //   [filters[2].selectedCategory]: getSelectedOption(filters, 2)//filters[2].selectedOption
          // }}
          keys={chartData.crossFilterValues}
          // index={filters[0].selectedTableColumnName}
          // label={filters[0].selectedCategory}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          // checkboxOptions={
          //   getAvaliableOptions(filters, 2)
          //   //filters[2].avaliableOptions
          // }
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="graph-title">Data Series</h1>
        <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
        <h1 className="graph-title">Subsample</h1>
        <h2 className="graph-title-small">-</h2>

        {filters[2].selectedTableColumnName && (
          <div>
            <h3 className="graph-title">Additional Filter:</h3>
            <h3 className="graph-title-small">{makeFilterList()}</h3>
          </div>
        )}
        <Graph
          data={chartData.percentageData}
          // data is cropped before the graph is called
          csvData={chartData.dataStructure}
          filters={filters}
          // additionalFilter={filters[2].selectedCategory}
          // selectedCheckbox={{
          //   [filters[2].selectedCategory]: getSelectedOption(filters, 2)//filters[2].selectedOption
          // }}
          // crossFilter={filters[1].selectedCategory}
          keys={chartData.keys || chartData.csvKeys}
          // index={filters[0].selectedTableColumnName}
          // label={filters[0].selectedCategory}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          // checkboxOptions={
          //   getAvaliableOptions(filters, 2)
          // //  filters[2].avaliableOptions
          // }
        />
      </div>
    );
  }
};

export default GetData;

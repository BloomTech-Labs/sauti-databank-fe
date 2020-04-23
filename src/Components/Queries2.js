import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Loader from "react-loader-spinner";
import dataParse from "./dataParse";
import { getSelectedOption } from "../OptionFunctions";
import LineGraphButton from "./LineGraphButton";

import { getQuery } from "../redux/actions/queriesAction";
import { connect } from "react-redux";

const GetData = props => {
  //LineGraph button
  const [open, setOpen] = useState(false);

  const buttonHandle = e => {
    setOpen(!open);
  };

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
  if (!isSessions(filters)) {
    queryType = "tradersUsers";
    console.log("Just Users");
    console.log(filters[0].selectedTable);
    console.log(filters[1].selectedTable);
    console.log(filters[2].selectedTable);
    Object.keys(filters).forEach(filterId => {
      if (filterId !== 1) {
        thisQuery = {
          ...thisQuery,
          [filters[filterId].selectedTableColumnName]: getSelectedOption(
            filters,
            filterId
          )
        };
      }
    });

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
  }

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
  );
  if (chartData === 1) {
    return (
      <div>
        <h1>Try a different search</h1>
      </div>
    );
  }
  console.log("chartdata_____-----", chartData);
  const makeFilterList = () => {
    console.log("makeFilterList WAS CALLED");
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

  //console.log("graph184");
  return (
    <>
      <LineGraphButton
        data={data}
        chartData={chartData}
        filters={filters}
        queryType={queryType}
        makeFilterList={makeFilterList}
        buttonHandle={buttonHandle}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, { getQuery })(GetData);

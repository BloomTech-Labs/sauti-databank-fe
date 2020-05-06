import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Loader from "react-loader-spinner";
import { getSelectedOption } from "../OptionFunctions";
import LineGraphButton from "./LineGraphButton";
import { seperateMultiples } from "./queriesParcer";
//import { filterByDate } from "../DataParseHelpers/filterByDate";

import { getQuery } from "../redux/actions/queriesAction";
import { useSelector, useDispatch } from "react-redux";

const GetData = props => {
  //LineGraph button
  const [open, setOpen] = useState("bar");

  const dispatch = useDispatch();

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
    // if at least 1 table says "Sessions" we use the sessions table
    return (
      Object.keys(filters).filter(
        filterId => filters[filterId].selectedTable === "Sessions"
      ).length > 0
    );
  };
  // if (only first 3 filters are selected) and (none of them are Sessions)

  if (!isSessions(filters)) {
    queryType = "tradersUsers";
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

  // data ? console.log(filters[0]) : console.log("no data")
  // useEffect(()=>{
  // (queryType="sessionsData") ? seperateMultiples(data, queryType) : console.log("no data")

  if (data !== undefined && Object.keys(data) === "sessionsData") {
    console.log("send to seperateMultiples");
    seperateMultiples(data, queryType);
  } else {
    console.log("no data");
  }

  //  data && Object.keys(data) === "sessionsData"
  //   ? filterByDate(data, filterBoxStartDate, filterBoxEndDate)
  //  : console.log("no data");
  // }, [data, filterBoxStartDate, filterBoxEndDate])
  console.log(data);

  // useEffect(() => {
  //   dispatch(getQuery(data));s

  // }, [data]);

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

  //   const chartData = dataParse(
  //     filters[0].selectedTableColumnName,
  //     data[`${queryType}`],
  //     filters[1].selectedTableColumnName,

  //     filterBoxStartDate,

  //     filterBoxEndDate,
  //     filters[2].selectedTableColumnName,

  //     filters[0].selectedTable,
  //     filters[1].selectedTable
  //   );
  //  console.log('chartdata', chartData)

  //   if (chartData === 1) {
  //     return (
  //       <div>
  //         <h1>Try a different search</h1>
  //       </div>
  //     );
  //   }

  //   const makeFilterList = () => {
  //     return Object.keys(filters)
  //       .filter(filterId => filterId >= 2)
  //       .map(filterId => {
  //         return (
  //           <p>
  //             {filters[filterId].selectedCategory} -{" "}
  //             {getSelectedOption(filters, filterId)}
  //           </p>
  //         );
  //       });
  //   };

  return (
    <>
      <LineGraphButton
        //chartData={chartData}
        filters={filters}
        queryType={queryType}
        filterBoxStartDate={filterBoxStartDate}
        filterBoxEndDate={filterBoxEndDate}
        // makeFilterList={makeFilterList}
        // buttonHandle={buttonHandle}
        open={open}
        setOpen={setOpen}
        data={data}
      />
    </>
  );
};

export default GetData;

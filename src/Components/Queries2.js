import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from "react-loader-spinner";
import dataParse from "./dataParse";
import getIndex from "../DataParseHelpers/getIndex";
import graphLabels from "./graphLabels";
import removeMultiple from "../DataParseHelpers/removeMultiple";

const GetData = props => {
  let queryType = "tradersUsers";
  let QUERY;
  let thisQuery = {};

  const {
    // firstSelectedCheckbox,
    filters,
    // secondSelectedCheckbox,
    // selectedCheckbox,
    // index,
    // crossFilter
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;

  // console.log(`props.index`, index);
  // console.log(`props.crossFilter`, crossFilter);
  // console.log(`props.additionalFilter`, props.additionalFilter);
  // console.log(" ONE props.firstSelectedCheckbox", props.firstSelectedCheckbox);
  // console.log(" ONE props.filters[0]", filters[0]);

  // console.log(
  //   " TWO props.secondSelectedCheckbox",
  //   props.secondSelectedCheckbox
  // );
  // console.log(` THREE props.selectedCheckbox`, props.selectedCheckbox);

  console.log("filter 0", filters[0]);
  console.log("filter 1", filters[1]);
  console.log("filter 2", filters[2]);

  /*

  queryOptions = useState({
    Users: {
      "undefined": {
        "undefined": {
          queryType: "tradersUsers",
          thisQuery: firstSelectedCheckbox,
          QUERY: gql`
                    query getUsers($queryTraders: newTraderInput){
                      tradersUsers (input: $queryTraders) {
                        ${props.index.type}
                      }
                    }
                    
                    `
        }
      }
    }
  })
  */
  // setup the filters part first
  //  setup the queries second
  if (
    filters[0].selectedTable === "Users" &&
    !filters[1].selectedTableColumnName &&
    !filters[2].selectedTableColumnName
  ) {
    queryType = "tradersUsers";
    console.log("just users");
    console.log(filters[0]);
    console.log(filters[1]);
    // console.log("crossFilter type", "|" + props.crossFilter.type + "|")

    // thisQuery = firstSelectedCheckbox;
    thisQuery = {
      [filters[0].selectedTableColumnName]: filters[0].selectedOption
    };
    QUERY = gql`
      query getUsers($queryTraders: newTraderInput){
        tradersUsers (input: $queryTraders) {
          ${filters[0].selectedTableColumnName}
        }
      }
      
      `;
  } else if (
    filters[0].selectedTable === "Users" &&
    filters[1].selectedTable === "Users" &&
    !filters[2].selectedTableColumnName
  ) {
    // props.index.type = selectedCategory
    // const firstQuery = firstSelectedCheckbox[props.index.type];
    // const firstQuery = filters[0].selectedOption
    /*
notes inside the first printout
first query Male gender firstSelectedCheckbox = {gender: "Male"} filters[0] = {selectedCategory: "gender", selectedOption: "Male"}
first query Male gender {gender: "Male"} {selectedCategory: "gender", selectedOption: "Male"}

*/
    console.log(
      "first query",
      // /*firstQuery,*/ props.index.type,
      // firstSelectedCheckbox,
      filters[0]
    );
    // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];

    console.log(
      "second query",
      // secondQuery,
      // props.crossFilter.type,
      // secondSelectedCheckbox,
      filters[1]
    );

    thisQuery = {
      // [props.index.type]: firstQuery,
      [filters[0].selectedTableColumnName]: filters[0].selectedOption, //firstQuery,
      // [props.crossFilter.type]: secondQuery
      [filters[1].selectedTableColumnName]: filters[1].selectedOption
    };
    console.log("the total queries", thisQuery);
    queryType = "tradersUsers";
    QUERY = gql`
      query getUsers($queryTraders: newTraderInput){
        tradersUsers (input: $queryTraders) {
          # ${props.index.type}
          # ${props.crossFilter.type}
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}

        }
      }
      `;
  } else if (
    filters[0].selectedTable === "Sessions" &&
    filters[1].selectedTable === "Users" &&
    !filters[2].selectedTableColumnName
  ) {
    queryType = "sessionsData";
    console.log("Sessions Users query");
    // console.log(firstSelectedCheckbox);
    console.log(filters[0]);
    console.log(filters[1]);

    // const firstQuery = firstSelectedCheckbox[props.index.type];
    // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    thisQuery = {
      // [props.index.type]: firstQuery,
      [filters[0].selectedTableColumnName]: filters[0].selectedOption,
      // [props.crossFilter.type]: secondQuery
      [filters[1].selectedTableColumnName]: filters[1].selectedOption
    };
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
          sessionsData (input: $queryTraders){
          # ${props.index.type}
          # ${props.crossFilter.type}
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}
          created_date
        }
      }
      `;
  } else if (
    filters[0].selectedTable === "Users" &&
    filters[1].selectedTable === "Sessions" &&
    !filters[2].selectedTableColumnName
  ) {
    queryType = "sessionsData";
    console.log("correct query???????????????????????");
    console.log(filters[0]);
    console.log(filters[1]);
    // const firstQuery = firstSelectedCheckbox[props.index.type];
    // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    thisQuery = {
      // [props.index.type]: firstQuery,
      [filters[0].selectedTableColumnName]: filters[0].selectedOption,
      // [props.crossFilter.type]: secondQuery
      [filters[1].selectedTableColumnName]: filters[1].selectedOption
    };
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
        sessionsData(input: $queryTraders){
          # ${props.index.type}
          # ${props.crossFilter.type}
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}

          created_date
        }
      }`;
  } else if (
    filters[0].selectedTable === "Sessions" &&
    filters[1].selectedTable === "Sessions" &&
    !filters[2].selectedTableColumnName
  ) {
    queryType = "sessionsData";
    console.log("breaking!!!!!!!!!!!!!!!");
    thisQuery = undefined;
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
        sessionsData (input: $queryTraders) {
          # ${props.index.type}
          # ${props.crossFilter.type}
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}

          created_date
        }
      }
      `;
  } else if (
    filters[0].selectedTable === "Users" &&
    filters[1].selectedTable === "Users" &&
    filters[2].selectedTable === "Users"
  ) {
    // const firstQuery = firstSelectedCheckbox[props.index.type];
    // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    // const thirdQuery = selectedCheckbox[props.additionalFilter.type];
    thisQuery = {
      // [props.index.type]: firstQuery,
      [filters[0].selectedTableColumnName]: filters[0].selectedOption,

      // [props.crossFilter.type]: secondQuery,
      // [props.additionalFilter.type]: thirdQuery
      [filters[1].selectedTableColumnName]: filters[1].selectedOption,
      [filters[2].selectedTableColumnName]: filters[2].selectedOption
    };
    queryType = "tradersUsers";
    QUERY = gql`
        query getUsers($queryTraders: newTraderInput){
          tradersUsers(input: $queryTraders) {
            # ${props.index.type}
            # ${props.crossFilter.type}
            ${filters[0].selectedTableColumnName}
            ${filters[1].selectedTableColumnName}

          }
          additionalFilterData: tradersUsers {
            # ${props.additionalFilter.type}
            ${filters[2].selectedTableColumnName}

          }
        }
        `;
  } else {
    console.log("all remaining combinations");
    console.log(filters);
    // some combinations break the program
    // it appears thet if there is a query with nothing asked to return then the query fails
    queryType = "sessionsData";
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
        sessionsData(input: $queryTraders){
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}

          created_date
        }
        additionalFilterData: sessionsData{
            id
            ${filters[2].selectedTableColumnName}

        }
      }
      `;
  }

  console.log("FINAL QUERY", thisQuery, /*firstSelectedCheckbox*/ filters);
  // it would be nice for this to run in a way that doesn't return any data untill the user actually sets up a query

  let { loading, data } = useQuery(QUERY, {
    variables: { queryTraders: thisQuery }
  });
  // [thisQuery]
  //queryType: props.selectedCheckbox
  if (data) {
    console.log(`returned data2`, data[queryType]);
    // console.log(firstSelectedCheckbox);
    // let filteredByDate = dataParse.filterByDate(data[queryType], filterBoxStartDate, filterBoxEndDate)
    // console.log("filtered by date", filteredByDate)
    // console.log(filters);
  }

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
  // data = [...data.tradersUsers, ...data.tradersData] // This is for when we are supporting multiple queries of same type

  // This is how we nab checkbox options.

  // let filteredData;
  // if (
  //   props.additionalFilter.type &&
  //   !graphLabels[`${props.additionalFilter.type}`]) {
  //   removeMultiple(data.additionalFilterData);
  //   filteredData = getIndex(
  //     data.additionalFilterData,
  //     `${props.additionalFilter.type}`
  //   ).map(obj => obj[`${props.additionalFilter.type}`]);
  //   filteredData = filteredData.filter(item => item !== null);
  // }

  // if (props.crossFilter.type &&
  //   !graphLabels[`${props.crossFilter.type}`]) {
  //   removeMultiple(data.sessionsData)
  //   filteredData = getIndex(
  //     data.sessionsData,
  //     `${props.crossFilter.type}`
  //   ).map(obj => obj[`${props.crossFilter.type}`]);
  //   filteredData = filteredData.filter(item => item !== null);
  // }

  const filterByDate = (data, startDate, endDate) => {
    startDate = startDate.replace(/-/g, "");
    endDate = endDate.replace(/-/g, "");
    // console.log("about to filter data", data)
    const filteredData = data.filter(obj => {
      const objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
      return objectDate > startDate && objectDate < endDate;
    });

    return filteredData;
  };

  // works
  if (Object.keys(data[`${queryType}`][0]).includes("created_date")) {
    console.log("ready to filter by date");
    // before filtering (most requested procedure commodities(Sessions case)) count = 19990
    // after filtering by Augist 9th 2017 count = 19215
    // before filtering first item date = 2017-06-20T00:16:28.0
    // after filtering first item date = 2017-08-10T15:06:33.00
    const filteredData = filterByDate(
      data[`${queryType}`],
      filterBoxStartDate,
      filterBoxEndDate
    );
    console.log("filtered by date", filteredData);
  }
  const chartData = dataParse(
    // props.index.type,
    filters[0].selectedTableColumnName,
    data[`${queryType}`],
    filters[1].selectedTableColumnName,
    // props.crossFilter.type,
    // props.startDate,
    filterBoxStartDate,
    // props.endDate,
    filterBoxEndDate,
    filters[2].selectedTableColumnName,
    // props.additionalFilter.type,
    // props.index.query
    filters[0].selectedTable
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs
  // console.log("csvData", chartData.dataStructure);
  // console.log(`cross filter type`, props.crossFilter.type);

  console.log("chartdata_____-----", chartData);

  // if (props.crossFilter.type !== "") {
  if (filters[1].selectedTableColumnName !== "") {
    return (
      <div>
        <h1 className="graph-title">
          {props.label} by {props.crossLabel}
        </h1>
        {/*props.additionalFilter.type*/ filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter:{" "}
            {/*props.additionalFilter.label*/ filters[1].selectedCategory} -{" "}
            {/* selectedCheckbox: {categoryName: optionName }*/}
            {Object.values(
              /*props.selectedCheckbox*/ {
                [filters[2].selectedCategory]: filters[2].selectedOption
              }
            ).length === 0
              ? "none"
              : Object.values(
                  /*props.selectedCheckbox*/ {
                    [filters[2].selectedCategory]: filters[2].selectedOption
                  }
                )[0]}
          </h3>
        )}

        {/* <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          crossFilter={props.crossFilter.type}
          additionalFilter={props.additionalFilter.type}
          selectedCheckbox={props.selectedCheckbox}
          keys={chartData.crossFilterValues}
          index={props.index.type}
          label={props.label}
          groupMode={"grouped"}
          // filteredData={filteredData}
          sampleSize={chartData.totalSampleSize}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
          setSecondCheckboxOptions={props.setSecondCheckboxOptions}
        /> */}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="graph-title">{props.label}</h1>
        {/*props.additionalFilter.type*/ filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter: {props.additionalFilter.label} -{" "}
            {Object.values(
              /*props.selectedCheckbox*/ {
                [filters[2].selectedCategory]: filters[2].selectedOption
              }
            ).length === 0
              ? "none"
              : Object.values(
                  /*props.selectedCheckbox*/ {
                    [filters[2].selectedCategory]: filters[2].selectedOption
                  }
                )[0]}
          </h3>
        )}
        {/* <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          additionalFilter={props.additionalFilter.type}
          selectedCheckbox={props.selectedCheckbox}
          crossFilter={props.crossFilter.type}
          keys={chartData.keys || chartData.csvKeys}
          index={props.index.type}
          label={props.label}
          groupMode={"stacked"}
          // filteredData={filteredData}
          sampleSize={chartData.sampleSize}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
          setSecondCheckboxOptions={props.setSecondCheckboxOptions}
        /> */}
      </div>
    );
  }
};

export default GetData;

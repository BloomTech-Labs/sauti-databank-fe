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
  let thisQuery;

  const {
    filters,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;

  if (
    filters[0].selectedTable === "Users" &&
    filters[1].selectedTable === "Users" &&
    filters[2].selectedTable === ""
  ) {
    queryType = "tradersUsers";
    console.log("just users");
    console.log(filters[0].selectedTable);
    console.log(filters[1].selectedTable);
    console.log(filters[2].selectedTable);
    thisQuery = {
      [filters[0].selectedTableColumnName]: filters[0].selectedOption
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
    thisQuery = {};
    Object.keys(filters).forEach(filterId => {
      thisQuery = {
        ...thisQuery,
        [filters[filterId].selectedTableColumnName]:
          filters[filterId].selectedOption
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

  // it would be nice for this to run in a way that doesn't return any data untill the user actually sets up a query

  let { loading, data } = useQuery(QUERY, {
    variables: { queryTraders: thisQuery }
  });

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

  // console.log("chartdata_____-----", chartData);

  if (filters[1].selectedTableColumnName !== "") {
    return (
      <div>
        <h1 className="graph-title">
          {filters[0].selectedCategory} by {filters[1].selectedCategory}
        </h1>
        {filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter: {filters[1].selectedCategory} -{" "}
            {Object.values({
              [filters[2].selectedCategory]: filters[2].selectedOption
            }).length === 0
              ? "none"
              : Object.values({
                  [filters[2].selectedCategory]: filters[2].selectedOption
                })[0]}
          </h3>
        )}

        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          crossFilter={filters[1].selectedCategory}
          additionalFilter={filters[2].selectedCategory}
          selectedCheckbox={{
            [filters[2].selectedCategory]: filters[2].selectedOption
          }}
          keys={chartData.crossFilterValues}
          index={filters[0].selectedTableColumnName}
          label={filters[0].selectedCategory}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          checkboxOptions={filters[2].avaliableOptions}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="graph-title">{filters[0].selectedCategory}</h1>
        {filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter: {filters[2].selectedCategory} -{" "}
            {Object.values({
              [filters[2].selectedCategory]: filters[2].selectedOption
            }).length === 0
              ? "none"
              : Object.values({
                  [filters[2].selectedCategory]: filters[2].selectedOption
                })[0]}
          </h3>
        )}
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          additionalFilter={filters[2].selectedCategory}
          selectedCheckbox={{
            [filters[2].selectedCategory]: filters[2].selectedOption
          }}
          crossFilter={filters[1].selectedCategory}
          keys={chartData.keys || chartData.csvKeys}
          index={filters[0].selectedTableColumnName}
          label={filters[0].selectedCategory}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          checkboxOptions={filters[2].avaliableOptions}
        />
      </div>
    );
  }
};

export default GetData;

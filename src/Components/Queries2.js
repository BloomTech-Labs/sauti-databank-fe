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

  console.log("filters", filters);

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
      [filters[0].selectedTableColumnName]: getSelectedOption(filters, 0)
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
    console.log("query");
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
  if (filters[1].selectedTableColumnName !== "") {
    return (
      <>
        <div className="graph-titles-container">
          <div className="graph-title-diplay">
            <h1 className="graph-title">Data Series</h1>
            <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
          </div>
          <div className="graph-title-diplay">
            <h1 className="graph-title">Subsample</h1>
            <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>
          </div>
          {filters[2].selectedTableColumnName && (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
              <h3 className="graph-title-small">{makeFilterList()}</h3>
            </div>
          )}
        </div>
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.crossFilterValues}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
        />
      </>
    );
  } else {
    return (
      <>
        <div className="graph-titles-container">
          <div className="graph-title-diplay">
            <h1 className="graph-title">Data Series</h1>
            <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
          </div>
          <div className="graph-title-diplay">
            <h1 className="graph-title">Subsample</h1>
            <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>
          </div>

          {filters[2].selectedTableColumnName ? (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
              <h3 className="graph-title-small">{makeFilterList()}</h3>
            </div>
          ) : (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
            </div>
          )}
        </div>
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.keys || chartData.csvKeys}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
        />
      </>
    );
  }
};

export default GetData;

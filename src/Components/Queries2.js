import React from "react";
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
  const { index, crossFilter } = props;

  console.log(index, `props.index`);
  console.log(crossFilter, `props.crossFilter`);
  console.log(props.additionalFilter, `props.additionalFilter`);
  console.log(props.selectedCheckbox, `props.selectedCheckbox`);
  let varz = {
    index,
    crossFilter
  };
  console.log("varz", varz);
  if (
    props.index.query === "Users" &&
    props.crossFilter.query === "Users" &&
    !props.additionalFilter.type
  ) {
    queryType = "tradersUsers";
    QUERY = gql`
      query getUsers($queryTraders: newTraderInput){
        tradersUsers (input: $queryTraders) {
          ${props.index.type}
          ${props.crossFilter.type}
        }
      }
      `;
  } else if (
    props.index.query === "Sessions" &&
    props.crossFilter.query === "Users" &&
    !props.additionalFilter.type
  ) {
    queryType = "sessionsData";
    QUERY = gql`
      query getData($querySessionData: newTraderSessionInput){
          sessionsData (input: $querySessionData){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }
      `;
  } else if (
    props.index.query === "Users" &&
    props.crossFilter.query === "Sessions" &&
    !props.additionalFilter.type
  ) {
    queryType = "sessionsData";
    QUERY = gql`
      query getData($querySessionData: newTraderSessionInput){
        sessionsData(input: $querySessionData){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }`;
  } else if (
    props.index.query === "Sessions" &&
    props.crossFilter.query === "Sessions" &&
    !props.additionalFilter.type
  ) {
    queryType = "sessionsData";
    QUERY = gql`
      query getData($querySessionData: newTraderSessionInput){
        sessionsData (input: $querySessionData) {
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }
      `;
  } else if (
    props.index.query === "Users" &&
    props.crossFilter.query === "Users" &&
    props.additionalFilter.query === "Users"
  ) {
    queryType = "tradersUsers";
    QUERY = gql`
        query getUsers($queryTraders: newTraderInput){
          tradersUsers(input: $queryTraders) {
            ${props.index.type}
            ${props.crossFilter.type}
          }
          additionalFilterData: tradersUsers {
            ${props.additionalFilter.type}
          }
        }
        `;
  } else {
    queryType = "sessionsData";
    QUERY = gql`
      query getData($querySessionData: newTraderSessionInput){
        sessionsData(input: $querySessionData){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
        additionalFilterData: sessionsData{
            ${props.additionalFilter.type}
        }
      }
      `;
  }

  let { loading, data } = useQuery(QUERY, {
    variables: { input: { age: "50-60" } }
  });

  if (data) console.log(`returned data`, data[queryType]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={12000}
        />
      </div>
    );
  }
  // data = [...data.tradersUsers, ...data.tradersData] // This is for when we are supporting multiple queries of same type

  let filteredData;
  // This is how we nab checkbox options.
  if (
    props.additionalFilter.type &&
    !graphLabels[`${props.additionalFilter.type}`]
  ) {
    removeMultiple(data.additionalFilterData);
    filteredData = getIndex(
      data.additionalFilterData,
      `${props.additionalFilter.type}`
    ).map(obj => obj[`${props.additionalFilter.type}`]);
    filteredData = filteredData.filter(item => item !== null);
  }
  // console.log(props.index.query, `Queiers.js index.query`);

  const chartData = dataParse(
    props.index.type,
    data[`${queryType}`],
    props.crossFilter.type,
    props.startDate,
    props.endDate,
    props.additionalFilter.type,
    props.index.query
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs
  // console.log("csvData", chartData.dataStructure);
  // console.log(`cross filter type`, props.crossFilter.type);
  if (props.crossFilter.type !== "") {
    return (
      <div>
        <h1 className="graph-title">
          {props.label} by {props.crossLabel}
        </h1>
        {props.additionalFilter.type && (
          <h3 className="graph-title-small">
            Additional Filter: {props.additionalFilter.label} -{" "}
            {Object.values(props.selectedCheckbox).length === 0
              ? "none"
              : Object.values(props.selectedCheckbox)[0]}
          </h3>
        )}

        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          crossFilter={props.crossFilter.type}
          additionalFilter={props.additionalFilter.type}
          selectedCheckbox={props.selectedCheckbox}
          keys={chartData.crossFilterValues}
          index={props.index.type}
          label={props.label}
          groupMode={"grouped"}
          filteredData={filteredData}
          sampleSize={chartData.totalSampleSize}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="graph-title">{props.label}</h1>
        {props.additionalFilter.type && (
          <h3 className="graph-title-small">
            Additional Filter: {props.additionalFilter.label} -{" "}
            {Object.values(props.selectedCheckbox).length === 0
              ? "none"
              : Object.values(props.selectedCheckbox)[0]}
          </h3>
        )}
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          additionalFilter={props.additionalFilter.type}
          selectedCheckbox={props.selectedCheckbox}
          crossFilter={props.crossFilter.type}
          keys={chartData.keys || chartData.csvKeys}
          index={props.index.type}
          label={props.label}
          groupMode={"stacked"}
          filteredData={filteredData}
          sampleSize={chartData.sampleSize}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
        />
      </div>
    );
  }
};

export default GetData;

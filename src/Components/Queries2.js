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
    firstSelectedCheckbox,
    secondSelectedCheckbox,
    selectedCheckbox,
    index,
    crossFilter,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;

  // console.log(`props.index`, index);
  // console.log(`props.crossFilter`, crossFilter);
  // console.log(`props.additionalFilter`, props.additionalFilter);
  // console.log(" ONE props.firstSelectedCheckbox", props.firstSelectedCheckbox);
  // console.log(
  //   " TWO props.secondSelectedCheckbox",
  //   props.secondSelectedCheckbox
  // );
  // console.log(` THREE props.selectedCheckbox`, props.selectedCheckbox);

  if (
    props.index.query === "Users" &&
    !props.crossFilter.type &&
    !props.additionalFilter.type
  ) {
    queryType = "tradersUsers";
    thisQuery = firstSelectedCheckbox;
    QUERY = gql`
      query getUsers($queryTraders: newTraderInput){
        tradersUsers (input: $queryTraders) {
          ${props.index.type}
        }
      }
      `;
  } else if (
    props.index.query === "Users" &&
    props.crossFilter.query === "Users" &&
    !props.additionalFilter.type
  ) {
    const firstQuery = firstSelectedCheckbox[props.index.type];
    const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    thisQuery = {
      [props.index.type]: firstQuery,
      [props.crossFilter.type]: secondQuery
    };
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
    // currently broken
    queryType = "sessionsData";
    const firstQuery = firstSelectedCheckbox[props.index.type];
    const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    thisQuery = {
      [props.index.type]: firstQuery,
      [props.crossFilter.type]: secondQuery
    };
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
          sessionsData (input: $queryTraders){
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
    const firstQuery = firstSelectedCheckbox[props.index.type];
    const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    thisQuery = {
      [props.index.type]: firstQuery,
      [props.crossFilter.type]: secondQuery
    };
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
        sessionsData(input: $queryTraders){
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
    const firstQuery = firstSelectedCheckbox[props.index.type];
    const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    thisQuery = {
      [props.index.type]: firstQuery,
      [props.crossFilter.type]: secondQuery
    };
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
        sessionsData (input: $queryTraders) {
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
    const firstQuery = firstSelectedCheckbox[props.index.type];
    const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    const thirdQuery = selectedCheckbox[props.additionalFilter.type];
    thisQuery = {
      [props.index.type]: firstQuery,
      [props.crossFilter.type]: secondQuery,
      [props.additionalFilter.type]: thirdQuery
    };
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
    const firstQuery = firstSelectedCheckbox[props.index.type];
    const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
    const thirdQuery = selectedCheckbox[props.additionalFilter.type];
    thisQuery = {
      [props.index.type]: firstQuery,
      [props.crossFilter.type]: secondQuery,
      [props.additionalFilter.type]: thirdQuery
    };
    QUERY = gql`
      query getData($queryTraders: newTraderSessionInput){
        sessionsData(input: $queryTraders){
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

  // console.log("FINAL QUERY", thisQuery);

  let { loading, data } = useQuery(QUERY, {
    variables: { queryTraders: thisQuery }
  });
  // [thisQuery]
  //queryType: props.selectedCheckbox
  // if (data) console.log(`returned data`, data[queryType]);
  // console.log(`data`, data);

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
  //   !graphLabels[`${props.additionalFilter.type}`]
  // ) {
  //   removeMultiple(data.additionalFilterData);
  //   filteredData = getIndex(
  //     data.additionalFilterData,
  //     `${props.additionalFilter.type}`
  //   ).map(obj => obj[`${props.additionalFilter.type}`]);
  //   filteredData = filteredData.filter(item => item !== null);
  // }

  // console.log("FILTERED DATA QUERIES", filteredData)
  // if (props.crossFilter.type &&
  //   !graphLabels[`${props.crossFilter.type}`]) {
  //   removeMultiple(data.sessionsData)
  //   filteredData = getIndex(
  //     data.sessionsData,
  //     `${props.crossFilter.type}`
  //   ).map(obj => obj[`${props.crossFilter.type}`]);
  //   filteredData = filteredData.filter(item => item !== null);
  // }

  const chartData = dataParse(
    props.index.type,
    data[`${queryType}`],
    props.crossFilter.type,
    filterBoxStartDate,
    filterBoxEndDate,
    props.additionalFilter.type,
    props.index.query,
    props.crossFilter.query
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs
  // console.log("csvData", chartData.dataStructure);
  // console.log(`cross filter type`, props.crossFilter.type);

  // console.log("chartdata_____-----", chartData);

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
          // filteredData={filteredData}
          sampleSize={chartData.totalSampleSize}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
          setSecondCheckboxOptions={props.setSecondCheckboxOptions}
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
          // filteredData={filteredData}
          sampleSize={chartData.sampleSize}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
          setSecondCheckboxOptions={props.setSecondCheckboxOptions}
        />
      </div>
    );
  }
};

export default GetData;

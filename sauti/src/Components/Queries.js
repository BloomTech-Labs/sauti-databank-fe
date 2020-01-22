import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from "react-loader-spinner";
import dataParse from "./dataParse";
import getIndex from "../DataParseHelpers/getIndex"
import graphLabels from "./graphLabels"

const GetData = props => {
  let queryType = "tradersData";
  let QUERY;

  if (props.index.query === "Users" && props.crossFilter.query === "Users" && !props.additionalFilter.type) {
    queryType = "tradersUsers";
    QUERY = gql`
      query getUsers( 
        $age: String,
        $gender: String, 
        $education: String 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        ){
        tradersUsers (
          age: $age,
          gender: $gender, 
          education: $education
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence
          ) {
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
    queryType = "tradersData";

    QUERY = gql`
      query getData(
        $age: String,
        $gender: String, 
        $education: String, 
        $request_type: String!,
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $request_value: String
        ){
        tradersData(
          age: $age,
          gender: $gender, 
          education: $education, 
          request_type: $request_type,
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          request_value: $request_value
          ){
          ${props.index.type}
          ${props.crossFilter.type}
          request_value
          created_date
        }
      }
      `;
  } else if (props.index.query === "Users" && props.crossFilter.query === "Users") {
    queryType = "tradersData";
    QUERY = gql`
      query getUsers( 
        $age: String,
        $gender: String, 
        $education: String 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $request_value: String,
        $additional_filter_type: String
        ){
        tradersData (
          age: $age,
          gender: $gender, 
          education: $education
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          request_value: $request_value,
          ) {
          ${props.index.type}
          ${props.crossFilter.type}
        }
        additionalFilterData:tradersData(request_type: $additional_filter_type){
            request_value
        }
      }
      `;
  } else {
    queryType = "tradersData";

    QUERY = gql`
      query getData(
        $age: String,
        $gender: String, 
        $education: String, 
        $request_type: String!,
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $request_value: String,
        $additional_filter_type: String,
        ){
        tradersData(
          age: $age,
          gender: $gender, 
          education: $education, 
          request_type: $request_type,
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          request_value: $request_value
          ){
          ${props.index.type}
          ${props.crossFilter.type}
          request_value
          created_date
        }
        additionalFilterData:tradersData(request_type: $additional_filter_type){
            request_value
        }
      }
      `;
  }

  let policyType;
  if (props.additionalFilter.type && !graphLabels[`${props.additionalFilter.type}`]) {
    policyType = "network-only";
  } else {
    policyType = "cache-first";
  }

  let { loading, data } = useQuery(QUERY, {
    variables: { ...props.selectedCheckbox, additional_filter_type: props.additionalFilter.type},
    fetchPolicy: policyType
  });

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
  if (props.additionalFilter.type) {
    filteredData = getIndex(data.additionalFilterData, `${props.additionalFilter.type}`).map(obj => obj.request_value);
  };

  const chartData = dataParse(
    props.index.type,
    data[`${queryType}`],
    props.crossFilter.type,
    props.startDate,
    props.endDate,
    props.additionalFilter.type,
    props.index.query
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

  if (props.crossFilter.type !== "") {
    return (
      <div>
        <h1 className="graph-title">
          {props.label} by {props.crossLabel}
        </h1>
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
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          additionalFilter={props.additionalFilter.type}
          selectedCheckbox={props.selectedCheckbox}
          crossFilter={props.crossFilter.type}
          keys={chartData.keys}
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

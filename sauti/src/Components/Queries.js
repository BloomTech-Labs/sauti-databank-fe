import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from "react-loader-spinner";
import dataParse from "./dataParse";

const GetData = props => {
  console.log("additonal thing", props.additionalFilter)
  console.log("RERENDERED")
  let queryType = "tradersData";
  let QUERY;

    // useEffect(() => {
    // }, [props.additionalFilter]);

  if (props.index.query === "Users" && props.crossFilter.query === "Users") {
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
        $country_of_residence: String
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
          ${props.additionalFilter}
        }
      }
      `;
  } else if (
    props.index.query === "Sessions" &&
    props.crossFilter.query === "Users"
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
          ${props.additionalFilter}
          request_value
          created_date
        }
      }
      `;
  }

  const { loading, error, data } = useQuery(QUERY, {
    variables: { ...props.selectedCheckbox, request_type: props.argForQuery }
  });

  if (loading)
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={5000}
        />
      </div>
    );

  const chartData = dataParse(
    props.index.type,
    data[`${queryType}`],
    props.crossFilter.type,
    props.argForQuery,
    props.additionalFilter,
    props.startDate,
    props.endDate
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

  if (props.crossFilter.type !== "") {
    return (
      <div>
        <h1 className="graph-title">
          {props.label} by {props.crossLabel}
        </h1>
        <Graph
          data={chartData.dataStructure}
          keys={chartData.crossFilterValues}
          indexBy={chartData.indexBy}
          label={props.label}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          additionalFilterOptions={chartData.additionalFilterOptions}
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
          data={chartData.dataStructure}
          keys={chartData.keys}
          indexBy={chartData.indexBy}
          label={props.label}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          additionalFilterOptions={chartData.additionalFilterOptions}
          checkboxOptions={props.checkboxOptions}
          setCheckboxOptions={props.setCheckboxOptions}
        />
      </div>
    );
  }
};

export default GetData;

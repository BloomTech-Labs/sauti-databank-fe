import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from "react-loader-spinner";
import dataParse from "./dataParse";
import getIndex from "../DataParseHelpers/getIndex"
import graphLabels from "./graphLabels"
import removeMultiple from "./removeMultiple";

const GetData = props => {
  let queryType = "tradersUsers";
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
    queryType = "sessionsData";

    QUERY = gql`
      query getData(
        $age: String,
        $gender: String, 
        $education: String, 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $procedurecommodity: String,
        $procedurecommoditycat: String,
        $proceduredest: String,
        $procedurerequireddocument: String,
        $procedurerelevantagency: String,
        $procedureorigin: String,
        $commoditycountry: String,
        $commoditymarket: String,
        $commodityproduct: String,
        $commoditycat: String,
        $exchangedirection: String,
        ){
          sessionsData(
          age: $age,
          gender: $gender, 
          education: $education, 
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          procedurecommodity: $procedurecommodity,
          procedurecommoditycat: $procedurecommoditycat,
          proceduredest: $proceduredest,
          procedurerequireddocument: $procedurerequireddocument,
          procedurerelevantagency: $procedurerelevantagency,
          procedureorigin: $procedureorigin,
          commoditycountry: $commoditycountry,
          commoditymarket: $commoditymarket,
          commodityproduct: $commodityproduct,
          commoditycat: $commoditycat,
          exchangedirection: $exchangedirection,
          ){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }
      `;
  } else if(props.index.query === "Users" && props.crossFilter.query === "Sessions" && !props.additionalFilter.type) {
    queryType = "sessionsData"
    QUERY = gql`
      query getData(
        $age: String,
        $gender: String, 
        $education: String, 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $procedurecommodity: String,
        $procedurecommoditycat: String,
        $proceduredest: String,
        $procedurerequireddocument: String,
        $procedurerelevantagency: String,
        $procedureorigin: String,
        $commoditycountry: String,
        $commoditymarket: String,
        $commodityproduct: String,
        $commoditycat: String,
        $exchangedirection: String,
        ){
        sessionsData(
          age: $age,
          gender: $gender, 
          education: $education, 
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          procedurecommodity: $procedurecommodity,
          procedurecommoditycat: $procedurecommoditycat,
          proceduredest: $proceduredest,
          procedurerequireddocument: $procedurerequireddocument,
          procedurerelevantagency: $procedurerelevantagency,
          procedureorigin: $procedureorigin,
          commoditycountry: $commoditycountry,
          commoditymarket: $commoditymarket,
          commodityproduct: $commodityproduct,
          commoditycat: $commoditycat,
          exchangedirection: $exchangedirection,
          ){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }`
  } else if(props.index.query === "Users" && props.crossFilter.query === "Sessions" && !props.additionalFilter.type) {
    queryType = "sessionsData"
    QUERY = gql`
      query getData(
        $age: String,
        $gender: String, 
        $education: String, 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $procedurecommodity: String,
        $procedurecommoditycat: String,
        $proceduredest: String,
        $procedurerequireddocument: String,
        $procedurerelevantagency: String,
        $procedureorigin: String,
        $commoditycountry: String,
        $commoditymarket: String,
        $commodityproduct: String,
        $commoditycat: String,
        $exchangedirection: String,
        ){
        sessionsData(
          age: $age,
          gender: $gender, 
          education: $education, 
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          procedurecommodity: $procedurecommodity,
          procedurecommoditycat: $procedurecommoditycat,
          proceduredest: $proceduredest,
          procedurerequireddocument: $procedurerequireddocument,
          procedurerelevantagency: $procedurerelevantagency,
          procedureorigin: $procedureorigin,
          commoditycountry: $commoditycountry,
          commoditymarket: $commoditymarket,
          commodityproduct: $commodityproduct,
          commoditycat: $commoditycat,
          exchangedirection: $exchangedirection,
          ){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }`
  } else if (props.index.query === "Sessions" && props.crossFilter.query === "Sessions" && !props.additionalFilter.type) {
    queryType = "sessionsData";
    QUERY = gql`
      query getData( 
        $age: String,
        $gender: String, 
        $education: String 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $procedurecommodity: String,
        $procedurecommoditycat: String,
        $proceduredest: String,
        $procedurerequireddocument: String,
        $procedurerelevantagency: String,
        $procedureorigin: String,
        $commoditycountry: String,
        $commoditymarket: String,
        $commodityproduct: String,
        $commoditycat: String,
        $exchangedirection: String,
        ){
        sessionsData (
          age: $age,
          gender: $gender, 
          education: $education
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          procedurecommodity: $procedurecommodity,
          procedurecommoditycat: $procedurecommoditycat,
          proceduredest: $proceduredest,
          procedurerequireddocument: $procedurerequireddocument,
          procedurerelevantagency: $procedurerelevantagency,
          procedureorigin: $procedureorigin,
          commoditycountry: $commoditycountry,
          commoditymarket: $commoditymarket,
          commodityproduct: $commodityproduct,
          commoditycat: $commoditycat,
          exchangedirection: $exchangedirection,
          ) {
          ${props.index.type}
          ${props.crossFilter.type}
          create_date
        }
      }
      `;
  } else if (props.index.query === "Sessions" && props.crossFilter.query === "Sessions" && !props.additionalFilter.type) {
    queryType = "sessionsData";
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
        $procedurecommodity: String,
        $procedurecommoditycat: String,
        $proceduredest: String,
        $procedurerequireddocument: String,
        $procedurerelevantagency: String,
        $procedureorigin: String,
        $commoditycountry: String,
        $commoditymarket: String,
        $commodityproduct: String,
        $commoditycat: String,
        $exchangedirection: String,
        ){
        sessionsData (
          age: $age,
          gender: $gender, 
          education: $education
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          procedurecommodity: $procedurecommodity,
          procedurecommoditycat: $procedurecommoditycat,
          proceduredest: $proceduredest,
          procedurerequireddocument: $procedurerequireddocument,
          procedurerelevantagency: $procedurerelevantagency,
          procedureorigin: $procedureorigin,
          commoditycountry: $commoditycountry,
          commoditymarket: $commoditymarket,
          commodityproduct: $commodityproduct,
          commoditycat: $commoditycat,
          exchangedirection: $exchangedirection,
          ) {
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
      }
      `;
  } else {
    queryType = "sessionsData";
    QUERY = gql`
      query getData(
        $age: String,
        $gender: String, 
        $education: String, 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        $procedurecommodity: String,
        $procedurecommoditycat: String,
        $proceduredest: String,
        $procedurerequireddocument: String,
        $procedurerelevantagency: String,
        $procedureorigin: String,
        $commoditycountry: String,
        $commoditymarket: String,
        $commodityproduct: String,
        $commoditycat: String,
        $exchangedirection: String,
        ){
        sessionsData(
          age: $age,
          gender: $gender, 
          education: $education, 
          crossing_freq: $crossing_freq,
          produce: $produce,
          primary_income: $primary_income,
          language: $language,
          country_of_residence: $country_of_residence,
          procedurecommodity: $procedurecommodity,
          procedurecommoditycat: $procedurecommoditycat,
          proceduredest: $proceduredest,
          procedurerequireddocument: $procedurerequireddocument,
          procedurerelevantagency: $procedurerelevantagency,
          procedureorigin: $procedureorigin,
          commoditycountry: $commoditycountry,
          commoditymarket: $commoditymarket,
          commodityproduct: $commodityproduct,
          commoditycat: $commoditycat,
          exchangedirection: $exchangedirection,
          ){
          ${props.index.type}
          ${props.crossFilter.type}
          created_date
        }
        additionalFilterData:sessionsData{
            ${props.additionalFilter.type}
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
    
    variables: { ...props.selectedCheckbox},
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
  if (props.additionalFilter.type && !graphLabels[`${props.additionalFilter.type}`]) {
    console.log('additional filter data', data.additionalFilterData)
    removeMultiple(data.additionalFilterData)
    filteredData = getIndex(data.additionalFilterData, `${props.additionalFilter.type}`).map(obj => obj[`${props.additionalFilter.type}`]);
    filteredData = filteredData.filter(item => item !== null)
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

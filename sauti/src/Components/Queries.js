import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from 'react-loader-spinner'
import dataParse from "./dataParse";

const GetData = props => {

    let queryType = 'tradersUsers'
    let QUERY;
  
    if (props.index.query === "Users" && props.crossFilter.query === "Users" ) {
        queryType = "tradersUsers"
        QUERY = gql`
        query getUsers{
            tradersUsers{
                ${props.index.type}
                ${props.crossFilter.type}
            }
        }
        `;
    } else if (props.index.query === "Sessions" && props.crossFilter.query === "Users") {
        queryType = "tradersData"
        
        QUERY = gql`
        query getData($request_type: String!){
            tradersData(request_type: $request_type){
                ${props.index.type}
                ${props.crossFilter.type}
                request_value
            }
        }
        `;
    };
    // (props.index.query === "Sessions" && props.crossFilter.query === "Sessions") 
    // (props.index.query === "Users" && props.crossFilter.query === "Sessions") 
    // WE DO NOT WANT TO SUPPORT THESE TYPES OF FILTERING

    const { loading, error, data } = useQuery(QUERY, {variables: { request_type: props.argForQuery}});

    console.log("query data", data)

    if (loading)  return (
        <div className='loader-container'>
        <Loader
        className='loader'
        type='Oval'
        color='#708090'
        width={100}
        timeout={5000}
         /></div>
    )
    

    const chartData = dataParse(props.index.type, data[`${queryType}`], props.crossFilter.type, props.argForQuery); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

    

    if(props.crossFilter.type !== ""){
        
        return (
            <div>
                <h1 className = 'graph-title'>{props.label} by 'crossFilter.crossLabel?'</h1>
                <Graph data={chartData.dataStructure} keys={chartData.crossFilterKeysArr} indexBy={chartData.indexBy} label={props.label} groupMode={'grouped'} sampleSize={chartData.totalSampleSize} />
            </div>
        )
    } else {
        return (
            <div>
                <h1 className = 'graph-title'>{props.label}</h1>
                <Graph data={chartData.dataStructure} keys={chartData.keys} indexBy={chartData.indexBy} label={props.label} groupMode={'stacked'} sampleSize={chartData.sampleSize}/>
            </div>
        )
    }
}

export default GetData

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from 'react-loader-spinner'

import dataParse from "./dataParse";

const GetData = props => {
    let QUERY;

    if (props.index === "request_type") {

    QUERY = gql`
        query getData($request_type: String!){
            ${props.query}(request_type: $request_type){
                ${props.index}
                request_value
                ${props.crossFilter}
            }
        }
        `;
    } else {

    QUERY = gql`
        query getUsers{
            ${props.query}{
                ${props.index}
                ${props.crossFilter}
            }
        }
        `;
    }

    const { loading, error, data } = useQuery(QUERY, {variables: { request_type: props.argForQuery}});

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
    
    const chartData = dataParse(props.index, data[`${props.query}`], props.crossFilter, props.argForQuery); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

    if(props.crossFilter !== ""){
        return (
            <div>
                <Graph data={chartData.dataStructure} keys={chartData.crossFilterKeysArr} indexBy={chartData.indexBy} label={props.label} groupMode={'grouped'}/>
            </div>
        )
    } else {
        return (
            <div>
                <Graph data={chartData.dataStructure} keys={chartData.keys} indexBy={chartData.indexBy} label={props.label} groupMode={'stacked'} sampleSize={chartData.sampleSize}/>
            </div>
        )
    }
}

export default GetData

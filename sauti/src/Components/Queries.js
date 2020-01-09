import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from 'react-loader-spinner'
import dataParse from "./dataParse";

const GetData = props => {
    const[queryType, setQueryType] = useState('tradersUsers');
    let QUERY;

    if (props.index.query === 'Users' && props.crossFilter.type === 'Users') {
        if(queryType !== 'tradersUsers'){
            setQueryType('tradersUsers')
        }

    QUERY = gql`
        query getUsers($request_type: String!){
            tradersUsers(request_type: $request_type){
                ${props.index.type}
                ${props.crossFilter.type}
                request_value
            }
        }
        `;
    } else if (props.index.query === 'Sessions' && props.crossFilter.type === 'Sessions'){
        if(queryType !== 'tradersData'){
            setQueryType('tradersData')
        }

        QUERY = gql`
            query getData($request_type: String!){
                tradersData(request_type: !request_type){
                    ${props.index.type}
                    request_type
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
    
    const chartData = dataParse(props.index, data[`${queryType}`], props.crossFilter, props.argForQuery, props.query); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs


    if(props.crossFilter !== ""){
        return (
            <div>
                <Graph data={chartData.dataStructure} keys={chartData.crossFilterKeysArr} indexBy={chartData.indexBy} label={props.label} groupMode={'grouped'} sampleSize={chartData.totalSampleSize} />
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

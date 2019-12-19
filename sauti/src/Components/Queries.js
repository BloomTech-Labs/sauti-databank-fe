import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";

import dataParse from "./dataParse";

const GetData = props => {
    let QUERY;

    if (props.index === "request_type") {
    
    QUERY = gql`
        query getData{
            ${props.query}(request_type: "procedurecommoditycat"){
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

    const [variables, setVariables] = useState({});
    const { loading, error, data } = useQuery(QUERY, { variables });
    
    if (loading)  return <h1> Loading... </h1>

    console.log("queries data", data)

    const chartData = dataParse(props.index, data[`${props.query}`], props.crossFilter); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

    if(props.crossFilter !== ""){
        return (
            <div>
                <Graph data={chartData.dataStructure} keys={chartData.crossFilterKeysArr} indexBy={chartData.indexBy} label={props.label} groupMode={'grouped'}/>
                <button onClick={(e) => !variables.hasOwnProperty("age") ? setVariables({age: "40-50"}) : setVariables({})}>change state</button>
            </div>
        )
    } else {
        return (
            <div>
                <Graph data={chartData.dataStructure} keys={chartData.keys} indexBy={chartData.indexBy} label={props.label} groupMode={'stacked'} sampleSize={chartData.sampleSize}/>
                <button onClick={(e) => !variables.hasOwnProperty("age") ? setVariables({age: "40-50"}) : setVariables({})}>change state</button>
            </div>
        )
    }
}

export default GetData

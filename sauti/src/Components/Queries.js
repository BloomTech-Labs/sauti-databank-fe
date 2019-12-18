import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost";
import Graph from "./Graph"

import dataParse from "./dataParse";


const GetData = props => {

    useEffect(() => {
        
    }, [props.index])

    const TRADERS_QUERY = gql`
    query getUsers{
            ${props.query}{
                ${props.index}
                ${props.crossFilter}
            }
        }
    `;

    const [variables, setVariables] = useState({});
    const { loading, error, data } = useQuery(TRADERS_QUERY, { variables });

    if (loading)  return <h1> Loading... </h1>

    console.log(data)
    const chartData = dataParse(props.index, data[`${props.query}`], props.crossFilter, props.allowNulls); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

    return (
        <div>
            <Graph data={chartData.keys} keys={chartData.crossFilterKeysArr} indexBy={chartData.indexBy} />
            <button onClick={(e) => !variables.hasOwnProperty("age") ? setVariables({age: "40-50"}) : setVariables({})}>change state</button>
        </div>
    )
}

export default GetData
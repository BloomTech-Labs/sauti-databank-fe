import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost";
import Graph from "./Graph"

import dataParse from "./dataParse";

const TRADERS_QUERY = gql`
   query getUsers{
        tradersUsers{
            id
            age
            gender
            education
            produce
        }
    }
`;

const GetData = props => {

    useEffect(() => {
        
    }, [props.index])

    const [variables, setVariables] = useState({});
    const { loading, error, data } = useQuery(TRADERS_QUERY, { variables });

    if (loading)  return <h1> Loading... </h1>

    console.log(data)
    const chartData = dataParse(props.index, data.tradersUsers, props.crossFilter, props.allowNulls); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs

    return (
        <div>
            <Graph data={chartData.keys} keys={chartData.crossFilterKeysArr} indexBy={chartData.indexBy} />
            <button onClick={(e) => !variables.hasOwnProperty("age") ? setVariables({age: "40-50"}) : setVariables({})}>change state</button>
        </div>
    )
}

export default GetData
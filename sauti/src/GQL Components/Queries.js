import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost";
import Graph from "./Graph"

import dataParse from "./dataParse";

const TRADERS_QUERY = gql`
   query getUsers($age: String){
        tradersUsers(age: $age) {
            id
            age
            gender
            education
        }
    }
`;

const GetData = () => {
    const [variables, setVariables] = useState({});
    const { loading, error, data } = useQuery(TRADERS_QUERY, {
        variables: variables
    });

    if (loading)  return <h1> Loading... </h1>

    const chartData = dataParse("gender", data.tradersUsers);

    return (
        <div>
            <Graph data={chartData} />
            <button onClick={(e) => !variables.hasOwnProperty("age") ? setVariables({age: "40-50"}) : setVariables({})}>change state</button>
            {/* {
                data.tradersUsers.map(trader => (
                    console.log(trader)
                ))
            } */}
        </div>
    )
}

export default GetData
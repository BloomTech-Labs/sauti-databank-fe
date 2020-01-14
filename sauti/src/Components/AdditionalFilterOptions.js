import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import getIndex from "../DataParseHelpers/getIndex";

const GetData = props => {
  
   let QUERY = gql`
        query getAdditionalData($request_type: String!){
            tradersData(request_type: $request_type){
            request_value
        }
    }
      `;

  const { loading, error, data } = useQuery(QUERY, {
    variables: { request_type: props.additionalFilter }
  });

  const getValues = data => {
     
          const {tradersData} = data
        //   data = await data["tradersData"];
          const values = getIndex(tradersData, "request_value")
          console.log('values', values)
          
  }

//   data && getValues(data);


//   const values = getIndex(data.tradersData, "request_value")
  console.log('additional filter', props.additionalFilter)
//   console.log('values', values)
  
    return (
      <div>
        
      </div>
    );
  };

export default GetData;

import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Tools from "./Tools";

const Users_Query = gql`
  query UsersQ {
    allUsers: DatabankUser {
      id
      email
      interest
      organization
      job_position
      country
    }
  }
`;

const UsersQuery = () => {
  const { data, loading, error } = useQuery(Users_Query);

  //must enter loading
  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }
  console.log(data.allUsers);

  return (
    <>
      <Tools allUsers={data.allUsers} />
    </>
  );
};
export default UsersQuery;

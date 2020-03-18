import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Tools from "./Tools";

const Users_Query = gql`
  query UsersQ {
    allUsers: databankUsers {
      id
      email
      interest
      tier
      organization
      job_position
      country
      organization_type
      registration_date
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

  data.allUsers.registration_date = new Date(
    parseInt(data.allUsers.registration_date)
  ).toDateString();

  //format date
  data.allUsers.map(item => {
    if (item.registration_date !== undefined) {
      item.registration_date = Date(parseInt(item.registration_date));
    }
  });

  //data.allUsers.registration_date =5
  return (
    <>
      <Tools allUsers={data.allUsers} />
    </>
  );
};
export default UsersQuery;

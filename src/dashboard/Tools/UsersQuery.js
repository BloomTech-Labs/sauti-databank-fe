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
      found_by
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
  console.log(data.allUsers);
  data.allUsers.map(item => {
    if (item.registration_date !== undefined) {
      console.log(item.registration_date);
      item.registration_date = Date(parseInt(item.registration_date)).replace(
        /[a-zA-Z]{0,3}/,
        ""
      );
      //();[:%s/^...//]
    }
  });

  // data.allusers = data.allUsers.map(item => {
  //   console.log("registration_date", item.registration_date);
  //   if (item.registration_date !== undefined) {
  //     item.registration_date = new Date(parseInt(item.registration_date));
  //     console.log(
  //       "item.registration_date",
  //       item.registration_date.getFullYear()
  //     );
  //     return {
  //       ...data.allUsers,
  //       registration_date: `${item.registration_date.getFullYear()}`
  //     };

  //     // .replace(
  //     //   /[a-zA-Z]{0,3}/,
  //     //   ""
  //     // );
  //     //();[:%s/^...//]
  //   }
  // });

  //data.allUsers.registration_date =5
  return (
    <>
      <Tools allUsers={data.allUsers} />
    </>
  );
};
export default UsersQuery;

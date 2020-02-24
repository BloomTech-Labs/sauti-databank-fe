// page to edit or delete information + settings
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import { ContentContainer, PageText, Header2 } from "./Styling";

const ALL_USERS = gql`
  query allUsers {
    users: databankUser {
      id
      email
      tier
      token
    }
  }
`;

function DashTools() {
  const { data, loading, error } = useQuery(ALL_USERS);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={12000}
        />
      </div>
    );
  }

  if (error) {
    return <p>ERROR!</p>;
  }
  console.log(data.users);

  return (
    <ContentContainer>
      <Header2>Tools page is an ADMIN only link</Header2>
      <PageText>
        On this page the admin can look at all the users and create/edit/delete
        users. The edit for example could be used when Sauti decides to provide
        free access to the site to government officials so they can change the
        level of access of a specific account by changing the role id in some
        way.
      </PageText>
    </ContentContainer>
  );
}

export default DashTools;

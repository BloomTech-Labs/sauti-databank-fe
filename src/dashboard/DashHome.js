// display user information for the admin and other basic info for quick access
import React from "react";
import PaypalButton from "../Components/PaypalButton";
import GraphContainer from "../GraphContainer";
import { getToken, getEmail, getTier } from "./auth/Auth";

import {
  NotSignedInDiv,
  SignedInDiv,
  UserHeader,
  UserText,
  UserTypeText,
  UserName,
  Header1
} from "./styledComponents/Index";

function DashHome() {
  const signedIn = getToken();
  const userEmail = getEmail();

  return (
    <>
      {!signedIn && (
        <NotSignedInDiv>
          <UserHeader>Welcome To the Sauti Data App</UserHeader>
        </NotSignedInDiv>
      )}
      {signedIn && (
        <SignedInDiv>
          <UserHeader>
            Welcome <UserName>{userEmail}</UserName> !
          </UserHeader>
        </SignedInDiv>
      )}
      <GraphContainer />
    </>
  );
}

export default DashHome;

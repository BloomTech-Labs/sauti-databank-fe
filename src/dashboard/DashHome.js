// display user information for the admin and other basic info for quick access
import React from "react";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";

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
  const token = getToken();
  let userEmail;
  if (token) {
    userEmail = decodeToken(token);
    userEmail = userEmail.email;
    console.log("AAAAAAAAAA", userEmail);
  }

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

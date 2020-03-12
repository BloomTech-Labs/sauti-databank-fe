// display user information for the admin and other basic info for quick access
import React from "react";
import { GASignInHandler } from "./GoogleAnalytics/gaSignIn.js";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";

import { SignedInDiv, UserHeader } from "./styledComponents/Index";

function DashHome() {
  const signedIn = getToken();
  const token = getToken();
  let userEmail;
  if (token) {
    userEmail = decodeToken(token);
    userEmail = userEmail.email;
  }

  return (
    <>
      <SignedInDiv>
        <UserHeader></UserHeader>
      </SignedInDiv>
      {signedIn && GASignInHandler(userEmail)}
      <GraphContainer />
    </>
  );
}

export default DashHome;

// display user information for the admin and other basic info for quick access
import React from "react";
import {
  GAActiveLogin,
  GANotActiveLogin,
  EngagedUser
} from "./GoogleAnalytics/index";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";
import DashAccount from "./DashAccount.js";

import CreateAccount from "./CreateAccount";
import Login from "./Login";

function DashHome() {
  const signedIn = getToken();
  const token = getToken();
  let decToken;
  let userEmail;
  let userTier;
  if (token) {
    decToken = decodeToken(token);
    userEmail = decToken.email;
    userTier = decToken.tier;
    console.log(decToken, "decodedToken");
    GAActiveLogin(userTier, userEmail);
  }

  // GA
  if (!token) {
    GANotActiveLogin();
  }

  return (
    <>
      {!signedIn && (
        <>
          <CreateAccount />
        </>
      )}
      {signedIn && <DashAccount />}
    </>
  );
}

export default DashHome;

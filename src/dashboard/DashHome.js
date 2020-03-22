// display user information for the admin and other basic info for quick access
import React from "react";
import {
  GAActiveLogin,
  GANotActiveLogin,
  EngagedUser
} from "./GoogleAnalytics/index";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";
import DashSignup from "./DashSignup.js";
import DashAccount from "./DashAccount.js";
import DashAccountFree from "./DashAccountFree";
import CreateAccount from "./CreateAccount";
import Login from "./Login";

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
      {signedIn && <DashAccountFree />}
    </>
  );
}

export default DashHome;

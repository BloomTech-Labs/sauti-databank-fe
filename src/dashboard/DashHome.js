// display user information for the admin and other basic info for quick access
import React from "react";
import {
  GAActiveLogin,
  GANotActiveLogin,
  EngagedUser
} from "./GoogleAnalytics/index";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";
import CreateAccount from "./CreateAccount";
import AccountHandler from "./AccountHandler";
import LandingPage from "./LandingPage";

import {
  NotSignedInDiv,
  SignedInDiv,
  UserHeader,
  UserText,
  UserTypeText,
  UserName,
  Header1
} from "./styledComponents/Index";

const DashHome = () => {
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

  if (!signedIn) {
    // return <LandingPage />;
    return <CreateAccount />;
  } else if (signedIn) {
    return <AccountHandler />;
  }
};

export default DashHome;

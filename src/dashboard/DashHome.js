// display user information for the admin and other basic info for quick access
import React from "react";
import { GASignInHandler } from "./GoogleAnalytics/gaSignIn.js";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";
import DashSignup from "./DashSignup.js";
import DashAccount from "./DashAccount.js";

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
  }

  return (
    <>
      {!signedIn && <DashSignup />}
      {signedIn && (
        <div>
          {/* <UserHeader>
            Welcome to the Sauti Databank App <UserName>{userEmail}</UserName> !
          </UserHeader> */}
          <DashAccount />
        </div>
      )}
    </>
  );
}

export default DashHome;

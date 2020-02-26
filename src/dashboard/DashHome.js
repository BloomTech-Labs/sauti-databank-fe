// display user information for the admin and other basic info for quick access
import React from "react";
import PaypalButton from "../Components/PaypalButton";
import GraphContainer from "../GraphContainer";

import { PageText, Header1 } from "./styledComponents/Index";

function DashHome() {
  // const signedIn = getToken();

  return (
    <div>
      <Header1>Welcome To the Sauti Data App</Header1>
      <Header1>Welcome user.email</Header1>
      <PaypalButton />
      {/* {!signedIn && <PageText>Welcome To the Sauti Data App</PageText>}
      {signedIn && <PageText>Welcome user.email</PageText>} */}
      <GraphContainer />
    </div>
  );
}

export default DashHome;

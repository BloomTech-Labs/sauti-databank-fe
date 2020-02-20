// display user information for the admin and other basic info for quick access
import React from "react";
import GraphContainer from "../GraphContainer";

import { PageText } from "./Styling";

function DashHome() {
  // const signedIn = getToken();

  return (
    <div>
      <PageText>Welcome To the Sauti Data App</PageText>
      <PageText>Welcome user.email</PageText>
      {/* {!signedIn && <PageText>Welcome To the Sauti Data App</PageText>}
      {signedIn && <PageText>Welcome user.email</PageText>} */}
      <GraphContainer />
    </div>
  );
}

export default DashHome;

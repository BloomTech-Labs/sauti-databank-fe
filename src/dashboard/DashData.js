// display user information for the admin and other basic info for quick access
import React from "react";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";

import { SignedInDiv, UserHeader } from "./styledComponents/Index";
import swal from "sweetalert";
import ClipboardJS from "clipboard";

const clipboard = new ClipboardJS(".btn", {
  text: function() {
    return document.location.href;
  }
});
clipboard.on("success", function(e) {
  swal({ title: "", text: "copied url!", icon: "success" });
});

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
      <GraphContainer />
      <button className="btn">copy url</button>;
    </>
  );
}

export default DashHome;

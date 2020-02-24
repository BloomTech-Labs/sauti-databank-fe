import React from "react";

import { ContentContainer, PageText, Header2 } from "./styledComponents/Index";

function DashAccount() {
  return (
    <ContentContainer>
      <Header2>My Account *NOT FINAL VERSION*</Header2>
      <PageText>
        All payment options as well as descriptions about what you get for being
        a premium user. Link to paypal will go in here.
      </PageText>
      <hr />
      <PageText>
        If a user has a free account, this page will display an upgrade button
        or something along those lines. We will also display some information
        about the benefits.
      </PageText>
    </ContentContainer>
  );
}

export default DashAccount;

import React from "react";
import { getToken, decodeToken } from "./auth/Auth";
import PaypalButton from "../Components/PaypalButton";

import {
  ContentContainer,
  PageText,
  Header2,
  UserHeader,
  UserText,
  UserTypeText,
  UserName
} from "./styledComponents/Index";

function DashAccount() {
  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
    console.log("AAAAAAAAAA", tier);
  }

  return (
    <ContentContainer>
      <Header2>My Account *NOT FINAL VERSION*</Header2>
      <UserText>
        User Access = <UserTypeText>{tier}</UserTypeText>
      </UserText>
      <br />
      <hr />
      <Header2>Free Users:</Header2>
      <PageText>
        All payment options as well as descriptions about what you get for being
        a premium user. Link to paypal will go in here.
      </PageText>
      <Header2>Paid Users:</Header2>
      <PageText>
        If a user has a free account, this page will display an upgrade button
        or something along those lines. We will also display some information
        about the benefits.
      </PageText>
      <Header2>Upgrade Account:</Header2>
      <PageText>
        PayPal info and other things related to the subscirption and payments
        here.
      </PageText>
      <br />
      <PaypalButton />
    </ContentContainer>
  );
}

export default DashAccount;

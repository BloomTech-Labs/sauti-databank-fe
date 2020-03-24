import React from "react";
import { getToken, decodeToken, getSubscription } from "../auth/Auth";
import DashAccountFree from "./DashAccountFree";
import DashAccountUser from "./DashAccountUser";
import DashAccountAdmin from "./DashAccountAdmin";
import GovAccount from "./GovAccount";

// This component handles the conditionals for the users
// We can include an else statement if all else fails to throw some error or push them back to login page

const AccountHandler = () => {
  const token = getToken();
  const decoded = decodeToken(token);

  let freeUser = decoded.tier === "FREE";
  let paidUser = decoded.tier === "PAID";
  let govUser = decoded.tier === "GOV_ROLE";
  let adminUser = decoded.tier === "ADMIN";

  if (freeUser) {
    return <DashAccountFree />;
  } else if (paidUser) {
    return <DashAccountUser />;
  } else if (adminUser) {
    return <DashAccountAdmin />;
  } else if (govUser) {
    return <GovAccount decoded={decoded} />;
  }
};

export default AccountHandler;

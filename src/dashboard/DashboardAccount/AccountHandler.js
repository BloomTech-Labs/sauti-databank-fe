import React from "react";
import { getToken, decodeToken, getSubscription } from "../auth/Auth";
import { useNewSubName } from "./useNewSubNameHook";
import DashAccountFree from "./DashAccountFree";
import DashAccountUser from "./DashAccountUser";
import DashAccountAdmin from "./DashAccountAdmin";
import GovAccount from "./GovAccount";
import NewSubscriberHandler from "./NewSubscriberHandler";

// This component handles the conditionals for the users
// We can include an else statement if all else fails to throw some error or push them back to login page

const AccountHandler = () => {
  const token = getToken();
  const decoded = decodeToken(token);

  const newSub = getSubscription();

  let sub;
  if (newSub) {
    console.log(newSub, "NEW SUB?");
    sub = newSub;
  }

  let freeUser = decoded.tier === "FREE";
  let paidUser = decoded.tier === "PAID";
  let govUser = decoded.tier === "GOV_ROLE";
  let adminUser = decoded.tier === "ADMIN";

  let newPaypalSubscriber = useNewSubName(newSub);

  if (newSub && newPaypalSubscriber) {
    return <NewSubscriberHandler newPaypalSubscriber={newPaypalSubscriber} />;
  }

  if (freeUser) {
    return <DashAccountFree />;
  } else if (paidUser) {
    return <DashAccountUser />;
  } else if (adminUser) {
    return <DashAccountAdmin />;
  } else if (govUser) {
    return <GovAccount decoded={decoded} />;
  } else {
    return <div>There has been a problem fetching account details.</div>;
  }
};

export default AccountHandler;

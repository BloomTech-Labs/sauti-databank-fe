import React from "react";
import { UserAccount } from "./styledComponents/DashAccount";

const MonthlyAccount = props => {
  const { data } = props.data;
  const { handleSubscriptionCancellation } = props;

  return (
    <UserAccount>
      <div className="container"></div>
    </UserAccount>
  );
};

// <ButtonDiv>
// {data && data.databankUser.p_next_billing_time ? (
//   <p>
//     Your subscription will expire on{" "}
//     {new Date(
//       parseInt(data.databankUser.p_next_billing_time)
//     ).toDateString()}
//   </p>
// ) : (
//   <ContinueButton2 onClick={handleSubscriptionCancellation}>
//     Cancel Subscription
//   </ContinueButton2>
// )}
// </ButtonDiv>

export default MonthlyAccount;

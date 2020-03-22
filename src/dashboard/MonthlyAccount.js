import React from "react";
import { useHistory } from "react-router-dom";
import { UserAccount } from "./styledComponents/DashAccount";

const MonthlyAccount = props => {
  const history = useHistory();
  const { data } = props.data;
  const { handleSubscriptionCancellation } = props;

  const handleReturn = e => {
    e.preventDefault();
    history.push("/data");
  };

  return (
    <UserAccount>
      <div className="container">
        <div className="container-row">
          <div className="container-row-col-top col">
            <div>
              <h1>Account Access</h1>
              <span>Benefits included with your account subscription</span>
            </div>
          </div>
          <div className="container-row-col-middle col">
            <div className="account-box">
              <div className="account-box-header">
                <h1>Premium Account</h1>
              </div>
              <div className="account-box-features">
                <span>Download data into an excel file</span>
                <span>Change Data Filters</span>
                <span>Cross-Filter Data by Date</span>
                <span>Additional Filtering Options</span>
              </div>
            </div>
          </div>
          <div className="container-row-col-bottom col">
            <button className="cancel">Cancel Subscription</button>
            <button className="button-return" onClick={handleReturn}>
              Return to Data
            </button>
          </div>
        </div>
      </div>
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

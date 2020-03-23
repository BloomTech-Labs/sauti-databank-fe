import React from "react";
import { useHistory } from "react-router-dom";
import { UserAccount, DivProps } from "./styledComponents/DashAccount";

const GovAccount = props => {
  const history = useHistory();

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
                <h1>Government Account</h1>
              </div>
              <div className="account-box-features">
                <div className="account-box-features-list">
                  <span>Download data into an excel file</span>
                  <span>Change Data Filters</span>
                  <span>Cross-Filter Data by Date</span>
                  <span>Additional Filtering Options</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container-row-col-bottom col">
            <DivProps props={props}>
              <button className="button-return" onClick={handleReturn}>
                Return to Data
              </button>
            </DivProps>
          </div>
        </div>
      </div>
    </UserAccount>
  );
};

export default GovAccount;

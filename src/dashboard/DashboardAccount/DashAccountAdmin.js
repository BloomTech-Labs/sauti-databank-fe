import React from "react";
import { AccountPage } from "../styledComponents/DashAccount";
// This component shows user offerings for admins
const DashAccountAdmin = () => {
  return (
    <AccountPage>
      <div className="page-row">
        <div className="page-row-col-top">
          <div className="header-container">
            <div className="header-row">
              <div className="header-row-col-admin">
                <h1>User Account Types</h1>
                <p>Account types available to our customers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-row-col-bottom">
          <div className="account-container">
            <div className="account-row">
              <div className="account-row-col">
                <div className="account-type">
                  <div className="account-header">
                    <h2>Free Account</h2>
                    <h1>Free</h1>
                  </div>
                  <div className="account-features admin-features">
                    <div className="account-features-items">
                      <span>Can Create an Account</span>
                      <span>Access Base App</span>
                      <span>Change Data Filters</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                <div className="account-type">
                  <div className="account-header">
                    <h2>Premium Account</h2>
                    <h1>$10/monthly</h1>
                  </div>
                  <div className="account-features admin-features">
                    <div className="account-features-items">
                      <span>Download data into an excel file</span>
                      <span>Change Data Filters</span>
                      <span>Cross-Filter Data by Date</span>
                      <span>Additional Filtering Options</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                {" "}
                <div className="account-type">
                  <div className="account-header">
                    <h2>Premium Account</h2>
                    <h1>$49.99/bi-annually</h1>
                  </div>
                  <div className="account-features admin-features">
                    <div className="account-features-items">
                      <span>Download data into an excel file</span>
                      <span>Change Data Filters</span>
                      <span>Cross-Filter Data by Date</span>
                      <span>Additional Filtering Options</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                {" "}
                <div className="account-type">
                  <div className="account-header">
                    <h2>Premium Account</h2>
                    <h1>$89.99/yearly</h1>
                  </div>
                  <div className="account-features admin-features">
                    <div className="account-features-items">
                      <span>Download data into an excel file</span>
                      <span>Change Data Filters</span>
                      <span>Cross-Filter Data by Date</span>
                      <span>Additional Filtering Options</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountPage>
  );
};
export default DashAccountAdmin;

import React, { useEffect } from "react";
import { AccountPage } from "./styledComponents/DashAccount";
import MonthlyButton from "../Components/Paypal/MonthlyButton";
import BiAnnuallyButton from "../Components/Paypal/BiannuallyButton";
import YearlyButton from "../Components/Paypal/YearlyButton";
import UndrawOptionsSVG from "./Images/undrawOptionsSVG";
import UndrawInvestmentSVG from "./Images/undrawInvestmentSVG";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

// This component shows user offerings for admins

const DashAccountAdmin = () => {
  return (
    <AccountPage>
      <div className="container">
        <div className="header-container">
          <div className="header-row">
            <div className="header-row-col admin">
              <h1>Sauti Databank Admin</h1>
              <span>Below is the current user offerings</span>
            </div>
          </div>
        </div>
        <div className="account-container">
          <div className="account-row">
            <div className="account-row-col">
              <div className="account-type">
                <div className="account-header">
                  <h2>Free Account</h2>
                  <h1>Free</h1>
                </div>
                <div className="account-features">
                  <div className="account-features-items">
                    <span>Can create an account</span>
                    <span>Access base app</span>
                    <span>Cross-filter data</span>
                  </div>
                </div>
                <div className="account-bottom">
                  <div className="account-bottom-btn-ctn"></div>
                </div>
              </div>
            </div>
            <div className="account-row-col">
              <div className="account-type">
                <div className="account-header">
                  <h2>Premium Account</h2>
                  <h1>$10/monthly</h1>
                </div>
                <div className="account-features">
                  <div className="account-features-items">
                    <span>Download data into an excel file</span>
                    <span>Cross-Filter data by date</span>
                    <span>Additional filtering</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-row-col">
              {" "}
              <div className="account-type">
                <div className="account-header">
                  <h2>Premium Account</h2>
                  <h1>$49.99/bi-anually</h1>
                </div>
                <div className="account-features">
                  <div className="account-features-items">
                    <span>Download data into an excel file</span>
                    <span>Cross-Filter data by date</span>
                    <span>Additional filtering</span>
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
                <div className="account-features">
                  <div className="account-features-items">
                    <span>Download data into an excel file</span>
                    <span>Cross-Filter data by date</span>
                    <span>Additional filtering</span>
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

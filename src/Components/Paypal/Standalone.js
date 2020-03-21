import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { decodeToken } from "../../dashboard/auth/Auth";
import { useMutation } from "@apollo/react-hooks";
import swal from "sweetalert";
import gql from "graphql-tag";

const UPDATE_USER_TIER = gql`
  mutation editAUser($newEditUser: newEditUserInput!) {
    editUser(input: $newEditUser) {
      ... on DatabankUser {
        id
        email
        tier
        organization_type
        token
      }
      ... on Error {
        message
      }
    }
  }
`;

const UPDATE_USER_PLAN_NAME = gql`
  mutation addPaypalPlan($newUserPlan: newAddPaypalPlanInput!) {
    addPaypalPlan(input: $newUserPlan) {
      ... on DatabankUser {
        email
      }
      ... on Error {
        message
      }
    }
  }
`;

export default function StandAloneButton() {
  const [userUpdated] = useMutation(UPDATE_USER_TIER);
  const [addPlan] = useMutation(UPDATE_USER_PLAN_NAME);

  const history = useHistory();

  let paypal = window.paypal;

  let FUNDING_SOURCES = [
    paypal.FUNDING.PAYPAL
    // paypal.FUNDING.VENMO,
    // paypal.FUNDING.CREDIT,
    // paypal.FUNDING.CARD
  ];

  useEffect(function renderPaypalButtons() {
    FUNDING_SOURCES.forEach(function(fundingSource) {
      // Initialize the buttons
      let button = paypal.Buttons({
        fundingSource: fundingSource,
        env: "sandbox",
        style: {
          shape: "rect",
          size: "responsive",
          color: "white",
          label: "paypal"
        },

        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: "P-7EN28541UP360613GLZZF7FQ"
          });
        },
        onApprove: async function(data, actions) {
          swal({
            title: "",
            text: "Your account has been upgraded to premium!",
            icon: "success"
          });

          const token = localStorage.getItem("token");
          const decoded = decodeToken(token);
          console.log(decoded, "DECODED");
          decoded.subscription_id = data.subscriptionID;
          localStorage.setItem("xyz", decoded.subscription_id);
          decoded.tier = "PAID";
          delete decoded.iat;
          delete decoded.exp;
          await userUpdated({
            variables: { newEditUser: decoded }
          });

          const { id, tier, subscription_id, ...rest } = decoded;

          await addPlan({
            variables: { newUserPlan: rest }
          });

          history.push("/data");
        },
        onError: function(err) {
          // Show an error page here, when an error occurs
          console.error("err", err);
        }
      });

      if (button.isEligible()) {
        console.log(button, "BUTTON");

        button.render("#paypal-button-container-monthly");
      }
    });
  }, []);

  return <div id="paypal-button-container-monthly"></div>;
}

// notes to patch/edit you have to set the body up like this in postman

// [
//   {
//       "op": "replace",
//       "path": "/payment_preferences/setup_fee",
//       "value": {
//           "currency_code": "USD",
//           "value": 0
//       }
//   }
// ]

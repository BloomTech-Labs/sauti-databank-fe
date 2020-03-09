import React, { useState, useEffect, useRef } from "react";
import { decodeToken } from "../dashboard/auth/Auth";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const UPDATE_USER_TIER = gql`
  mutation editAUser($newEditUser: newEditUserInput!) {
    editUser(input: $newEditUser) {
      ... on DatabankUser {
        id
        email
        tier
        organization_type
      }
      ... on Error {
        message
      }
    }
  }
`;

export default function PaypalButton() {
  const [userUpdated, { loading, error }] = useMutation(UPDATE_USER_TIER);

  useEffect(function renderPaypalButtons() {
    window.paypal
      .Buttons({
        env: "sandbox",
        style: {
          shape: "pill",
          size: "responsive",
          // using height breaks everything. From reading i think its because setting size to responsive alters the height already
          color: "blue",
          label: "paypal"
        },

        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: "P-88W9005566465954VLZLJ54Q"
          });
        },
        // P-72246955VA0534701LZK5PUA
        onApprove: async function(data, actions) {
          console.log("2", data.subscriptionID, actions);

          alert(
            "You have successfully created subscription " + data.subscriptionID
          );

          const token = localStorage.getItem("token");
          // decode the token
          // make query to change the user account to paid(do we have this?)
          const decoded = decodeToken(token);
          decoded.subscription_id = data.subscriptionID;
          console.log("decoded", decoded);
          decoded.tier = "PAID";
          delete decoded.iat;
          delete decoded.exp;
          const editedUser = await userUpdated({
            variables: { newEditUser: decoded }
          });
          console.log("editeduser", editedUser);
        },
        onError: function(err) {
          // Show an error page here, when an error occurs
          console.error("err", err);
        }
      })
      .render("#paypal-button-container");
  }, []);
  return (
    <div
      id="paypal-button-container"
      style={{
        display: "inline-block",
        padding: "1rem 3rem",
        margin: "0 auto"
      }}
    ></div>
  );
}

// display: inline-block;
//   text-decoration: none;
//   color: black;
//   border: 2px solid #eb5e52;
//   border-radius: 5px;
//   padding: 1rem 3rem;
//   margin-top: 2rem;
//   transition: 0.5s ease;
//   &:hover {
//     color: white;
//     background-color: #eb5e52;
//     cursor: pointer;
//   }

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

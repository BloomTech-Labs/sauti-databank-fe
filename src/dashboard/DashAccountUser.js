import React from "react";
import MonthlyAccount from "./MonthlyAccount";
import BiAnnuallyAccount from "./BiAnnuallyAccount";
import YearlyAccount from "./YearlyAccount";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "./auth/Auth";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

// This component shows signed in users account information such as what plan they're on

const CANCEL_USER_SUB = gql`
  mutation updateUserToFree(
    $newUpdateUserToFreeInput: newUpdateUserToFreeInput!
  ) {
    updateUserToFree(input: $newUpdateUserToFreeInput) {
      ... on DatabankUser {
        email
        subscription_id
      }
      ... on Error {
        message
      }
    }
  }
`;

function formatDate(date) {
  return new Date(date).toDateString();
}

const DashAccountUser = () => {
  const history = useHistory();
  const token = getToken();

  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }
  let userEmail;
  if (token) {
    userEmail = decodeToken(token);
    userEmail = userEmail.email;
  }
  const newSub = getSubscription();
  let sub;
  if (newSub) {
    sub = newSub;
  }

  const GET_SUBSCRIPTION_ID = gql`
    query($userEmail: String!) {
      databankUser(input: { email: $userEmail }) {
        id
        email
        subscription_id
        p_next_billing_time
        paypal_plan
      }
    }
  `;

  const { loading: fetching, error: err, data, refetch } = useQuery(
    GET_SUBSCRIPTION_ID,
    {
      variables: { userEmail: userEmail }
    }
  );

  if (data) console.log("data billing time", data.databankUser);
  const [cancelSub, { loading, error }] = useMutation(CANCEL_USER_SUB);

  if (fetching) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={12000}
        />
      </div>
    );
  }

  if (err) {
    return <h1>ERROR!</h1>;
  }

  const handleSubscriptionCancellation = async e => {
    // TODO: grab user's subscription_id with a query to DatabankUsers

    // newSub should be null unless the user has JUST signed up for premium through paypal.
    // Once a user has signed out and returned to the app, the users sub ID is tracked by GET_SUBSCRIPTION_ID.
    if (newSub === null) {
      await cancelSub({
        variables: {
          newUpdateUserToFreeInput: {
            email: userEmail,
            subscription_id: data.databankUser.subscription_id
          }
        }
      });
      // Refetch to get the p_next_billing_time and subscription_id
      refetch();
      // Set the subscription id to null after a user cancels their subscription.
      // data.databankUser.subscription_id = null;
      history.push("/data");
      swal({
        title: "",
        text: "Subscription cancellation has been processed.",
        icon: "success"
      });
    } else {
      swal({
        title: "",
        text: "Please re-log into your account to perform this action",
        icon: "warning"
      });
    }
  };

  const Monthly = data.databankUser.paypal_plan === "Monthly Plan - $9.99";
  const BiAnnually =
    data.databankUser.paypal_plan === "Bi-annually Plan - $49.99";
  const Yearly = data.databankUser.paypal_plan === "Yearly Plan - $89.99";

  console.log(data, "DATA");

  if (Monthly) {
    return (
      <MonthlyAccount
        data={data}
        handleSubscriptionCancellation={handleSubscriptionCancellation}
      />
    );
  } else if (BiAnnually) {
    return (
      <BiAnnuallyAccount
        data={data}
        handleSubscriptionCancellation={handleSubscriptionCancellation}
      />
    );
  } else if (Yearly) {
    return (
      <YearlyAccount
        data={data}
        handleSubscriptionCancellation={handleSubscriptionCancellation}
      />
    );
  } else {
    return <div>Could not fetch account information.</div>;
  }
};

export default DashAccountUser;

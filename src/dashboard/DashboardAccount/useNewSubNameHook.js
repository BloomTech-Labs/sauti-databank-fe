import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

export function useNewSubName(newSub) {
  if (!newSub) {
    console.log("XYZ is not present");
  }

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(newSub, "INSIDE USEeffect?");
      try {
        const url = "https://api.sandbox.paypal.com/v1/oauth2/token";
        const oldData = {
          grant_type: "client_credentials"
        };
        const auth = {
          username: `${process.env.REACT_APP_PAYPAL_AUTH_USERNAME}`,
          password: `${process.env.REACT_APP_PAYPAL_AUTH_SECRET}`
        };

        console.log(process.env.REACT_APP_PAYPAL_AUTH_SECRET, "PROCESS ENV");

        const options = {
          method: "post",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Credentials": true
          },
          data: qs.stringify(oldData),
          auth: auth,
          url
        };

        const { data } = await axios(options);
        const { access_token } = data;
        axios.defaults.headers.common = {
          Authorization: `Bearer ${access_token}`
        };

        let planIDName;
        if (access_token) {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` }
          };

          const users_subscription = await axios.get(
            `https://api.sandbox.paypal.com/v1/billing/subscriptions/${newSub}`
          );

          const userPlanID = users_subscription.data.plan_id;
          const users_planIdInformation = await axios.get(
            `https://api.sandbox.paypal.com/v1/billing/plans/${userPlanID}`
          );
          planIDName = users_planIdInformation.data.name;
        }
        setResponse(planIDName);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [newSub]);
  return { response, error };
}

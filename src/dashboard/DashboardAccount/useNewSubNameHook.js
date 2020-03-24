import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import qs from "qs";

export function useNewSubName(newSub) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const subID = useRef(newSub);

  useEffect(() => {
    // need to access passed in newSub in here then pass it into fetchData

    const fetchData = async () => {
      try {
        const url = "https://api.sandbox.paypal.com/v1/oauth2/token";
        const oldData = {
          grant_type: "client_credentials"
        };
        const auth = {
          username: `AeMzQ9LYW7d4_DAzYdeegCYOCdsIDuI0nWfno1vGi4tsKp5VBQq893hDSU6FIn47md30k4jC5QDq33xM`,
          password: `ECeUwnnTkSqjK6NIycSLp8joMLgOpof1rQdA4W8NvHqgKQNuNqwgySgGEJr_fq_JFHtzM6Je9Kj8fClA`
        };

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
  }, []);
  return { response, error };
}

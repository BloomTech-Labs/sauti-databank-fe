import React, { useState, useEffect, useRef } from "react";

export default function PaypalButton() {
  useEffect(() => {
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

        // implementing subscription

        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: "P-72246955VA0534701LZK5PUA"
          });
        },

        onApprove: function(data, actions) {
          alert(
            "You have successfully created subscription " + data.subscriptionID
          );
        },
        onError: function(err) {
          // Show an error page here, when an error occurs
          console.log(err);
        }
      })
      .render("#paypal-button-container");
  }, []);

  return <div id="paypal-button-container" style={{ width: "45rem" }}></div>;
}

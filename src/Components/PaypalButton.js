import React, { useState, useEffect, useRef } from "react";

export default function PaypalButton() {
  useEffect(() => {
    window.paypal
      .Buttons({
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: "PROD-3LS747757K117452C"
          });
        },
        onApprove: function(data, actions) {
          alert(
            "You have successfully created subscription " + data.subscriptionID
          );
        }
      })
      .render("#paypal-button-container");
  }, []);

  return <div id="paypal-button-container"></div>;
}

import ReactGA from "react-ga";

export const GASignInHandler = () => {
  ReactGA.event({
    category: "Dashboard Home",
    action: "User Signing In",
    label: "Tracking users every time they sign in.",
    nonInteraction: true
  });
};

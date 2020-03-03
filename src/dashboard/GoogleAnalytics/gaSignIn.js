import ReactGA from "react-ga";

export const GASignInHandler = name => {
  ReactGA.event({
    category: "Dashboard Home",
    action: `User Signing In As ${name}`,
    label: "Tracking users every time they sign in.",
    nonInteraction: true
  });
};

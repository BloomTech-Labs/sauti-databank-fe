import ReactGA from "react-ga";

export const GASignInHandler = name => {
  ReactGA.initialize("UA-158701427-1");
  ReactGA.event({
    category: "Dashboard Home",
    action: `User Signing In As ${name}`,
    label: "Tracking users every time they sign in.",
    nonInteraction: true
  });
};

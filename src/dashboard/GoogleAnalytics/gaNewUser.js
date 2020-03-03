import ReactGA from "react-ga";

export const GAHandleCreateUser = () => {
  ReactGA.initialize("UA-158701427-1");
  ReactGA.event({
    category: "User",
    action: "Created an account"
  });
};

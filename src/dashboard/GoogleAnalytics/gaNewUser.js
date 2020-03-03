import ReactGA from "react-ga";

export const GAHandleCreateUser = () => {
  ReactGA.event({
    category: "User",
    action: "Created an account"
  });
};

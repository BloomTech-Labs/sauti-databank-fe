import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";

export const initGA = trackingID => {
  ReactGA.initialize(trackingID, {
    debug: true
  });
};

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

// This one has more flexbility over what you want to send to GA
export const urlPageView = url => {
  ReactGA.pageview(`${url}`);
};

export const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

export const EngagedUser = (category, variable, value, label) => {
  ReactGA.timing({
    category,
    variable,
    value,
    label
  });
};

export const HistoryListen = () => {
  const history = useHistory();
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
};

export const GALogin = (tier, email) => {
  if (tier === "FREE") {
    return Event(
      "Logged In - FREE USER",
      "Capturing login for free user",
      `Email: ${email}`
    );
  } else if (tier === "PAID") {
    return Event(
      "Logged In - PAID USER",
      "Capturing login for paid user",
      `Email: ${email}`
    );
  } else if (tier === "ADMIN") {
    return Event(
      "Logged In - ADMIN USER",
      "Capturing login for admin user",
      `Email: ${email}`
    );
  } else {
    // If for some reason there is no tier on a user, it will send this event.
    // This is more of an error handler to check the code.
    return Event(
      "ERROR - Unknown USER",
      "Could not capture users tier",
      `Email: ${email}`
    );
  }
};

export const GAActiveLogin = (tier, email) => {
  if (tier === "FREE") {
    return Event(
      "Token Active - FREE USER",
      "Capturing actively logged in user.",
      `Email: ${email}`
    );
  } else if (tier === "PAID") {
    return Event(
      "Token Active - PAID USER",
      "Capturing actively logged in user.",
      `Email: ${email}`
    );
  } else if (tier === "ADMIN") {
    return Event(
      "Token Active - ADMIN USER",
      "Capturing actively logged in user.",
      `Email: ${email}`
    );
  }
};

export const GANotActiveLogin = () => {
  Event("No Active Token", "This user is not logged in.");
};

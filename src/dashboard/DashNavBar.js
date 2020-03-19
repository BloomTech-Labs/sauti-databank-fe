import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { NavLink, Route, withRouter } from "react-router-dom";
import { HistoryListen, PageView } from "./GoogleAnalytics/index";
import DashHome from "./DashHome";
import DashData from "./DashData";
import Tools from "./Tools/Tools";
import UsersQuery from "./Tools/UsersQuery";
import DashAccount from "./DashAccount";
import DashLogout from "./DashLogout";
import Login from "./Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { getToken, decodeToken } from "./auth/Auth";

import {
  TopBar,
  SautiLogo,
  SautiLogoText,
  SautiDot,
  Navigation,
  Links,
  LinksLast,
  SautiLink
} from "./styledComponents/Index";

function DashNav() {
  // History Listner
  HistoryListen();

  useEffect(() => {
    PageView();
  });

  const SignedIn = getToken();
  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }

  return (
    <>
      <TopBar>
        <SautiLogo>
          <ReactGA.OutboundLink
            style={{ textDecoration: "none" }}
            eventLabel="Outbound Link to http://sautiafrica.org/"
            to="http://sautiafrica.org/"
          >
            <SautiLogoText href="http://sautiafrica.org/">
              <p>
                Sauti<SautiDot>.</SautiDot>
              </p>
            </SautiLogoText>
          </ReactGA.OutboundLink>
        </SautiLogo>
        <Navigation>
          {!SignedIn && <Links to="/">HOME</Links>}
          {SignedIn && <Links to="/">ACCOUNT</Links>}
          <Links to="/data">DATA</Links>
          {tier === "ADMIN" && <Links to="/tools">TOOLS</Links>}
          {SignedIn && <Links to="/logout">LOGOUT</Links>}
        </Navigation>
      </TopBar>
      <Route exact path="/" component={DashHome} />
      <Route exact path="/data" component={DashData} />
      <Route exact path="/tools" component={UsersQuery} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/myaccount" component={DashAccount} />
      <ProtectedRoute exact path="/logout" component={DashLogout} />
    </>
  );
}

export default withRouter(DashNav);

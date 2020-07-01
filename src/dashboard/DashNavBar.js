import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { NavLink, Route, withRouter } from "react-router-dom";
import { HistoryListen, PageView } from "./GoogleAnalytics/index";
import DashData from "./DashData";
import UsersQuery from "./Tools/UsersQuery";
import AccountHandler from "../dashboard/DashboardAccount/AccountHandler";
import CreateAccount from "./CreateAccount";
import LandingPage from "./LandingPage";
import DashLogout from "./DashLogout";
import Login from "./Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import CodeRoute from "./DashboardAccount/PasswordReset/auth/CodeRoute";
import { getToken, decodeToken } from "./auth/Auth";
import UserSVG from "./Images/UserSVG";
import ForgotPassword from "./DashboardAccount/PasswordReset/ForgotPassword";
import ResetPasswordContainer from "./DashboardAccount/PasswordReset/ResetPasswordContainer";

import {
  TopBar,
  SautiLogo,
  SautiLogoText,
  SautiDot,
  Navigation,
  Links,
  LinksLast,
  SautiLink,
  Container
} from "./styledComponents/Index";

function DashNav() {
  // History Listner
  HistoryListen();

  useEffect(() => {
    PageView();
  });

  const SignedIn = getToken();
  const token = getToken();
  let email;
  let tier;
  if (token) {
    let tokenDecoded = decodeToken(token);
    email = tokenDecoded.email;
    tier = tokenDecoded.tier;
  }

  const isLandingPage = window.location.href ? "http://localhost:3000/" : null;

  return (
    <>
      <Container>
        <TopBar LandingPage={LandingPage.props}>
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
            {(!SignedIn || SignedIn) && <Links to="/">HOME</Links>}
            {SignedIn && <Links to="/myaccount">ACCOUNT</Links>}
            <Links to="/data">DATA</Links>
            {!SignedIn && <Links to="/login">LOGIN</Links>}
            {tier === "ADMIN" && <Links to="/tools">ADMIN</Links>}
            {SignedIn && <Links to="/logout">LOGOUT</Links>}
            {SignedIn && (
              <div className="loggedInAs">
                <UserSVG />
                <span className="email">{email}</span>
              </div>
            )}
          </Navigation>
        </TopBar>
      </Container>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/data" component={DashData} />
      <Route exact path="/tools" component={UsersQuery} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={CreateAccount} />
      <Route exact path="/passwordreset" component={ForgotPassword} />
      <ProtectedRoute exact path="/myaccount" component={AccountHandler} />
      <ProtectedRoute exact path="/logout" component={DashLogout} />
      <CodeRoute
        exact
        path="/password-verification"
        component={ResetPasswordContainer}
      />
    </>
  );
}

export default withRouter(DashNav);

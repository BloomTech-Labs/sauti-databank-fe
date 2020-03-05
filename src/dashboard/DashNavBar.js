import React from "react";
import { NavLink, Route, withRouter } from "react-router-dom";

import DashHome from "./DashHome";
import Tools from "./Tools/Tools";
import UsersQuery from "./Tools/UsersQuery";
import DashAbout from "./DashAbout";
import DashAccount from "./DashAccount";
import DashLoginModal from "./DashLoginModal";
import DashSignupModal from "./DashSignupModal";
import DashLogout from "./DashLogout";
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
          <SautiLogoText href="http://sautiafrica.org/">
            <p>
              Sauti<SautiDot>.</SautiDot>
            </p>
          </SautiLogoText>
        </SautiLogo>
        <Navigation>
          <Links to="/">DATA</Links>
          {tier === "ADMIN" && (
            <NavLink activeClassName="active" to="/tools">
              TOOLS
            </NavLink>
          )}
          {SignedIn && <Links to="/myaccount">MY ACCOUNT</Links>}
          <LinksLast to="/about">ABOUT</LinksLast>
          {!SignedIn && <DashLoginModal />}
          {!SignedIn && <DashSignupModal />}
          {SignedIn && <Links to="/logout">LOGOUT</Links>}
          <SautiLink href="http://sautiafrica.org/">Home</SautiLink>
        </Navigation>
      </TopBar>

      <Route exact path="/" component={DashHome} />
      <Route exact path="/tools" component={UsersQuery} />
      <Route exact path="/about" component={DashAbout} />
      <ProtectedRoute exact path="/myaccount" component={DashAccount} />
      <ProtectedRoute exact path="/logout" component={DashLogout} />
    </>
  );
}

export default withRouter(DashNav);

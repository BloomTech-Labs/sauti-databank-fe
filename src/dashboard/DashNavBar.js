import React from "react";
import { NavLink, Route, withRouter } from "react-router-dom";

import DashHome from "./DashHome";
import DashData from "./DashData";
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
          {!SignedIn && <Links to="/">HOME</Links>}
          {SignedIn && <Links to="/">MY ACCOUNT</Links>}
          <Links to="/data">DATA</Links>
          {tier === "ADMIN" && <Links to="/tools">TOOLS</Links>}
          <LinksLast to="/services">SERVICES</LinksLast>
          {SignedIn && <Links to="/logout">LOGOUT</Links>}
          {/* <SautiLink href="http://sautiafrica.org/">Sauti</SautiLink> */}
        </Navigation>
      </TopBar>

      <Route exact path="/" component={DashHome} />
      <Route exact path="/data" component={DashData} />
      <Route exact path="/tools" component={UsersQuery} />
      <Route exact path="/services" component={DashAbout} />
      <ProtectedRoute exact path="/myaccount" component={DashAccount} />
      <ProtectedRoute exact path="/logout" component={DashLogout} />
    </>
  );
}

export default withRouter(DashNav);

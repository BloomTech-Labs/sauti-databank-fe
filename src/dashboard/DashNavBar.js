import React from "react";
import { Link, Route, withRouter } from "react-router-dom";

import DashHome from "./DashHome";
import Tools from "./Tools/Tools";
import DashAbout from "./DashAbout";
import DashAccount from "./DashAccount";
import DashLoginModal from "./DashLoginModal";
import DashSignupModal from "./DashSignupModal";
import DashSignup from "./DashSignup";

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
          <Links to="/tools">TOOLS</Links>
          <Links to="/myaccount">MY ACCOUNT</Links>
          <LinksLast to="/about">ABOUT</LinksLast>
          <DashLoginModal />
          <DashSignupModal />
          {/* <Links to="/logout">LOGOUT</Links> */}
          <SautiLink href="http://sautiafrica.org/">Sauti Home</SautiLink>
        </Navigation>
      </TopBar>

      <Route exact path="/" component={DashHome} />
      <Route exact path="/tools" component={Tools} />
      <Route exact path="/about" component={DashAbout} />
      <Route exact path="/myaccount" component={DashAccount} />
    </>
  );
}

export default withRouter(DashNav);

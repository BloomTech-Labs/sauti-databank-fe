import React from "react";
import { Link, Route, withRouter } from "react-router-dom";

import DashHome from "./DashHome";
import DashTools from "./DashTools";
import DashAbout from "./DashAbout";
import DashLogin from "./DashLogin";
import DashSignup from "./DashSignup";

import {
  TopBar,
  SautiLogo,
  SautiLogoText,
  SautiDot,
  Navigation,
  Links,
  SautiLink
} from "./Styling";

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
          <Links to="/about">ABOUT</Links>
          <Links to="/login">LOGIN</Links>
          <Links to="/signup">SIGN UP</Links>
          <Links to="/logout">LOGOUT</Links>
          <SautiLink href="http://sautiafrica.org/">Sauti Home</SautiLink>
        </Navigation>
      </TopBar>

      <Route exact path="/" component={DashHome} />
      <Route exact path="/tools" component={DashTools} />
      <Route exact path="/about" component={DashAbout} />
      <Route exact path="/login" component={DashLogin} />
      <Route exact path="/signup" component={DashSignup} />
    </>
  );
}

export default withRouter(DashNav);

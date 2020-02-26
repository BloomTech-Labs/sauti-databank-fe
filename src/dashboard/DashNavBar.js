import React from "react";
import { Link, Route, withRouter } from "react-router-dom";

import DashHome from "./DashHome";
import Tools from "./Tools/Tools";
import UsersQuery from "./Tools/UsersQuery";
import DashAbout from "./DashAbout";
import DashAccount from "./DashAccount";
import DashLoginModal from "./DashLoginModal";
import DashSignupModal from "./DashSignupModal";
import DashLogout from "./DashLogout";
import { getToken } from "./auth/Auth";

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
          {/* <Links to="/tools">TOOLS</Links> */}
          {SignedIn && <Links to="/tools">TOOLS</Links>}
          {/* <Links to="/myaccount">MY ACCOUNT</Links> */}
          {SignedIn && <Links to="/myaccount">MY ACCOUNT</Links>}
          <LinksLast to="/about">ABOUT</LinksLast>
          {/* <DashLoginModal /> */}
          {!SignedIn && <DashLoginModal />}
          {/* <DashSignupModal /> */}
          {!SignedIn && <DashSignupModal />}
          {/* <Links to="/logout">LOGOUT</Links> */}
          {SignedIn && <Links to="/logout">LOGOUT</Links>}
          <SautiLink href="http://sautiafrica.org/">Sauti Home</SautiLink>
        </Navigation>
      </TopBar>

      <Route exact path="/" component={DashHome} />
      <Route exact path="/tools" component={UsersQuery} />
      <Route exact path="/about" component={DashAbout} />
      <Route exact path="/myaccount" component={DashAccount} />
      <Route exact path="/logout" component={DashLogout} />
    </>
  );
}

export default withRouter(DashNav);

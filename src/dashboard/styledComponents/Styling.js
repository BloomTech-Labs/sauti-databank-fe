import styled from "styled-components";
import { Link } from "react-router-dom";

// General Styles
export const Header1 = styled.h2`
  font-size: 2rem;
  text-align: center;
  padding: 1% 0% 0% 0%;
`;
export const Header2 = styled.h2`
  font-size: 2rem;
  padding: 2% 0% 2% 0%;
`;
export const PageText = styled.p`
  font-size: 1.6rem;
  width: 85vw;
  margin: 0 auto;
`;
export const ModalText = styled.p`
  font-size: 1.8rem;
`;
export const ContentContainer = styled.div`
  width: 95vw;
  margin: 0 auto;
  font-family: Montserrat;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7rem;
  background: #2c2e32;
  background: ${props => console.log(props.LandingPage, "INSIDE STYLING")};
`;

export const AccountDiv = styled.div`
  margin: 0% 0% 0% 0.75%;
`;
export const AccountLinks = styled(Link)`
  margin: 2% 0% 0% 2%;
  padding: 0.5%;
  width: 90px;
  height: 35px;
  border: 2px solid #212121;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  background-color: #eb5e52;
  color: #212121;
  &:hover {
    background-color: #212121;
    color: white;
  }
`;
// Sauti Logo in Nav Styling
export const SautiLogo = styled.div`
  align-items: center;
  font-family: Montserrat;
  font-size: 3rem;
  font-weight: 1000;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  margin: 20px;
  color: white;
  margin-left: 60px;
  text-decoration: none;
`;
export const SautiLogoText = styled.a`
  text-decoration: none;
  color: white;
`;
export const SautiDot = styled.span`
  color: #eb5e52;
`;
// Nav and Links Styling
export const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  .loggedInAs {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4rem;

    .email {
      letter-spacing: normal;
      font-size: 1.5rem;
      color: white;
    }
  }
`;
export const Links = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 40px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 1000;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
  &:hover {
    color: #eb5e52;
  }
`;
export const LinksLast = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 27.5px;
  font-family: Helvetica;
  font-size: 1.3rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  &:hover {
    color: #eb5e52;
  }
`;
export const SautiLink = styled.a`
  text-decoration: none;
  color: white;
  margin-right: 40px;
  font-family: Helvetica;
  font-size: 1.3rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-transform: uppercase;
  &:hover {
    color: #eb5e52;
  }
`;
// Modal Styling
export const ModalButtons = styled.button`
  background-color: transparent;
  margin-right: 10px;
  padding: 2;
  border: none;
  font-family: Helvetica;
  font-size: 1.3rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  width: 75px;
  &:hover {
    color: #eb5e52;
    cursor: pointer;
  }
`;
// Graph Page
export const NoAccessText = styled.button`
  padding: 2% 0% 0% 0%;
  font-size: 1.4rem;
  color: lightgrey;
  &:hover {
    cursor: pointer;
  }
`;
export const DownloadText = styled.button`
  padding: 2% 0% 0% 0%;
  font-size: 1.4rem;
  color: #212121;
  &:hover {
    cursor: pointer;
  }
`;

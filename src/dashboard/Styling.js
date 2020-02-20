import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header2 = styled.h2`
  font-size: 2rem;
  padding: 2% 0% 2% 0%;
`;
export const PageText = styled.p`
  font-size: 1.6rem;
  width: 85vw;
  margin: 0 auto;
`;
export const ContentContainer = styled.div`
  width: 95vw;
  margin: 0 auto;
`;
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212121;
  width: 100%;
  height: 70px;
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
export const SautiLogo = styled.div`
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
export const Navigation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const Links = styled(Link)`
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
  &: hover {
    color: #eb5e52;
  }
`;
export const SautiLink = styled.a`
  text-decoration: none;
  color: #eb5e52;
  margin-right: 40px;
  font-family: Helvetica;
  font-size: 1.6rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  &:hover {
    color: khaki;
  }
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  margin: 0 auto;
  padding: 4%;
  background-color: #212121;
`;
export const Input = styled.input`
  width: 45%;
  height: 30px;
  margin: 0.5%;
  border-radius: 5px;
  border: 2px solid black;
`;
export const Buttons = styled.button`
  width: 25%;
  height: 30px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: bold;
  background: lightgrey;
  &:hover {
    background-color: #eb5e52;
  }
`;

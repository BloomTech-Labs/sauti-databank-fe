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
// Sauti Logo in Nav Styling
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
// Nav and Nav Links Styling
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
// Form Pages
export const LoginPage = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 250px;
  border: 4px solid lightgrey;
  border-radius: 5px;
  background-color: #212121;
`;
export const SignUpPage = styled.div`
  display: flex;
`;
export const SignUpInfo = styled.div`
  width: 300px;
  height: 680px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  background: #212121;
  text-align: left;
  border-radius: 10px;
  background-color: white;
  color: #212121;
`;
// Form Styling
export const Form = styled.form`
  width: 300px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #212121;
  text-align: center;
  border-radius: 10px;
`;
export const SignUpForm = styled.form`
  width: 25%;
  height: 680px;
  padding: 40px;
  background: #212121;
  text-align: center;
  border-radius: 10px;
`;
export const FormTitle = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 3rem;
`;
export const FormInputs = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #eb5e52;
  padding: 14px 10px;
  width: 65%;
  outline: none;
  color: white;
  border-radius: 24px;
  transition 0.25s;
  &:focus {
    width: 75%;
    border-color: white;
  }
`;
export const SignUpInputs = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #eb5e52;
  padding: 14px 10px;
  width: 50%;
  outline: none;
  color: white;
  border-radius: 24px;
  transition 0.25s;
  &:focus {
    width: 70%;
    border-color: white;
  }
`;
export const FormButton = styled.button`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #eb5e52;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
  &:hover {
    background: #eb5e52;
  }
`;
export const FormButton2 = styled.button`
  width: 200px;
  height: 50px;
  background: none;
  border: 2px solid;
  border-radius: 24px;
  color: #eb5e52;
  font-weight: 700;
  text-transformation: uppercase;
  cursor: pointer;
  font-size: 1.6rem;
  position: relative;
  &:hover {
    color: white;
    border: 2px solid white;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: #212121;
    transform: skewX(50deg);
    transition: 0.4s linear;
  }
  &:before {
    color: #eb5e52
    top: -4px;
    left: 10%;
  }
  &:hover:before {
    left: 80%;
  }
  &:after {
    bottom: -4px;
    right: 10%;
  }
  &:hover:after {
    right: 80%;
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
  }
`;

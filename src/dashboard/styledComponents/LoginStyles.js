import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginPage = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 250px;
  border: 4px solid lightgrey;
  border-radius: 5px;
  background-color: #212121;
`;
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
  // border-radius: 24px;
  transition 0.25s;
  &:focus {
    width: 75%;
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

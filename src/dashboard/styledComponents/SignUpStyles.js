import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 110vw;
  &:focus {
    outline: 0;
  }
`;
export const SignUpText = styled.div`
  width: 25%;
  height: 720px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  background-color: white;
  color: #212121;
`;
export const SignUpPage = styled.div`
  display: flex;
`;
export const SignUpInfo = styled.div`
  width: 300px;
  height: 720px;
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
export const SignUpForm = styled.form`
  width: 25%;
  height: 720px;
  padding: 40px;
  background: #212121;
  text-align: center;
  border-radius: 10px;
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
export const SignUpInputsDropDown = styled.select`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid white;
  padding: 14px 10px;
  width: 50%;
  outline: none;
  color: white;
  border-radius: 24px;
  transition 0.25s;
  &:focus {
    width: 70%;
    border-color: #eb5e52;
  }
`;
export const DropDownLabel = styled.option`
  font-size: 1.6rem;
  color: white;
`;
export const DropDownOption = styled.option`
  color: #212121;
`;

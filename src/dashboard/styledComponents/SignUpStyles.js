import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { nonExecutableDefinitionMessage } from "graphql/validation/rules/ExecutableDefinitions";

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
  // display: flex;
  // flex-direction: column;
  // align-items: space-between;
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
  height: 750px;
  padding: 10px 40px 40px 40px;
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
  // border-radius: 24px;
  transition 0.25s;
  &:focus {
    width: 70%;
    border-color: white;
  }
`;
export const SignUpRequiredInputs = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 0px auto;
  text-align: center;
  border: 2px solid white;
  padding: 14px 10px;
  width: 65%;
  outline: none;
  color: white;
  // border-radius: 24px;
  transition 0.25s;
  &:focus {
    width: 78%;
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
  // border-radius: 24px;
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

// NEW SIGN UP
export const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  // margin: 0 auto;
  background-color: #212121;
  color: white;
  // margin-top: 2%;
  padding: 2%;
  border-radius: 5px;
`;
export const InputTitle = styled.p`
  font-size: 1.6rem;
  padding: 1% 0% 4% 0%;
  color: white;
`;
export const RequiredInputTitle = styled.p`
  font-size: 2rem;
  margin-left: 10%;
  padding: 2% 0% 0% 0%;
  color: white;
  text-align: left;
`;
export const CloseButton = styled.button`
  background-color: #212121;
  color: white;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  text-align: right;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;
export const FormTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SignUpClose = styled.div`
  text-align: right;
`;
export const FormTitle2 = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 3rem;
  text-align: center;
`;
export const UserType = styled.big`
  font-size: 1.8rem;
  font-weight: bold;
  color: #eb5e52;
`;
export const ModalTextBottom = styled.p`
  font-size: 1.6rem;
  color: red;
  bottom: 0;
`;

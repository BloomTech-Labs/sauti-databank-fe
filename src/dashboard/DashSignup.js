// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
//import mutation from "../queries/mutation";
//import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import swal from "sweetalert";

import {
  ModalText,
  SignUpForm,
  FormTitle,
  FormButton,
  FormButton2,
  FormInputs,
  SignUpContainer,
  SignUpText,
  ContentContainer,
  SignUpInfo,
  SignUpPage,
  SignUpInputsDropDown,
  SignUpInputs,
  DropDownOption,
  DropDownLabel,
  FormTitle2,
  CloseButton,
  SignUpClose,
  UserType,
  InputTitle,
  SignUpRequiredInputs,
  RequiredInputTitle,
  ModalTextBottom
} from "./styledComponents/Index";

const initialState = {
  email: "",
  password: "",
  organization: "",
  job_position: "",
  country: "",
  organization_type: "",
  tier: "",
  interest: ""
};

const REGISTER = gql`
  mutation registerNewUser($newUser: newRegisterInput!) {
    register(input: $newUser) {
      id
      email
      password
      tier
      interest
      organization
      job_position
      country
      organization_type
      token
    }
  }
`;

const Styles = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    position: "relative",
    backgroundColor: "none",
    color: "white",
    border: "2px solid white",
    fontSize: 18,
    width: 200,
    padding: "14px 20px 14px 8px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "white",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

function DashSignup(props) {
  const [user, setUser] = useState(initialState);
  console.log(user);
  const history = useHistory();
  const [createUser, newUser] = useMutation(REGISTER);
  const {
    email,
    password,
    organization,
    job_position,
    country,
    organization_type,
    tier,
    interest
  } = user;

  const classes = useStyles();

  const handleChange = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    if (
      user.email === "" ||
      user.password === "" ||
      user.organization_type === "" ||
      user.tier === ""
    ) {
      swal({
        title: "Error",
        text: "Error Signing up. Please fill all required fields.",
        icon: "warning",
        dangerMode: true
      });
    } else {
      const createdUser = await createUser({
        variables: { newUser: input }
      });
      console.log(createdUser);
      localStorage.setItem("token", createdUser.data.register.token);
      props.handleClose();
      history.push("/");
      swal({ title: "✔", text: "Success", icon: "success" });
    }
  };

  if (newUser.loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={12000}
        />
      </div>
    );
  }

  if (newUser.error) {
    return <p>ERROR!</p>;
  }

  return (
    <SignUpContainer>
      <SignUpText>
        <ModalText>User Tier:</ModalText>
        <hr />
        <ModalText>
          <UserType>Free:</UserType>
          <ul>
            <li>User has access to the base app.</li>
            <li>
              Ability to cross-filter data using the filtering options on the
              Data page.
            </li>
            <li>cannot access calendar and date filtering feature.</li>
            <li>User cannot download data to a csv file.</li>
          </ul>
        </ModalText>
        <br />
        <ModalText>
          <UserType>PAID:</UserType>
          <ul>
            <li>User has access to the base app.</li>
            <li>
              Ability to cross-filter data using the filtering options on the
              Data page.
            </li>
            <li>User has access to calendar and date filtering feature.</li>
            <li>User can download data to a csv file.</li>
          </ul>
        </ModalText>
        <br />
        <br />
        <br />
        <ModalTextBottom>* = Required filed</ModalTextBottom>
      </SignUpText>
      <SignUpForm>
        <SignUpClose>
          <CloseButton onClick={props.handleClose}>X</CloseButton>
        </SignUpClose>
        <form onSubmit={e => handleSubmit(e, user)}>
          <FormTitle2>Sign Up</FormTitle2>
          <RequiredInputTitle>*</RequiredInputTitle>
          <SignUpRequiredInputs
            type="text"
            // pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            // validate="required"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          <RequiredInputTitle>*</RequiredInputTitle>
          <SignUpRequiredInputs
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          <FormInputs
            type="text"
            name="organization"
            placeholder="organization"
            value={organization}
            onChange={handleChange}
          />
          <FormInputs
            type="text"
            name="job_position"
            placeholder="job_position"
            value={job_position}
            onChange={handleChange}
          />
          <FormControl className={classes.margin}>
            <InputTitle id="demo-customized-select-label">
              * Select Your Organization Type
            </InputTitle>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              name="organization_type"
              value={organization_type}
              onChange={handleChange}
              input={<Styles />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"RESEARCH"}>RESEARCH</MenuItem>
              <MenuItem value={"GOVERNMENT"}>GOVERNMENT</MenuItem>
              <MenuItem value={"NGO"}>NGO</MenuItem>
              <MenuItem value={"OTHER"}>OTHER</MenuItem>
            </Select>
          </FormControl>
          <FormInputs
            type="text"
            name="country"
            placeholder="country"
            value={country}
            onChange={handleChange}
          />
          <FormControl className={classes.margin}>
            <InputTitle id="demo-customized-select-label">
              * Select A User Type
            </InputTitle>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={tier}
              name="tier"
              onChange={handleChange}
              input={<Styles />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"FREE"}>FREE</MenuItem>
              <MenuItem value={"PAID"}>PAID</MenuItem>
            </Select>
          </FormControl>
          <FormInputs
            type="text"
            name="interest"
            placeholder="interest"
            value={interest}
            onChange={handleChange}
          />
          <FormButton2 className="initialize-signup" type="submit">
            Create Account
          </FormButton2>
        </form>
      </SignUpForm>
    </SignUpContainer>
  );
}

export default DashSignup;

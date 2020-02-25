import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import mutation from "../queries/mutation";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { nonExecutableDefinitionMessage } from "graphql/validation/rules/ExecutableDefinitions";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import styled from "styled-components";
import {
  SignUpDiv,
  SignUpContainer,
  ModalText,
  SignUpText,
  InputTitle,
  FormInputs,
  CloseButton,
  FormTitle,
  FormTitle2,
  FormTop,
  FormButton2
} from "./styledComponents/Index";

const Styles = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 24,
    position: "relative",
    backgroundColor: "none",
    color: "white",
    border: "2px solid #eb5e52",
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
    }
  }
`;

export default function CustomizedSelects(props) {
  const classes = useStyles();
  const [organization_type, setOrganization_type] = useState("");
  const [tier, setTier] = useState("");
  const handleOrgChange = event => {
    setOrganization_type(event.target.value);
  };
  const handleTierChange = event => {
    setTier(event.target.value);
  };
  const [user, setUser] = useState(initialState);
  const history = useHistory();
  const [createUser, newUser] = useMutation(REGISTER);
  const {
    email,
    password,
    organization,
    job_position,
    country,
    // organization_type,
    // tier,
    interest
  } = user;

  const handleChange = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, input) => {
    e.preventDefault();
    createUser({
      variables: { newUser: input }
    });
    history.push("/");
    console.log("AAAAAA", input);
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
        <ModalText>Free: description goes here</ModalText>
        <ModalText>Premium: description goes here</ModalText>
      </SignUpText>
      <CloseButton onClick={props.handleClose}>X</CloseButton>
      <SignUpDiv>
        <FormTitle2>Sign Up</FormTitle2>
        <form>
          <FormInputs
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          <FormInputs
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
              Organization Type
            </InputTitle>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={organization_type}
              onChange={handleOrgChange}
              input={<Styles />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>RESEARCH</MenuItem>
              <MenuItem value={20}>GOVERNMENT</MenuItem>
              <MenuItem value={30}>NGO</MenuItem>
              <MenuItem value={30}>OTHER</MenuItem>
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
            <InputTitle id="demo-customized-select-label">User Tier</InputTitle>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={tier}
              onChange={handleTierChange}
              input={<Styles />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>FREE</MenuItem>
              <MenuItem value={20}>PREMIUM</MenuItem>
              <MenuItem value={30}>ADMIN</MenuItem>
              <MenuItem value={30}>GOV. OFFICIAL</MenuItem>
            </Select>
          </FormControl>
          <FormInputs
            type="text"
            name="interest"
            placeholder="interest"
            value={interest}
            onChange={handleChange}
          />
          <br />
          <FormButton2 type="submit" onClick={handleSubmit}>
            Create Account
          </FormButton2>
        </form>
      </SignUpDiv>
    </SignUpContainer>
  );
}

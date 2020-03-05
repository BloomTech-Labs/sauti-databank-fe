// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import { GAHandleCreateUser } from "./GoogleAnalytics/gaNewUser";
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

import styled from "styled-components";
import DashLoginModal from "./DashLoginModal";
import "../index.css";
import { ModalText, FormButton2 } from "./styledComponents/Index";

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
    backgroundColor: "white",
    border: "2px solid grey",
    borderRadius: 5,
    fontSize: 18,
    margin: "0 auto",
    width: "55%",
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
        text: "Please fill all required fields.",
        icon: "warning",
        dangerMode: true
      });
    } else {
      const createdUser = await createUser({
        variables: { newUser: input }
      });
      if (createdUser.data.register.id === null) {
        swal({
          title: "Error",
          text: "Please use a different email.",
          icon: "warning",
          dangerMode: true
        });
      } else {
        console.log(createdUser.data.register.id);
        localStorage.setItem("token", createdUser.data.register.token);
        GAHandleCreateUser();
        history.push("/");
        swal({ title: "", text: "Success!", icon: "success" });
      }
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
    <SignupPageContainer className="hero-img">
      <div></div>
      <FormContainer>
        <Form onSubmit={e => handleSubmit(e, user)}>
          <FormTitle>Create Account</FormTitle>
          <Labels>Email</Labels>
          <Inputs
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Labels>Password</Labels>
          <Inputs
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Labels>Organization</Labels>
          <Inputs
            type="text"
            name="organization"
            value={organization}
            onChange={handleChange}
          />
          <Labels>Job Position</Labels>
          <Inputs
            type="text"
            name="job_position"
            value={job_position}
            onChange={handleChange}
          />
          <Labels>Country</Labels>
          <Inputs
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
          />
          <Labels>Interest</Labels>
          <Inputs
            type="text"
            name="interest"
            value={interest}
            onChange={handleChange}
          />
          <Labels2>Select Your Organization Type</Labels2>
          <FormControl className={classes.margin}>
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
          <br />
          <Labels2>Select A User Type</Labels2>
          <FormControl className={classes.margin}>
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
          <br />
          <Button className="initialize-signup" type="submit">
            Sign Up
          </Button>
        </Form>
        <div>
          <DashLoginModal />
        </div>
      </FormContainer>
    </SignupPageContainer>
  );
}

export default DashSignup;

// WHOLE PAGE
const SignupPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;
// TEXT CONTAINER
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 75vh;
  font-size: 1.8rem;
  background-color: lightgrey;
`;
const HeroImage = styled.div`
  height: 75%;
`;
const Text = styled.div`
  width: 75%;
  padding: 5%;
  margin: 0 auto;
`;
const TextButton = styled.button`
  background-color: lightgrey;
  border: none;
`;
// FORM CONTAINER
const FormContainer = styled.div`
  width: 35%;
  background-color: white;
  self-align: flex-end;
  text-align: center;
  @media screen and (min-width: 2560px) {
    width: 50%;
  }
  @media screen and (min-width: 1440px) {
    width: 45%;
  }
`;
const LoginButtonDiv = styled.div`
  margin: 0 auto;
`;
const FormTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-top: 2.5%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Inputs = styled.input`
  padding: 14px 20px 14px 8px;
  width: 55%;
  margin: 0 auto;
  border: 2px solid grey;
  border-radius: 5px;
`;
const Labels = styled.label`
  font-size: 1.6rem;
  margin-left: 20%;
  margin-top: 2%;
`;
const Labels2 = styled.label`
  font-size: 1.6rem;
  margin-left: 20%;
  margin-top: 2%;
`;
const Button = styled.button`
  background-color: #eb5e52;
  font-size: 1.6rem;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 2%;
  transition: 0.5s ease;
  width: 60%;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  border: 2px solid #eb5e52;
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #eb5e52;
  }
`;

// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
//import mutation from "../queries/mutation";
//import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

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
  SignUpClose
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
    }
  }
`;

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
    console.log(input);
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
  // console.log("user", user);

  return (
    <SignUpContainer>
      <SignUpText>
        <ModalText>User Tier:</ModalText>
        <hr />
        <ModalText>Free: description goes here</ModalText>
        <ModalText>Premium: description goes here</ModalText>
      </SignUpText>
      <SignUpForm>
        <SignUpClose>
          <CloseButton onClick={props.handleClose}>X</CloseButton>
        </SignUpClose>
        <form onSubmit={e => handleSubmit(e, user)}>
          <FormTitle2>Sign Up</FormTitle2>
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
          <DropDownLabel>Select Your Organization Type</DropDownLabel>
          {/* <SignUpInputsDropDown id="organization_type" name="organization_type">
          <DropDownOption value={null}>Please Select</DropDownOption>
          <DropDownOption value="RESEARCH">RESEARCH</DropDownOption>
          <DropDownOption value="GOVERNMENT">GOVERNMENT</DropDownOption>
          <DropDownOption value="NGO">NGO</DropDownOption>
          <DropDownOption value="OTHER">OTHER</DropDownOption>
        </SignUpInputsDropDown> */}
          <FormInputs
            type="text"
            name="organization_type"
            placeholder="organization type"
            value={organization_type}
            onChange={handleChange}
          />
          <FormInputs
            type="text"
            name="country"
            placeholder="country"
            value={country}
            onChange={handleChange}
          />
          <DropDownLabel>Select A User Type</DropDownLabel>
          {/* <SignUpInputsDropDown id="tier" name="tier">
          <DropDownOption value={null}>Please Select</DropDownOption>
          <DropDownOption value="FREE">FREE</DropDownOption>
          <DropDownOption value="PAID">PAID</DropDownOption>
          <DropDownOption value="ADMIN">ADMIN</DropDownOption>
          <DropDownOption value="GOV_ROLE">GOV. OFFICIAL</DropDownOption>
        </SignUpInputsDropDown> */}
          <FormInputs
            type="text"
            name="tier"
            placeholder="user tier"
            value={tier}
            onChange={handleChange}
          />
          <FormInputs
            type="text"
            name="interest"
            placeholder="interest"
            value={interest}
            onChange={handleChange}
          />
          <FormButton2 type="submit" onClick={props.handleClose}>
            Create Account
          </FormButton2>
        </form>
      </SignUpForm>
    </SignUpContainer>
  );
}

export default DashSignup;

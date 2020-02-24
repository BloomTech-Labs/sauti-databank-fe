// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import mutation from "../queries/mutation";
import { graphql } from "react-apollo";

import {
  ModalText,
  SignUpForm,
  FormTitle,
  FormButton,
  FormButton2,
  FormInputs,
  SignUpContainer,
  SignUpText
} from "./styledComponents/Index";

const initialState = {
  email: "",
  password: "",
  profession: "",
  organization: "",
  jobPosition: "",
  country: "",
  governmentRole: "",
  userTier: "",
  interests: ""
};

function DashSignup(props) {
  const [user, setUser] = useState(initialState);
  const {
    email,
    password,
    profession,
    organization,
    jobPosition,
    country,
    governmentRole,
    userTier,
    interests
  } = user;

  const handleChange = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props
      .mutate({
        variables: {
          email,
          password,
          profession,
          organization,
          jobPosition,
          country,
          governmentRole,
          userTier,
          interests
        }
      })
      .then(() => setUser(initialState));
  };

  return (
    <SignUpContainer>
      <SignUpText>
        <ModalText>User Tiers + Pricing Details:</ModalText>
        <hr />
        <ModalText>Free: description goes here</ModalText>
        <ModalText>Premium: description goes here</ModalText>
      </SignUpText>
      <SignUpForm onSubmit={handleSubmit}>
        <FormTitle>Sign Up</FormTitle>
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
          name="profession"
          placeholder="profession"
          value={profession}
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
          name="jobPosition"
          placeholder="jobPosition"
          value={jobPosition}
          onChange={handleChange}
        />
        <FormInputs
          type="text"
          name="country"
          placeholder="country"
          value={country}
          onChange={handleChange}
        />
        <FormInputs
          type="checkbox"
          name="governmentRole"
          placeholder="governmentRole"
          value={governmentRole}
          onChange={handleChange}
        />
        <FormInputs
          type="text"
          name="userTier"
          placeholder="userTier"
          value={userTier}
          onChange={handleChange}
        />
        <FormInputs
          type="text"
          name="interests"
          placeholder="interests"
          value={interests}
          onChange={handleChange}
        />
        <FormButton2 type="submit">Create Account</FormButton2>
      </SignUpForm>
    </SignUpContainer>
  );
}

export default graphql(mutation)(DashSignup);

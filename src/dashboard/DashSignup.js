// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import mutation from "../queries/mutation";
import { graphql } from "react-apollo";
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
  SignUpPage
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
  console.log("user", user);

  return (
    <SignUpContainer>
      <SignUpText>
        <ModalText>User Tier:</ModalText>
        <ModalText>Free: description goes here</ModalText>
        <ModalText>Premium: description goes here</ModalText>
      </SignUpText>
      <SignUpForm onSubmit={e => handleSubmit(e, user)}>
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
        <FormInputs
          type="text"
          name="organization_type"
          placeholder="organization_type"
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
        <FormInputs
          type="text"
          name="tier"
          placeholder="tier"
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
        <FormButton2 type="submit">Create Account</FormButton2>
      </SignUpForm>
    </SignUpContainer>
  );
}

export default DashSignup;

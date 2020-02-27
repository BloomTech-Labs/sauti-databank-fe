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
  SignUpClose,
  UserType
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
          {/* <fieldset>
            <select name="organization_type" value={organization_type}>
              <option value="RESEARCH">RESEARCH</option>
              <option value="GOVERNMENT">GOVERNMENT</option>
              <option value="NGO">NGO</option>
              <option value="OTHER">OTHER</option>
            </select>
          </fieldset> */}
          <FormInputs
            type="select"
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
          {/* <fieldset>
            <select name="tier" value={tier}>
              <option value="FREE">FREE</option>
              <option value="PAID">PAID</option>
            </select>
          </fieldset> */}
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

// will be a modal that when clicked will overlay the form on the page
// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

// Talk about pricing in here
// email, password, profession, organization, job_position, country, gov_role, user_tier, interests_in_data
import React, { useState } from "react";

import {
  ContentContainer,
  PageText,
  ModalText,
  Header2,
  SignUpPage,
  SignUpContainerText,
  SignUpContainerForm,
  SignUpForm,
  FormTitle,
  FormButton,
  FormInputs,
  SignUpInfo
} from "./Styling";

function DashSignup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profession, setProfession] = useState();
  const [organization, setOrganization] = useState();
  const [jobPosition, setJobPosition] = useState();
  const [country, setCountry] = useState();
  const [governmentRole, setGovernmentRole] = useState();
  const [userTier, setUserTier] = useState();
  const [interests, setInterests] = useState();

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <ContentContainer>
      <SignUpPage>
        <SignUpInfo>
          <ModalText>User Tier:</ModalText>
          <ModalText>Free: description goes here</ModalText>
          <ModalText>Premium: description goes here</ModalText>
        </SignUpInfo>
        <div>
          <SignUpForm onSubmit={handleSubmit}>
            <FormTitle>Sign Up</FormTitle>
            <FormInputs
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <FormInputs
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <FormInputs
              type="text"
              name="profession"
              placeholder="profession"
              value={profession}
              onChange={event => setProfession(event.target.value)}
            />
            <FormInputs
              type="text"
              name="organization"
              placeholder="organization"
              value={organization}
              onChange={event => setOrganization(event.target.value)}
            />
            <FormInputs
              type="text"
              name="jobPosition"
              placeholder="jobPosition"
              value={jobPosition}
              onChange={event => setJobPosition(event.target.value)}
            />
            <FormInputs
              type="text"
              name="country"
              placeholder="country"
              value={country}
              onChange={event => setCountry(event.target.value)}
            />
            <FormInputs
              type="checkbox"
              name="governmentRole"
              placeholder="governmentRole"
              value={governmentRole}
              onChange={event => setGovernmentRole(event.target.value)}
            />
            <FormInputs
              type="text"
              name="userTier"
              placeholder="userTier"
              value={userTier}
              onChange={event => setUserTier(event.target.value)}
            />
            <FormInputs
              type="text"
              name="interests"
              placeholder="interests"
              value={interests}
              onChange={event => setInterests(event.target.value)}
            />
            <FormButton type="submit">Create Account</FormButton>
          </SignUpForm>
        </div>
      </SignUpPage>
    </ContentContainer>
  );
}

export default DashSignup;

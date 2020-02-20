// will be a modal that when clicked will overlay the form on the page
// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

// Talk about pricing in here
// email, password, profession, organization, job_position, country, gov_role, user_tier, interests_in_data
import React, { useState } from "react";

import {
  ContentContainer,
  PageText,
  Header2,
  Form,
  Input,
  Buttons
} from "./Styling";

function DashSignup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <ContentContainer>
      <Header2>Login to your account</Header2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          className="my-4"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        {/* <Input
          className="my-4"
          type="profession"
          name="profession"
          placeholder="profession"
          value={profession}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          className="my-4"
          type="organization"
          name="organization"
          placeholder="organization"
          value={organization}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          className="my-4"
          type="job_position"
          name="job_position"
          placeholder="job_position"
          value={job_position}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          className="my-4"
          type="country"
          name="country"
          placeholder="country"
          value={country}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          className="my-4"
          type="government_role"
          name="government_role"
          placeholder="government_role"
          value={government_role}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          className="my-4"
          type="user_tier"
          name="user_tier"
          placeholder="user_tier"
          value={user_tier}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          className="my-4"
          type="interests"
          name="interests"
          placeholder="interests"
          value={interests}
          onChange={event => setUsername(event.target.value)}
        /> */}
        <Buttons type="submit">Create Account</Buttons>
      </Form>
    </ContentContainer>
  );
}

export default DashSignup;

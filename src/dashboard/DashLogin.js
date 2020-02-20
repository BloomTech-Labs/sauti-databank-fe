// will be a modal that when clicked will overlay the form on the page
// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";

import {
  ContentContainer,
  PageText,
  Header2,
  Form,
  Input,
  Buttons,
  LoginPage
} from "./Styling";

function DashLogin() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    event.preventDefault();
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <ContentContainer>
      <LoginPage>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={handleChange}
          />
          <Input
            className="my-4"
            type="password"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={handleChange}
          />
          <Buttons type="submit">Login</Buttons>
        </Form>
      </LoginPage>
    </ContentContainer>
  );
}

export default DashLogin;

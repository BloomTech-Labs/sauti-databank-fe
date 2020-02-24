// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import mutation from "../queries/mutation";
import { graphql } from "react-apollo";

import {
  ContentContainer,
  Form,
  FormTitle,
  FormButton,
  FormButton2,
  FormInputs
} from "./styledComponents/Index";

function DashLogin(props) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props
      .mutate({
        variables: {
          email: user.email,
          password: user.password
        }
      })
      .then(() => {
        setUser({
          email: "",
          password: ""
        });
        // props.history.push('/');
      });
  };

  return (
    <ContentContainer>
      <div>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Login</FormTitle>
          <FormInputs
            type="text"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={handleChange}
          />
          <FormInputs
            className="my-4"
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />
          <FormButton2 type="submit">Login</FormButton2>
        </Form>
      </div>
    </ContentContainer>
  );
}

export default graphql(mutation)(DashLogin);

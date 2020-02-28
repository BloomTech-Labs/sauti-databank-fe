// we will also use this modal in various places within the dashboard so that when somone clicks something you need to sign in for or pay to see it will direct you to the sign up then to the payment options in future releases

import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import mutation from "../queries/mutation";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import swal from "sweetalert";

import {
  ContentContainer,
  Form,
  FormTitle,
  FormButton,
  FormButton2,
  FormInputs
} from "./styledComponents/Index";

const LOGIN = gql`
  mutation registerNewUser($login: newLoginInput!) {
    login(input: $login) {
      id
      email
      token
      tier
    }
  }
`;

function DashLogin(props) {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [userLoggedIn, { loading, error }] = useMutation(LOGIN);

  if (loading) {
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

  if (error) {
    return <p>ERROR!</p>;
  }

  const handleChange = event => {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    const newUser = await userLoggedIn({
      variables: { login: input }
    });
    if (newUser.data.login.token !== null) {
      console.log("newUser", newUser.data.login);
      console.log("newUser2", newUser.data.login.token);
      localStorage.setItem("token", newUser.data.login.token);

      props.handleClose();
      history.push("/");
      swal({ title: "✔", text: "Success", icon: "success" });
    } else {
      swal({
        title: "Error",
        text:
          "Error logging in. Please Check that your email and password are correct.",
        icon: "warning",
        dangerMode: true
      });
    }
  };

  return (
    <ContentContainer>
      <div>
        <Form onSubmit={e => handleSubmit(e, user)}>
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
          <FormButton2 className="initialize-login" type="submit">
            Login
          </FormButton2>
        </Form>
      </div>
    </ContentContainer>
  );
}

export default DashLogin;

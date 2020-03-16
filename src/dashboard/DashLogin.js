import React, { useState } from "react";
import { PageView, Event, GALogin } from "./GoogleAnalytics/index";
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
  FormInputs
} from "./styledComponents/Index";
import styled from "styled-components";

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
      localStorage.setItem("token", newUser.data.login.token);
      if (newUser) {
        GALogin(newUser.data.login.tier, newUser.data.login.email);
      }
      props.handleClose();
      history.push("/data");
      swal({ title: "", text: "Success!", icon: "success" });
    } else {
      swal({
        title: "Error",
        text: "Please check that your email and password are correct.",
        icon: "warning",
        dangerMode: true
      });
    }
  };

  const LoginButton = styled.button`
    background-color: transparent;
    font-size: 1.6rem;
    text-transform: uppercase;
    border: none;
    padding: 3%;
    transition: 0.5s ease;
    width: 75%;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 2px solid #eb5e52;
    font-weight: bold;
    &:hover {
      background-color: #eb5e52;
      cursor: pointer;
      color: white;
    }
  `;

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
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />
          <LoginButton className="initialize-login" type="submit">
            Login
          </LoginButton>
        </Form>
      </div>
    </ContentContainer>
  );
}

export default DashLogin;

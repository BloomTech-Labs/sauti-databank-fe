import React, { useState, useEffect } from "react";

import { Redirect, useHistory } from "react-router-dom";
import { makeStyles, styled } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import styledComp from "styled-components";
import swal from "sweetalert";

const Styles = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    // position: "relative",
    borderRadius: "5px",
    border: "1px solid grey",
    fontSize: 16,
    width: "87.5%",
    padding: "17.5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "white",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex"
  }
}));

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

//brought in from UsersQuery.js used to update apollo cache
const Users_Query = gql`
  query UsersQ {
    allUsers: databankUsers {
      id
      email
      interest
      tier
      organization
      job_position
      country
      organization_type
    }
  }
`;

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

function CreateUser(props) {
  const [addUser, setAddUser] = useState(initialState);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [createUser, newUser] = useMutation(REGISTER, {
    update(cache, { data: { register } }) {
      const data = cache.readQuery({ query: Users_Query });
      cache.writeQuery({
        query: Users_Query,
        data: { allUsers: [...data.allUsers, register] }
      });
    }
  });

  const {
    email,
    password,
    organization,
    job_position,
    country,
    organization_type,
    tier,
    interest
  } = addUser;

  const handleChange = event => {
    setAddUser({ ...addUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event, input) => {
    event.preventDefault();
    if (
      email === "" ||
      password === "" ||
      organization_type === "" ||
      tier === ""
    ) {
      swal({
        title: "Error",
        text: "Please fill all required fields.",
        icon: "warning",
        dangerMode: true
      });
    } else {
      const createdUser = await createUser({
        variables: { newUser: input }
      });
      if (createdUser.data.register.id === null) {
        swal({
          title: "Error",
          text: "That email is already in use.",
          icon: "warning",
          dangerMode: true
        });
      } else {
        props.handleClose();
        swal({ title: "", text: "Success!", icon: "success" });
      }
    }
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

  const role = [
    {
      value: "",
      label: "Please Select"
    },
    {
      value: "super_user",
      label: "Super User"
    },
    {
      value: "org_user",
      label: "Organizationl User"
    },
    {
      value: "operator",
      label: "operator"
    }
  ];

  return (
    <>
      <Form className={classes.paper}>
        <FormDiv>
          <InputColumns>
            <ColumnDiv>
              <Labels for="Name">Email</Labels>
              <Inputs
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <Labels for="Name">Password</Labels>
              <Inputs
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <Labels for="Organization">Organization</Labels>
              <Inputs
                type="text"
                name="organization"
                id="organization"
                value={organization}
                onChange={handleChange}
              />
              <Labels for="job_position">Job Position</Labels>
              <Inputs
                type="job_position"
                name="job_position"
                id="job_position"
                value={job_position}
                onChange={handleChange}
              />
            </ColumnDiv>
            <ColumnDiv>
              <Labels for="country">Country</Labels>
              <Inputs
                type="country"
                name="country"
                id="country"
                value={country}
                onChange={handleChange}
              />
              <Labels for="interest">Interest</Labels>
              <Inputs
                type="interest"
                name="interest"
                id="interest"
                value={interest}
                onChange={handleChange}
              />
              <FormControl className={classes.margin}>
                <Labels2 id="User type">Select a User Type</Labels2>
                <Select
                  labelId="User type"
                  id="tier"
                  value={tier}
                  name="tier"
                  onChange={handleChange}
                  input={<Styles />}
                  placeholder="tier"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"FREE"}>FREE</MenuItem>
                  <MenuItem value={"PAID"}>PAID</MenuItem>
                  <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                  <MenuItem value={"GOV_ROLE"}>GOVERNMENT</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.margin}>
                <Labels2 id="organization_type">
                  Select an Organization Type
                </Labels2>
                <Select
                  labelId="organization_type"
                  id="organization_type"
                  name="organization_type"
                  value={organization_type}
                  onChange={handleChange}
                  input={<Styles />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"RESEARCH"}>RESEARCH</MenuItem>
                  <MenuItem value={"GOVERNMENT"}>GOVERNMENT</MenuItem>
                  <MenuItem value={"NGO"}>NGO</MenuItem>
                  <MenuItem value={"OTHER"}>OTHER</MenuItem>
                </Select>
              </FormControl>
            </ColumnDiv>
          </InputColumns>
          <ButtonsDiv className="CreateAccount">
            <CancelButton onClick={props.handleClose}>Cancel</CancelButton>
            <AddButton type="Submit" onClick={e => handleSubmit(e, addUser)}>
              Create addUser
            </AddButton>
          </ButtonsDiv>
        </FormDiv>
      </Form>
    </>
  );
}
export default CreateUser;

const Form = styledComp.form`
  border-radius: 5px;
  border: none;
`;
const ColumnDiv = styledComp.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 450px;
`;
const FormDiv = styledComp.div`
  display: flex;
  flex-direction: column;
`;
const InputColumns = styledComp.div`
  display: flex;
`;
const Inputs = styledComp.input`
  width: 90%;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 15px;
`;
const Labels = styledComp.label`
  font-size: 1.6rem;
  margin-top: 15px;
  margin-bottom: 20px;
`;
const Labels2 = styledComp.label`
  font-size: 1.6rem;
  margin-top: 10px;
`;
const ButtonsDiv = styledComp.div`
  display: flex;
  justify-content: space-evenly;
`;
const CancelButton = styledComp.button`
  width: 250px;
  padding: 2%;
  background-color: transparent;
  transition: .5s ease;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  &:hover {
    color: white;
    background-color: #eb5e52;
    cursor: pointer;
  }
`;
const AddButton = styledComp.button`
  width: 250px;
  padding: 2%;
  background-color: #eb5e52;
  transition: .5s ease;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  &:hover {
    color: black;
    background-color: transparent;
    cursor: pointer;
  }
`;

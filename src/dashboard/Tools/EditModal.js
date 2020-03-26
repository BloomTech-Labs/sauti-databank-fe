import React, { useState, useEffect } from "react";

import { makeStyles, styled } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import styledComp from "styled-components";

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

const EDIT = gql`
  mutation editUserData($editUser: newEditUserInput!) {
    editUser(input: $editUser) {
      ... on DatabankUser {
        id
        email
        interest
        tier
        organization
        job_position
        country
        organization_type
        password
      }
      ... on Error {
        message
      }
    }
  }
`;

//button on AccountGrid
const EditModal = props => {
  const [account, setAccount] = useState({});
  console.log(`account`, account);
  //account id added automatically, needed to .put
  account.id = props.data.id;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [createUser, editUser] = useMutation(EDIT);

  const handleChange = event => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event, input) => {
    console.log(input);
    event.preventDefault();
    createUser({
      variables: { editUser: input },
      refetchQueries: [{ query: Users_Query }]
    });
    setOpen(false);
    props.api.api.redrawRows();
  };

  if (editUser.loading) {
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

  if (editUser.error) {
    return <p>ERROR!</p>;
  }

  const handleOpen = props => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span className="btnCon">
        <IconButtons
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={e => handleOpen(e, props.data)}
          className="btn btn-info"
        >
          <i class="fas fa-pencil-alt" />
        </IconButtons>
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Form className={classes.paper}>
            <FormDiv>
              <InputColumns>
                <ColumnDiv>
                  <Labels for="Id">Id</Labels>
                  <Inputs
                    type="text"
                    id="id"
                    placeholder={props.data.id}
                    name={props.data.id}
                    value={account.id}
                    onChange={handleChange}
                  />
                  <Labels for="Email">Email</Labels>
                  <Inputs
                    type="email"
                    name="email"
                    id="email"
                    placeholder={props.data.email}
                    value={account.email}
                    onChange={handleChange}
                  />
                  <Labels for="Organization">Organization</Labels>
                  <Inputs
                    type="text"
                    id="organization"
                    placeholder={props.data.organization}
                    name="organization"
                    value={account.organization}
                    onChange={handleChange}
                  />
                  <Labels for="password">Password</Labels>
                  <Inputs
                    type="text"
                    name="password"
                    id="password"
                    value={account.password}
                    onChange={handleChange}
                  />
                </ColumnDiv>
                <ColumnDiv>
                  <Labels for="Country">Country</Labels>
                  <Inputs
                    type="text"
                    id="country"
                    placeholder={props.data.country}
                    name="country"
                    value={account.country}
                    onChange={handleChange}
                  />
                  <Labels for="interest">Interest</Labels>
                  <Inputs
                    type="text"
                    name="interest"
                    id="interest"
                    placeholder={props.data.interest}
                    value={account.interest}
                    onChange={handleChange}
                  />
                  <FormControl className={classes.margin}>
                    <Labels2 for="Tier">User Type</Labels2>
                    <Select
                      id="tier"
                      name="tier"
                      value={account.tier}
                      onChange={handleChange}
                      placeholder={props.data.tier}
                      input={<Styles />}
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
                    <Labels2 for="Organization_type">Organization Type</Labels2>
                    <Select
                      id="organization_type"
                      name="organization_type"
                      value={account.organization_type}
                      onChange={handleChange}
                      placeholder={props.data.organization_type}
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
              <ButtonsDiv>
                <CancelButton variant="secondary" onClick={handleClose}>
                  Close
                </CancelButton>
                <AddButton
                  variant="primary"
                  onClick={e => handleSubmit(e, account)}
                >
                  Save Changes
                </AddButton>
              </ButtonsDiv>
            </FormDiv>
          </Form>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;

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
const IconButtons = styledComp.button`
  border: none;
  background: none;
`;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import swal from "sweetalert";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import styled from "styled-components";

import market from "../assets/images/market.jpg";

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

export default function SignInSide(props) {
  const classes = useStyles();
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

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <TitleContainer>
            <UnusedTitle component="h1" variant="h5">
              <FormTitle>
                <UnusedTitleLink to="/signup">Sign Up</UnusedTitleLink>
              </FormTitle>
            </UnusedTitle>
            <CurrentTitle component="h1" variant="h5">
              <FormTitle>Login</FormTitle>
              <LineUnderCurrentTitle />
            </CurrentTitle>
          </TitleContainer>
          <UnderlineDiv>
            <LineUnderTitles />
          </UnderlineDiv>
          <br />
          <br />
          <br />
          <FormTitleMain>Login</FormTitleMain>
          <br />
          <form
            className={classes.form}
            noValidate
            onSubmit={e => handleSubmit(e, user)}
          >
            <RequiredLabel>Email</RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              id="email"
              type="text"
              // label="Email"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
              autoFocus
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <RequiredLabel>Password</RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              name="password"
              // label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <div>
              <FormBottomText>
                Don't have an account? <Link to="/">Sign Up</Link> here.
              </FormBottomText>
              <br />
              <FormBottomText>
                Don't want to login right now? Click{" "}
                <Link to="/data">Continue</Link> to view our data!
              </FormBottomText>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${market})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    fontSize: "1.6rem",
    borderBottom: "1px solid black"
  }
}));

const Styles = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },

  label: {
    fontSize: "1.6rem"
  },
  input: {
    backgroundColor: "rgb(232, 240, 254)",
    borderRadius: 5,
    fontSize: 18,
    margin: "0 auto",
    width: "372px",
    padding: "14px 20px 14px 8px",
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

const FormBottomText = styled.p`
  font-size: 1.4rem;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FormTitle = styled.h1`
  font-size: 2rem;
  margin: 0 3rem;
`;
const FormTitleMain = styled.h1`
  font-size: 3rem;
  margin: 0 3rem;
`;
const CurrentTitle = styled.span``;
const UnusedTitle = styled.span`
  opacity: 0.5;
`;
const RequiredLabel = styled.label`
  font-size: 1.4rem;
`;
const UnusedTitleLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 2rem;
`;
const UnderlineDiv = styled.div`
  width: 40%;
  position: absolute;
  margin-top: 28px;
`;
const LineUnderTitles = styled.hr`
  // width: 100%;
  // opacity: 0.5;
  // position: relative;
`;
const LineUnderCurrentTitle = styled.hr`
  background-color: black;
  height: 2px;
  border: none;
`;

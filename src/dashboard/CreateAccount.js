import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import swal from "sweetalert";

import styled from "styled-components";

import beans from "../assets/images/bean.jpg";

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
      found_by
      token
    }
  }
`;

export default function SignInSide(props) {
  const [user, setUser] = useState({});
  user.tier = "FREE";
  const history = useHistory();
  const [createUser, newUser] = useMutation(REGISTER);
  // const {
  //   email,
  //   password,
  //   organization,
  //   job_position,
  //   country,
  //   organization_type,
  //   tier,
  //   interest,
  //   found_by
  // } = user;

  const classes = useStyles();

  const handleChange = event => {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    if (
      user.email === "" ||
      user.password === "" ||
      user.organization_type === "" ||
      user.found_by === ""
      /* || user.tier === "" */
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
          text: "Please use a different email.",
          icon: "warning",
          dangerMode: true
        });
      } else {
        localStorage.setItem("token", createdUser.data.register.token);
        history.push("/data");
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

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <TitleContainer>
            <CurrentTitle component="h1" variant="h5">
              <FormTitle>Sign Up</FormTitle>
              <LineUnderCurrentTitle />
            </CurrentTitle>
            <UnusedTitle component="h1" variant="h5">
              <FormTitle>
                <UnusedTitleLink to="/login">Login</UnusedTitleLink>
              </FormTitle>
            </UnusedTitle>
          </TitleContainer>
          <UnderlineDiv>
            <LineUnderTitles />
          </UnderlineDiv>
          <br />
          <br />
          <br />
          <FormTitleMain>Sign Up</FormTitleMain>
          <br />
          <form
            className={classes.form}
            validate
            onSubmit={e => handleSubmit(e, user)}
          >
            <RequiredLabel>
              <RequiredStar>*</RequiredStar> Email
            </RequiredLabel>
            <TextField
              // variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              type="email"
              // label="* Email"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
              autoFocus
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <RequiredLabel>
              <RequiredStar>*</RequiredStar> Password
            </RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              name="password"
              // label="* Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <RequiredLabel>Organization</RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              name="organization"
              // label="Organization"
              type="text"
              id="organization"
              autoComplete="current-organization"
              value={user.organization}
              onChange={handleChange}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <RequiredLabel>Job Position</RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              name="job_position"
              // label="Job Position"
              type="text"
              id="job_position"
              autoComplete="current-job_position"
              value={user.job_position}
              onChange={handleChange}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <RequiredLabel>Country</RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              name="country"
              // label="Country"
              type="text"
              id="country"
              autoComplete="current-country"
              value={user.country}
              onChange={handleChange}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <RequiredLabel>Interest</RequiredLabel>
            <TextField
              // variant='outlined'
              margin="normal"
              fullWidth
              name="interest"
              // label="Interest"
              type="text"
              id="interest"
              autoComplete="current-interest"
              value={user.interest}
              onChange={handleChange}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <br />
            <br />
            <br />
            <FormControl className={classes.margin}>
              <GreyLabelText>
                <RequiredStar>*</RequiredStar> Organization Type
              </GreyLabelText>
              <Select
                label="Organization Type"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name="organization_type"
                placeholder="Organization Type"
                value={user.organization_type}
                onChange={handleChange}
                input={<Styles />}
              >
                <MenuItem value={"RESEARCH"}>RESEARCH</MenuItem>
                <MenuItem value={"GOVERNMENT"}>GOVERNMENT</MenuItem>
                <MenuItem value={"NGO"}>NGO</MenuItem>
                <MenuItem value={"OTHER"}>OTHER</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <br />
            <FormControl className={classes.margin}>
              <GreyLabelText>
                <RequiredStar>*</RequiredStar> How did you hear about us?
              </GreyLabelText>
              <Select
                label="Found By"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name="found_by"
                placeholder=""
                value={user.found_by}
                onChange={handleChange}
                input={<Styles />}
              >
                <MenuItem value={"CROSS_BORDER_ASSOCIATION"}>
                  Cross border Association
                </MenuItem>
                <MenuItem value={"UNIVERSITY"}>University</MenuItem>
                <MenuItem value={"SAUTI_STAFF"}>Sauti Staff</MenuItem>
                <MenuItem value={"OTHER"}>OTHER</MenuItem>
              </Select>
              <br />
              <RequiredLabel>
                <RequiredStar>*</RequiredStar> = required
              </RequiredLabel>
            </FormControl>
            <br />
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
                Have an account already? <Link to="/login">Login</Link> here.
              </FormBottomText>
              <br />
              <FormBottomText>
                Don't want to sign up right now? Click{" "}
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
    backgroundImage: `url(${beans})`,
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
    backgroundColor: "white",
    borderBottom: "1px solid black",
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
  text-align: center;
  font-size: 1.4rem;
`;
const RequiredDiv = styled.div`
  text-align: center;
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
const RequiredStar = styled.big`
  color: red;
  font-size: 1.4rem;
`;
const GreyLabelText = styled.p`
  // opacity: 0.8;
  font-size: 1.4rem;
`;

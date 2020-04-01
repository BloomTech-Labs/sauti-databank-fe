import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import { useQuery, useMutation } from "@apollo/react-hooks";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const Users_Query = gql`
  query UsersQ {
    allUsers: databankUsers {
      email
    }
  }
`;

const SEND_EMAIL = gql`
  mutation sendEmail($existingEmail: resetPasswordInput!) {
    sendResetPassword(input: $existingEmail) {
      ... on DatabankUser {
        email
      }
      ... on Error {
        message
      }
    }
  }
`;

const ForgotPasswordStyled = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 30rem;
      width: 50rem;

      .header {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        height: 40%;
        width: 100%;

        h2 {
          font-size: 4rem;
        }

        span {
          font-size: 2rem;
        }
      }

      .input {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  inputRoot: {
    fontSize: 20
  },
  labelRoot: {
    fontSize: 20,
    color: "black",
    "&$labelFocused": {
      color: "black"
    }
  },
  labelFocused: {},
  button: {
    fontFamily: "Montserrat",
    margin: "2vw",
    height: "3rem",
    width: "18rem",
    fontWeight: "bold",
    fontSize: "1.6rem",
    color: "#eb5e52",
    background:
      "linear-gradient(rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0.6))",
    border: "2px solid #eb5e52",
    textDecoration: "none",
    transition: "0.5s ease",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      color: "#ffff",
      background: "#eb5e52"
    }
  }
}));

const ForgotPassword = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState({
    email: ""
  });

  const { data } = useQuery(Users_Query);
  const [gettingEmail] = useMutation(SEND_EMAIL);

  const handleChange = event => {
    event.preventDefault();
    setEmail({
      ...email,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event, input) => {
    event.preventDefault();

    await gettingEmail({
      variables: { existingEmail: input }
    });

    const validateAgainstDB = data.allUsers.map(user => {
      return user.email;
    });

    const matchFound = validateAgainstDB.includes(email.email);

    if (matchFound) {
      swal({
        title: "",
        text: "Success! Please check your email and follow the instructions.",
        icon: "success"
      });
      history.push("/");
    } else {
      // When it reaches the else statement, it means the email is not present in the DB.
      // We do not want to show people what exists in our DB and what doesn't
      swal({
        title: "",
        text: "Success! Please check your email and follow the instructions.",
        icon: "success"
      });
      history.push("/");
    }
  };

  return (
    <ForgotPasswordStyled>
      <div className="wrapper">
        <div className="container">
          <div className="header">
            <h2>Forgot your password?</h2>
            <span>
              Provide us with your email below to reset your password.
            </span>
          </div>
          <div className="input">
            <form
              className={classes.root}
              validate
              onSubmit={e => handleSubmit(e, email)}
            >
              <TextField
                required
                variant="outlined"
                placeholder="example@email.com"
                margin="normal"
                fullWidth
                size="large"
                id="email"
                type="text"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={email.email}
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
              <button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </ForgotPasswordStyled>
  );
};

export default ForgotPassword;

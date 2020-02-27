import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

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
  //console.log(`account`, account);
  //account id added automatically, needed to .put
  account.id = props.data.id;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [createUser, editUser] = useMutation(EDIT);

  const handleChange = event => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event, input) => {
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
        <button
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={e => handleOpen(e, props.data)}
          className="btn btn-info"
        >
          Edit
        </button>
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
          <div className={classes.paper}>
            <div className="col1">
              <h2>
                <label for="Id">Id</label>
                <br></br>
                <input
                  type="text"
                  id="id"
                  placeholder={props.data.id}
                  name={props.data.id}
                  value={account.id}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Email">Email</label>
                <br></br>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={props.data.email}
                  value={account.email}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Organization">Organization</label>
                <br></br>
                <input
                  type="text"
                  id="organization"
                  placeholder={props.data.organization}
                  name="organization"
                  value={account.organization}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="jobPosition">Job Position</label>
                <br></br>
                <input
                  type="text"
                  name="job_position"
                  id="job_position"
                  placeholder={props.data.job_position}
                  value={account.job_position}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Organization_type">Organization Type</label>
                <br></br>
                <input
                  type="text"
                  id="organization_type"
                  placeholder={props.data.organization_type}
                  name="organization_type"
                  value={account.organization_type}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Country">Country</label>
                <br></br>
                <input
                  type="text"
                  id="country"
                  placeholder={props.data.country}
                  name="country"
                  value={account.country}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Tier">Tier</label>
                <br></br>
                <input
                  type="text"
                  id="tier"
                  placeholder={props.data.tier}
                  name="tier"
                  value={account.tier}
                  onChange={handleChange}
                />
              </h2>

              <h2>
                <label for="interest">Interest</label>
                <br></br>
                <input
                  type="text"
                  name="interest"
                  id="interest"
                  placeholder={props.data.interest}
                  value={account.interest}
                  onChange={handleChange}
                />
              </h2>
            </div>
            <div className="col2">
              <br></br>
              <footer>
                <button variant="secondary" onClick={handleClose}>
                  Close
                </button>
                <button
                  variant="primary"
                  onClick={e => handleSubmit(e, account)}
                >
                  Save Changes
                </button>
              </footer>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;

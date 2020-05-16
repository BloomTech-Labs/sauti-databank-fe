import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// import { ModalButtons } from "../styledComponents/Index";
import styled from "styled-components";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import { ContentContainer } from "../styledComponents/Index";
import styledComp from "styled-components";

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
    padding: theme.spacing(2, 4, 3)
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

const DELETE = gql`
  mutation deleteAUser($delete_user: newDeleteUserInput!) {
    deleteUser(input: $delete_user) {
      ... on DatabankUser {
        id
        email
      }
      ... on Error {
        message
      }
    }
  }
`;

const DeleteAccount = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteId, deleteUser] = useMutation(DELETE, {
    update(cache, { data: { deleteUser } }) {
      const data = cache.readQuery({ query: Users_Query });
      cache.writeQuery({
        query: Users_Query,
        data: {
          allUsers: [
            ...data.allUsers,
            data.allUsers.map(e => {
              if (e.id !== deleteUser.id) {
                return e;
              }
            })
          ]
        }
      });
    }
  });

  const deleteHandler = (event, input) => {
    input = { id: input };
    event.preventDefault();
    deleteId({
      variables: { delete_user: input },
      refetchQueries: [{ query: Users_Query }]
    });
    props.params.api.redrawRows();
  };

  if (deleteUser.loading) {
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

  if (deleteUser.error) {
    return <p>ERROR!</p>;
  }

  return (
    <div>
      <span className="btnCon">
        <IconButtons
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={handleOpen}
          className="btn btn-info"
        >
          <i className="icon-trash"></i>
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
          <ContentContainer>
            <div>
              <Div>
                <BigX onClick={handleClose}>X</BigX>
                <FormTitle>Delete User</FormTitle>
                <DownloadText>
                  Are you sure you want to <BigContinue>Delete</BigContinue>{" "}
                  this user?
                </DownloadText>
                <DeleteButton
                  type="submit"
                  onClick={e => deleteHandler(e, props.data.id)}
                >
                  Delete
                </DeleteButton>
              </Div>
            </div>
          </ContentContainer>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteAccount;

const IconButtons = styledComp.button`
  border: none;
  background: none;
`;
const DeleteButton = styled.button`
  background-color: transparent;
  font-size: 1.6rem;
  text-transform: uppercase;
  border: none;
  padding: 3%;
  transition: 0.5s ease;
  width: 45%;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #eb5e52;
    cursor: pointer;
    color: white;
  }
`;
export const Div = styled.div`
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  text-align: center;
  border-radius: 10px;
`;
export const FormTitle = styled.h1`
  font-weight: 500;
  font-size: 3rem;
`;
export const DownloadText = styled.p`
  border: 0;
  display: block;
  margin: 20px auto;
  width: 65%;
  font-size: 1.6rem;
  color: grey;
`;
const BigX = styled.big`
  margin-left: 490px;
  font-size: 2.5rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
const BigContinue = styled.big`
  font-weight: bold;
  color: black;
`;

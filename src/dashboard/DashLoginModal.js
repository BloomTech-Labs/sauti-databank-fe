import React, { useEffect } from "react";
import { urlPageView } from "./GoogleAnalytics/index";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import DashLogin from "./DashLogin";

import { ModalButtons } from "./styledComponents/Index";
import styled from "styled-components";

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

const ModalButton = styled.button`
  font-size: 1.6rem;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 2%;
  transition: 0.5s ease;
  width: 400px;
  margin: 0 auto;
  // margin-top: 5%;
  margin-bottom: 5%;
  border: 2px solid #eb5e52;
  color: #eb5e52;
  font-weight: bold;
  &:hover {
    background-color: #eb5e52;
    cursor: pointer;
    color: white;
  }
`;

export default function DashLoginModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // GA
  useEffect(() => {
    if (open === true) {
      return urlPageView("/login");
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ModalButton className="nav-login" type="button" onClick={handleOpen}>
        LOGIN
      </ModalButton>
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
          <DashLogin handleClose={handleClose} />
        </Fade>
      </Modal>
    </div>
  );
}

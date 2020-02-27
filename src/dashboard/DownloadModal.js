import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Link } from "react-router-dom";

import {
  NoAccessText,
  DownloadModalDiv,
  DownloadModalTitle,
  DownloadModalText,
  DownloadModalButtons,
  DownloadModalButtonsX
} from "./styledComponents/Index";

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

export default function DownloadModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseContinue = props => {
    setOpen(false);
  };

  return (
    <div>
      <NoAccessText onClick={handleOpen}>Download⯆</NoAccessText>
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
          <DownloadModalDiv>
            <DownloadModalButtonsX onClick={handleClose}>
              X
            </DownloadModalButtonsX>
            <DownloadModalTitle>
              You do not have access to this feature.
            </DownloadModalTitle>
            <DownloadModalText>
              If you would like to learn more about signing up or upgrading your
              account to access premium features, click the CONTINUE button
              below.
            </DownloadModalText>
            <br />
            <br />
            <br />
            <DownloadModalButtons onClick={handleCloseContinue}>
              Continue
            </DownloadModalButtons>
          </DownloadModalDiv>
        </Fade>
      </Modal>
    </div>
  );
}

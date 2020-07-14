import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Link } from "react-router-dom";
import Download from "./Download";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from "@material-ui/icons/GetApp";

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
  },
  socialMediaLink: {
    fontSize: "2.5rem",
    color: "rgb(159, 28, 15)",
    cursor: "pointer",
    opacity: "0.75",
    "&:hover": {
      opacity: 1
    }
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

  return (
    <div>
      <div onClick={handleOpen}>
        <Tooltip
          title="Download"
          arrow
          classes={{ tooltip: classes.customWidth }}
        >
          <GetAppIcon className={classes.socialMediaLink}></GetAppIcon>
        </Tooltip>
      </div>
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
          <Download handleClose={handleClose} />
        </Fade>
      </Modal>
    </div>
  );
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Link } from "react-router-dom";
import Download from "./Download";

import styled from "styled-components";

const DateContainer = styled.div`
  margin: 20px 0;
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    input {
      font-family: "Helvetica", sans-serif;
      font-size: 16px;
      margin: 0;
      border-radius: 2px;
      border: 1px solid #ccc;
      padding: 10px;
      ::-webkit-inner-spin-button {
        display: none;
      }
      ::-webkit-clear-button {
        display: none;
      }
      ::-webkit-calendar-picker-indicator {
        opacity: 0.8;
        cursor: pointer;
        color: #999;
      }
    }
  }
`;

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

export default function CalendarModal() {
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

  const [filterBoxStartDate, setFilterBoxStartDate] = useState("2017-01-01");
  const [filterBoxEndDate, setFilterBoxEndDate] = useState("2020-01-08");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div>
        <DateContainer onClick={handleOpen}>
          <div>
            <p>Start</p>
            <input
              name="startData"
              type="date"
              value={filterBoxStartDate}
              disabled={loading}
              placeholder={setFilterBoxStartDate}
            />
          </div>
          <div>
            <p>End</p>
            <input
              disabled={loading}
              name="endData"
              type="date"
              value={filterBoxEndDate}
              id="today"
              placeholder={setFilterBoxEndDate}
            />
          </div>
        </DateContainer>
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

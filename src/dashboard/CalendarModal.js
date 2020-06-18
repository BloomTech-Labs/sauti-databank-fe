import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Download from "./Download";

import useCalendar from "../hooks/useCalendar";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "20px"
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

  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = useCalendar();

  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Grid container onClick={handleOpen}>
        <Grid item xs={6} style={{ fontSize: "12px" }}>
          {/* <form className={classes.container} noValidate> */}
          <TextField
            id="date"
            label="Start"
            type="date"
            defaultValue={filterBoxStartDate}
            value={filterBoxStartDate}
            className={classes.textField}
            onChange={e => setFilterBoxStartDate(e.target.value)}
            InputLabelProps={{
              // shrink: true

              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End"
            type="date"
            name="endData"
            value={filterBoxEndDate}
            id="today"
            defaultValue={filterBoxEndDate}
            className={classes.textField}
            onChange={e => setFilterBoxEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
          />
        </Grid>
      </Grid>
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

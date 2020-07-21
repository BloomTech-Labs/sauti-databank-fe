import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// import {useDispatch} from 'react-redux'
// import {applyAction} from '../redux-actions/applyAction'

const Apply = ({ handleApply }) => {
  const classes = useStyles();
  //const dispatch = useDispatch()

  // function handleApply(e){
  // e.preventDefault()
  // dispatch(applyAction())
  // }
  return (
    <>
      <Grid item xs={6}>
        <button className={classes.applyButton} onClick={handleApply}>
          Apply
        </button>
      </Grid>
    </>
  );
};
export default Apply;

const useStyles = makeStyles(theme => ({
  applyButton: {
    border: "2px solid #9F1C0F",
    backgroundColor: "#9F1C0F",
    color: "#FFF",
    height: "3rem",
    fontWeight: "500",
    fontSize: "1.5rem",
    padding: "0% 12%",
    borderRadius: ".5rem",
    cursor: "pointer",
    float: "right"
  }
}));

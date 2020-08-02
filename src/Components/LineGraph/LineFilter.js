import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const LineFilter = () => {
  const classes = useStyles();
  const lineReducer = useSelector(state => state.lineReducer.lineBoxes);

  const {
    checkboxes,
    handleReset,
    checkedItems,
    setCheckedItems
  } = lineReducer;
  const open = useSelector(
    state => state.compareSubSamplesReducer.compareSub.open
  );

  function handleChange(event) {
    let selected = event.target.name;
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
    setState(checkedItems);
  }

  const [state, setState] = useState(checkedItems);

  useEffect(() => {
    setState(checkedItems);
  }, [checkedItems]);

  let boxes = [];
  if (checkboxes && state) {
    for (let i = 0; i < checkboxes.length; i++) {
      let check = state[checkboxes[i].name];
      boxes.push(
        <FormControlLabel
          control={
            <Checkbox
              checked={check ? check : false}
              key={checkboxes[i].key}
              name={checkboxes[i].name}
              onClick={handleChange}
            />
          }
          label={checkboxes[i].name}
        />
      );
    }
  } else {
    console.log("");
  }

  if (open === "line" && state) {
    return (
      <>
        <FormGroup row>{boxes}</FormGroup>
      </>
    );
  } else {
    return <></>;
  }
};
export default LineFilter;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  filterButton: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    height: "5vh",
    padding: "1%",
    fontFamily: "Roboto"
  },
  h1: {
    fontSize: "1.2rem",
    fontWeight: 800,
    padding: "3%",
    height: "50px",
    textAlign: "left",
    fontWeight: "800"
  }
}));

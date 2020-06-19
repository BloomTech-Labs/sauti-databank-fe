import React, { useState } from "react";
import CalendarParent from "../../dashboard/CalendarParent";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles, styled } from "@material-ui/core/styles";
import "../scss/dataSeries.scss";

const CalendarFilter = () => {
  const reducerCal = useSelector(state => state.calendarReducer.calendar);
  console.log(reducerCal);
  const [openCal, setOpenCal] = useState(false);
  const classes = useStyles();
  const {
    tier,
    newSub,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeQuarter,
    getCurrentYear,
    changeYear,
    loading,
    open
  } = reducerCal;
  if (open === "bar" && openCal === false) {
    return (
      <Grid item className={classes.calendar} onClick={() => setOpenCal(true)}>
        <h1 className={classes.h1}>Calendar</h1>
        {/* <i className="arrow down"></i> */}
      </Grid>
    );
  } else if (open === "bar" && openCal === true) {
    return (
      <>
        <Grid
          item
          onClick={() => setOpenCal(false)}
          className={classes.calendar}
        >
          <h1 className={classes.h1}>Calendar</h1>
          {/* <i className="arrow down"></i> */}
        </Grid>
        <CalendarParent
          tier={tier}
          newSub={newSub}
          filterBoxStartDate={filterBoxStartDate}
          setFilterBoxStartDate={setFilterBoxStartDate}
          filterBoxEndDate={filterBoxEndDate}
          setFilterBoxEndDate={setFilterBoxEndDate}
          changeYear={changeYear}
          changeQuarter={changeQuarter}
          getCurrentYear={getCurrentYear}
          changeYear={changeYear}
          changeQuarter={changeQuarter}
          getCurrentYear={getCurrentYear}
          loading={loading}
          open={open}
        />
      </>
    );
  } else {
    return <></>;
  }
};
export default CalendarFilter;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  calendar: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    fontFamily: "Montserrat, sans-serif",
    background: "rgb(245, 245, 245)",
    height: "4vh",
    padding: "1%",
    display: "flex"
  },
  h1: {
    fontFamily: "Roboto",
    fontSize: "1.2rem",
    fontWeight: 600,
    padding: "3%",
    height: "50px",
    textAlign: "left",
    fontWeight: "800"
  },
  arrow: {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",

    transform: "rotate(45deg)",
    webkitTransform: "rotate(45deg)"
  }
}));

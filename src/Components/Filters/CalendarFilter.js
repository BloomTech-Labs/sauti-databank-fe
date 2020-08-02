import React, { useState } from "react";
import CalendarParent from "../../dashboard/CalendarParent";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles, styled } from "@material-ui/core/styles";
import "../scss/dataSeries.scss";
import { Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const CalendarFilter = () => {
  const reducerCal = useSelector(state => state.calendarReducer.calendar);

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
        <Box display="flex" height="100%" alignItems="center">
          <div className={classes.filterText}>
            <span className={classes.filterName}>Date Range</span>
            <ExpandMoreIcon className={classes.filterArrow}></ExpandMoreIcon>
          </div>
        </Box>
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
          <Box display="flex" height="100%" alignItems="center">
            <div className={classes.filterText}>
              <span className={classes.filterName}>Date Range</span>
              <ExpandLessIcon className={classes.filterArrow}></ExpandLessIcon>
            </div>
          </Box>
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
    height: "50px",
    padding: "1%",
    fontFamily: "Roboto",
    borderBottom: "1px rgba(0, 0, 0, 0.1) solid",
    fontSize: "1.5rem",
    cursor: "pointer"
  },
  filterName: {
    fontWeight: "500"
  },
  arrow: {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(45deg)",
    webkitTransform: "rotate(45deg)"
  },
  filterArrow: {
    float: "right",
    marginRight: "1rem",
    fontSize: "2rem",
    color: "#8c8c8c"
  },
  filterText: {
    width: "100%"
  }
}));

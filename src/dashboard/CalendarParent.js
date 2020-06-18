import React from "react";
import styled from "styled-components";
import CalendarModal from "./CalendarModal";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CalendarParent = ({
  tier,
  newSub,
  filterBoxStartDate,
  setFilterBoxStartDate,
  filterBoxEndDate,
  setFilterBoxEndDate,
  changeYear,
  changeQuarter,
  getCurrentYear,
  loading,
  open
}) => {
  const classes = useStyles();
  if (open === "bar") {
    return (
      <>
        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <Grid container>
            <Grid container>
              <Grid item xs={6} style={{ fontSize: "12px" }}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Start"
                    type="date"
                    defaultValue={filterBoxStartDate}
                    value={filterBoxStartDate}
                    className={classes.textField}
                    onChange={e => setFilterBoxStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                {/* <p>Start</p>
                <input
                  name="startData"
                  type="date"
                  value={filterBoxStartDate}
                  disabled={loading}
                  onChange={e => setFilterBoxStartDate(e.target.value)}
                /> */}
              </Grid>
              <Grid item xs={6} style={{ fontSize: "12px" }}>
                <p>End</p>
                <input
                  disabled={loading}
                  name="endData"
                  type="date"
                  value={filterBoxEndDate}
                  id="today"
                  onChange={e => setFilterBoxEndDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container>
              <MonthButtons onClick={changeQuarter("Q1")}>Q1</MonthButtons>
              <MonthButtons onClick={changeQuarter("Q2")}>Q2</MonthButtons>
              <MonthButtons onClick={changeQuarter("Q3")}>Q3</MonthButtons>
              <MonthButtons onClick={changeQuarter("Q4")}>Q4</MonthButtons>
              <YearButtons
                onClick={changeYear((getCurrentYear() - 3).toString())}
              >
                {(getCurrentYear() - 3).toString()}
              </YearButtons>
              <YearButtons
                onClick={changeYear((getCurrentYear() - 2).toString())}
              >
                {(getCurrentYear() - 2).toString()}
              </YearButtons>
              <YearButtons
                onClick={changeYear((getCurrentYear() - 1).toString())}
              >
                {(getCurrentYear() - 1).toString()}
              </YearButtons>
              <YearButtons onClick={changeYear(getCurrentYear().toString())}>
                {getCurrentYear().toString()}
              </YearButtons>
            </Grid>
          </Grid>
        ) : (
          <CalendarModal />
        )}
      </>
    );
  } else {
    return <></>;
  }
};
export default CalendarParent;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const DateContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  input {
    font-family: "Helvetica", sans-serif;
    font-size: 14px;
    margin: 0;
    border-radius: 2px;
    border: 1px solid #ccc;
    padding: 10px 8px;
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
`;
const StartEndContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const YearPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;
const YearButtons = styled.button`
  padding: 5px;
  width: 25%;
  background-color: grey;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  border: 0.5px solid darkgrey;
  border-radius: 5px;
  opacity: 0.75;
  &:hover {
    opacity: 1
    cursor: pointer;
  }
`;
const MonthButtons = styled.button`
  padding: 5px;
  width: 25%;
  margin: 2% 0;
  background-color: silver;
  color: #212121;
  font-size: 1rem;
  font-weight: bold;
  border: 0.5px solid darkgrey;
  border-radius: 5px;
  opacity: 0.75;
  &:hover {
    opacity: 1
    cursor: pointer;
  }
`;

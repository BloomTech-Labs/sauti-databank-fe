import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const ClearFilters = () => {
  const clearReducer = useSelector(state => state.clearReducer.clear);
  const classes = useStyles();
  const {
    setFilters,
    setFilterBoxStartDate,
    setFilterBoxEndDate,
    setUpdateUrlFlag,
    filters,
    getTodaysDate,
    updateUrlFlag
  } = clearReducer;
  return (
    <>
      <Grid
        item
        xs={6}
        onClick={e => {
          setFilters({
            0: {
              ...filters[0],
              nameOfFilter: "Data Series",
              selectableOptions: {}
            },
            1: {
              nameOfFilter: "Compare SubSamples",
              selectedCategory: "",
              selectableOptions: {},
              selectedTable: "Users",
              selectedTableColumnName: "",
              showOptions: false,
              optionHasBeenSelected: false
            },
            2: {
              nameOfFilter: "Data Filter",
              selectedCategory: "",
              selectableOptions: {},
              selectedTable: "",
              selectedTableColumnName: "",
              showOptions: true,
              optionHasBeenSelected: false
            }
          });
          setFilterBoxStartDate("2017-01-01");
          setFilterBoxEndDate(getTodaysDate());
          setUpdateUrlFlag(!updateUrlFlag);
        }}
      >
        <button className={classes.clearButton}>Clear All</button>
      </Grid>
    </>
  );
};
export default ClearFilters;

const useStyles = makeStyles(theme => ({
  clearButton: {
    border: "2px solid #9F1C0F",
    backgroundColor: "#FFF",
    color: "#9F1C0F",
    height: "3rem",
    fontWeight: "500",
    fontSize: "1.5rem",
    padding: "0% 12%",
    borderRadius: ".5rem",
    cursor: "pointer"
  }
}));

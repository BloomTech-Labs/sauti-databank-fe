import React, { useState, useRef, useEffect } from "react";
import graphLabels from "../graphLabels";

import RenderCheckContainer from "./RenderCheckContainer";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ordered from "../orderedGraphLabels";

const AddFilter = ({
  filters,
  setFilters,
  index,
  FilterBoxOptions,
  CategoryOptions,
  setUpdateUrlFlag,
  updateUrlFlag,
  displayDrop,
  setDisplayDrop
}) => {
  const classes = useStyles();

  const changeOption = e => {
    setUpdateUrlFlag(!updateUrlFlag);
    let optionFlags = {};
    graphLabels[
      `${FilterBoxOptions.default[e.target.value].value.type}`
    ].labels.forEach(option => {
      optionFlags = {
        ...optionFlags,
        [option]: false
      };
    });
    setFilters({
      ...filters,
      [index]: {
        ...filters[index],
        selectedCategory: e.target.value, //option
        selectedTableColumnName:
          FilterBoxOptions.default[e.target.value].value.type,

        selectedTable: FilterBoxOptions.default[e.target.value].value.query,
        selectedOption: undefined,
        selectableOptions: { ...optionFlags },
        showOptions: true
      }
    });
  };

  let allSelectableOptions = Object.keys(FilterBoxOptions.default);
  allSelectableOptions.unshift("KEY DEMOGRAPHICS");

  const allItems = [];
  for (let key in FilterBoxOptions.default) {
    allItems.push([key, FilterBoxOptions.default[key].value.type]);
  }
  const displayDropOptions = () => {
    if (displayDrop.includes(index)) {
      return (
        <Grid container xs={12}>
          <Grid
            item
            xs={12}
            onClick={() => setDisplayDrop([])}
            className={classes.filterButton}
          >
            <h1 className={classes.h1}>Add Filter</h1>
            {/* <i className="arrow down"></i> */}
          </Grid>

          <Grid container xs={12} style={{ flexDirection: "column" }}>
            {ordered.map(e => {
              if (
                e === "KEY DEMOGRAPHICS" ||
                e === "INFORMATION DEMAND" ||
                e === "BUSINESS BEHAVIOUR"
              ) {
                return <p className={classes.super}>{e}</p>;
              } else {
                return (
                  <>
                    <TextField
                      className="selectable"
                      value={e}
                      onClick={changeOption}
                    >
                      {e}
                    </TextField>

                    <RenderCheckContainer
                      i={index}
                      itemName={e}
                      filters={filters}
                      graphLabels={graphLabels}
                      setFilters={setFilters}
                      setUpdateUrlFlag={setUpdateUrlFlag}
                      updateUrlFlag={updateUrlFlag}
                      FilterBoxOptions={FilterBoxOptions}
                      setDisplayDrop={setDisplayDrop}
                    />
                  </>
                );
              }
            })}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <>
          <Grid
            item
            xs={12}
            onClick={() => setDisplayDrop(...displayDrop, index)}
            className={classes.filterButton}
          >
            <h1 className={classes.h1}>
              Add Filter : {filters[index].selectedCategory}
            </h1>
          </Grid>
        </>
      );
    }
  };
  return <>{displayDropOptions()}</>;
};

export default AddFilter;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  supercat: {
    padding: theme.spacing(0.2),
    opacity: 1,
    fontSize: "1.5rem",
    textOverflow: "ellipsis",
    height: "20px",
    fontFamily: "sans-serif",
    "&:hover, &:focus": {
      background: "rgba(0, 0, 0, 0.5)",
      opacity: 1
    }
  },
  filterButton: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    background: "rgb(245, 245, 245)",
    height: "5vh",
    padding: "1%"
  },
  h1: {
    fontFamily: "Roboto",
    fontSize: "1.2rem",
    padding: "3%",
    height: "50px",
    textAlign: "left",
    fontWeight: "800"
  },
  super: {
    textAlign: "center",
    background: "silver",
    fontSize: "1.2rem"
  }
}));

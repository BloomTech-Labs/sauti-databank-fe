import React, { useEffect, useState } from "react";
import graphLabels from "../graphLabels";
import { useSelector } from "react-redux";
import "../../Components/scss/dataSeries.scss";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ordered from "../orderedGraphLabels";

const CompareSubSamples = () => {
  const reducerSub = useSelector(
    state => state.compareSubSamplesReducer.compareSub
  );

  const {
    filterSelectorName,
    filters,
    setFilters,
    ControlComponent,
    index,
    formatGroupLabel,
    setUpdateUrlFlag,
    FilterBoxOptions,
    updateUrlFlag,
    xVar,
    colourStyles,
    open
  } = reducerSub;
  const classes = useStyles();
  function changeOption(e) {
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
        selectableOptions: { ...optionFlags }
      }
    });
  }

  const [displayDrop, setDisplayDrop] = useState(false);

  if (filterSelectorName === "Compare SubSamples" && open === "bar") {
    let allSelectableOptions = Object.keys(FilterBoxOptions.default);

    const displayDropOptions = () => {
      if (displayDrop === true) {
        return (
          <>
            <Grid item xs={12} className={classes.filterButton}>
              <h1 className={classes.h1}>Compare SubSamples</h1>
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
                    <TextField
                      className="selectable"
                      value={e}
                      onClick={changeOption}
                    >
                      {e}
                    </TextField>
                  );
                }
              })}
            </Grid>
          </>
        );
      } else {
        return (
          <>
            <Grid item xs={12} className={classes.filterButton}>
              <h1 className={classes.h1}>
                Compare SubSamples {filters[1].selectedCategory}
              </h1>
            </Grid>
          </>
        );
      }
    };
    return (
      <Grid container onClick={() => setDisplayDrop(!displayDrop)}>
        {displayDropOptions()}
      </Grid>
    );
  } else {
    return <></>;
  }
};
export default CompareSubSamples;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  filterButtonF: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    background: "rgb(245, 245, 245)",
    height: "5vh",
    padding: "1%",
    fontFamily: "Roboto",
    display: "flex"
  },
  filterButton: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    background: "rgb(245, 245, 245)",
    height: "5vh",
    padding: "1%",
    fontFamily: "Roboto"
  },
  h1: {
    fontSize: "1.2rem",
    fontWeight: 600,
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

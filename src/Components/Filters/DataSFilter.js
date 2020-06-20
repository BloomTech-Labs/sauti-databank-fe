import React, { useState } from "react";
import graphLabels from "../graphLabels";
import "../../Components/scss/dataSeries.scss";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const DataSFilter = ({
  filters,
  setFilters,
  index,
  setUpdateUrlFlag,
  FilterBoxOptions,
  updateUrlFlag,
  xVar
}) => {
  const [displayDrop, setDisplayDrop] = useState(false);

  let allSelectableOptions = Object.keys(FilterBoxOptions.default);
  const classes = useStyles();
  allSelectableOptions.unshift("KEY DEMOGRAPHICS");

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

  const displayDropOptions = () => {
    if (displayDrop === true) {
      return (
        <>
          <Grid item xs={12} className={classes.filterButton}>
            <p className={classes.h1}>Data Series</p>
          </Grid>

          {allSelectableOptions.map(e => {
            if (e === "Most Requested Procedure Commodities") {
              return (
                <>
                  {/* <h1>'INFORMATION DEMAND'</h1> */}
                  <TextField
                    className="selectable"
                    value={e}
                    onClick={changeOption}
                  >
                    {e}
                  </TextField>
                </>
              );
            } else if (e === "Exchange Rate Direction") {
              return (
                <>
                  {/* <h1>'BUSINESS BEHAVIOR'</h1> */}
                  <TextField
                    className="selectable"
                    value={e}
                    onClick={changeOption}
                  >
                    {e}
                  </TextField>
                </>
              );
            } else {
              return (
                <TextField
                  style={{ minWidth: "100%" }}
                  className="selectable"
                  value={e}
                  onClick={changeOption}
                >
                  {e}
                </TextField>
              );
            }
          })}
        </>
      );
    } else {
      return (
        <Grid item xs={12} className={classes.filterButton}>
          <p className={classes.h1}>
            Data Series : {filters[0].selectedCategory}
          </p>
        </Grid>
      );
    }
  };

  return (
    <Grid container onClick={() => setDisplayDrop(!displayDrop)}>
      {displayDropOptions()}
    </Grid>
  );
};
export default DataSFilter;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  filterButtonF: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    background: "rgb(245, 245, 245)",
    height: "5vh",
    marginTop: "2%",
    // padding: "1%",
    fontFamily: "Roboto",
    display: "flex",

    border: "1px solid black"
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
    fontWeight: 800,
    padding: "3%",
    height: "50px",
    textAlign: "left",
    fontWeight: "800"
  },
  field: {
    // fontSize: "1.2rem",
    fontWeight: 600,
    padding: "3%",
    height: "50px",
    textAlign: "right",
    fontWeight: "800"
  }
}));

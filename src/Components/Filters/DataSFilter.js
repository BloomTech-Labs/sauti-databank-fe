import React, { useState } from "react";
import graphLabels from "../graphLabels";
import "../../Components/scss/dataSeries.scss";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
            <h1 className={classes.h1}>Data Series</h1>
            {/* <i className="arrow down"></i> */}
          </Grid>

          <Grid item xs={12}>
            {allSelectableOptions.map(e => {
              if (e === "Most Requested Procedure Commodities") {
                return (
                  <>
                    <h1>'INFORMATION DEMAND'</h1>
                    <option
                      className="selectable"
                      value={e}
                      onClick={changeOption}
                    >
                      {e}
                    </option>
                  </>
                );
              } else if (e === "Exchange Rate Direction") {
                return (
                  <>
                    <h1>'BUSINESS BEHAVIOR'</h1>
                    <option
                      className="selectable"
                      value={e}
                      onClick={changeOption}
                    >
                      {e}
                    </option>
                  </>
                );
              } else {
                return (
                  <option
                    className="selectable"
                    value={e}
                    onClick={changeOption}
                  >
                    {e}
                  </option>
                );
              }
            })}
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid container xs={12} className={classes.filterButtonF}>
            <Grid item xs={4} className={classes.h1}>
              Data Series
            </Grid>
            <Grid item item xs={8} className={classes.h1}>
              : {filters[0].selectedCategory}
            </Grid>
            {/* <i className="arrow down"></i> */}
          </Grid>
        </>
      );
    }
  };

  return (
    <div onClick={() => setDisplayDrop(!displayDrop)}>
      {displayDropOptions()}
    </div>
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
    height: "4vh",
    marginTop: "2%",
    padding: "1%",
    fontFamily: "Roboto",
    display: "flex"
  },
  filterButton: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    background: "rgb(245, 245, 245)",
    height: "4vh",
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
  field: {
    fontSize: "1.2rem",
    fontWeight: 600,
    padding: "3%",
    height: "50px",
    textAlign: "right",
    fontWeight: "800"
  }
}));

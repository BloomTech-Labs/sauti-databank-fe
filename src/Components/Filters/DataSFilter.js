import React, { useState, useEffect } from "react";
import graphLabels from "../graphLabels";
import "../../Components/scss/dataSeries.scss";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ordered, demographics } from "../orderedGraphLabels";
import SeriesFilterModal from "./SeriesFilterModal";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const DataSFilter = ({
  filters,
  setFilters,
  index,
  setUpdateUrlFlag,
  FilterBoxOptions,
  updateUrlFlag,
  tier
}) => {
  const [displayDrop, setDisplayDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    console.log("useEffect", access, tier);
    if (
      tier !== undefined &&
      (tier === "ADMIN" || tier === "PAID" || tier === "GOV_ROLE")
    ) {
      setAccess(true);
    }
  }, [tier]);

  const handleClose = () => {
    setOpen(false);
  };

  // let allSelectableOptions = Object.keys(FilterBoxOptions.default);
  const classes = useStyles();

  function changeOption(e) {
    if (access) {
      console.log("changeOption");
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
    } else if (!access && demographics.includes(e.target.value)) {
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
    } else {
      setOpen(true);
    }
  }

  const displayDropOptions = () => {
    if (displayDrop === true && open === false) {
      return (
        <>
          <Grid item xs={12} className={classes.filterButton}>
            <span className={classes.filterName}> Data Series</span>
          </Grid>
          <Grid container xs={12} style={{ flexDirection: "column" }}>
            {ordered.map(e => {
              if (
                e === "KEY DEMOGRAPHICS" ||
                e === "INFORMATION DEMAND" ||
                e === "BUSINESS BEHAVIOUR"
              ) {
                return <p className={classes.super}>{e}</p>;
              } else if (demographics.includes(e)) {
                return (
                  <TextField
                    className={"selectable"}
                    value={e}
                    onClick={changeOption}
                  >
                    {e}
                  </TextField>
                );
              } else {
                return (
                  <TextField
                    className={access ? "selectable" : "limited"}
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
    } else if (displayDrop === false && open === false) {
      return (
        <Grid item xs={12} className={classes.filterButton}>
          <span className={classes.filterName}> Data Series</span> -{" "}
          <span className={classes.chosen}>{filters[0].selectedCategory}</span>
        </Grid>
      );
    } else {
      return (
        <>
          <Grid item xs={12} className={classes.filterButton}>
            <span className={classes.filterName}> Data Series</span>
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
                    className={access ? "selectable" : "limited"}
                    value={e}
                    onClick={changeOption}
                  >
                    {e}
                  </TextField>
                );
              }
            })}
          </Grid>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <SeriesFilterModal handleClose={handleClose} />
            </Fade>
          </Modal>
        </>
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
  filterButton: {
    padding: theme.spacing(0),
    background: "rgb(245, 245, 245)",
    height: "50px",
    padding: "1%",
    fontFamily: "Roboto",
    borderBottom: "1px rgba(0, 0, 0, 0.1) solid",
    fontSize: "1.5rem"
  },
  filterName: {
    fontWeight: "500"
  },
  chosen: {
    fontStyle: "italic"
  },
  super: {
    textAlign: "center",
    background: "silver",
    fontSize: "1.2rem"
  }
}));

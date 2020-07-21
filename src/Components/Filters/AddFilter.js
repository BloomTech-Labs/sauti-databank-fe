import React, { useState, useRef, useEffect } from "react";
import graphLabels from "../graphLabels";

import RenderCheckContainer from "./RenderCheckContainer";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { ordered } from "../orderedGraphLabels";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Box } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { scrollPosition } from "../redux-actions/scrollAction";

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
  // scrollTopVar,
  // setScrollTopVar
}) => {
  const classes = useStyles();
  //after click on scroll, should reload to scroll position
  //const [scrollTop, setScrollTop] = useState(document.body.scrollTop);
  const innerRef = useRef(null);
  const [scrollTopVar, setScrollTopVar] = useState();
  const dispatch = useDispatch();
  const scrollY = useSelector(state => state.scrollReducer.scrollPos);

  useEffect(() => {
    const div = innerRef.current;
    if (div != null) {
      div.addEventListener("scroll", handleScroll);
      return () => {
        div.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = e => {
    //maybe better way to save this, when stop scroll
    setScrollTopVar(e.target.scrollTop);
  };

  useEffect(() => {
    if (document.getElementById("scroll")) {
      let scrollBar = document.getElementById("scroll");
      scrollBar.scrollTop = scrollY.position;
    }
  }, document);

  const changeOption = e => {
    dispatch(scrollPosition({ position: scrollTopVar }));
    const selectedName = e.target.dataset.selectvalue;
    setUpdateUrlFlag(!updateUrlFlag);
    let optionFlags = {};
    graphLabels[
      `${FilterBoxOptions.default[selectedName].value.type}`
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
        selectedCategory: selectedName, //option
        selectedTableColumnName:
          FilterBoxOptions.default[selectedName].value.type,

        selectedTable: FilterBoxOptions.default[selectedName].value.query,
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
            <Box display="flex" height="100%" alignItems="center">
              <div className={classes.filterText}>
                <span className={classes.filterName}> Filter</span>
              </div>
              <ExpandLessIcon className={classes.filterArrow}></ExpandLessIcon>
            </Box>
          </Grid>

          <Grid
            container
            xs={12}
            className={classes.optionsContainer}
            ref={innerRef}
            id="scroll"
          >
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
                    <span
                      className="selectable"
                      data-selectvalue={e}
                      onClick={changeOption}
                    >
                      {e}
                    </span>
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
            <Box display="flex" height="100%" alignItems="center">
              <div className={classes.filterText}>
                <span className={classes.filterName}> Filter</span> -
                <span className={classes.chosen}>
                  {filters[index].selectedCategory}
                </span>
              </div>
              <ExpandMoreIcon className={classes.filterArrow}></ExpandMoreIcon>
            </Box>
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
  optionsContainer: {
    flexDirection: "column",
    maxHeight: "200px",
    overflowY: "scroll",
    overflowX: "none",
    display: "inline-grid",
    //style scrollbar
    "&::-webkit-scrollbar": {
      width: "1em",
      backgroundColor: "lightgray"
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#9F1C0F",
      outline: "1px solid slategrey",
      borderRadius: "5px"
    }
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
    background: "rgb(245, 245, 245)",
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
  chosen: {
    fontStyle: "italic"
  },
  super: {
    background: "#f5f5f5",
    color: "#8c8c8c",
    fontSize: "1.4rem",
    padding: "1rem 0.5rem"
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

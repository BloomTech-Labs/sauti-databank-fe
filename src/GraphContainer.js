import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import FilterBox from "./Components/Filters/FilterBox";
import SelectedFilterDisplay from "./Components/SelectedFilterDisplay";
import "react-dropdown/style.css";

import Queries2 from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
import swal from "sweetalert";
import ClipboardJS from "clipboard";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GraphButtons from "./Components/GraphButtons";
import SocialMedia from "./Components/SocialMedia";

import CompareSubSamples from "./Components/Filters/CompareSubsamples";
import CalendarFilter from "./Components/Filters/CalendarFilter";
import ClearFilters from "./Components/Filters/ClearFilters";
import Apply from "./Components/Filters/Apply";
import LineFilter from "./Components/LineGraph/LineFilter";

import { Box } from "@material-ui/core";
import splashImage from "./assets/images/sautilogo-xhires.png";

import { dispatch, useDispatch } from "react-redux";
import { queriesFilters } from "./Components/redux-actions/queriesAction";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  h1: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "18px",
    fontWeight: 400,
    color: "#ffffff",
    width: "100%",
    padding: "0.5%"
  },
  titleContainer: {
    background: "#2c2e32",
    height: "50px",
    textAlign: "center"
  },
  filters: {
    //padding: "2rem"
    paddingLeft: "1%",
    flexDirection: "column"
  },
  clearApply: {
    // alignItems: "space-between"
  },
  watermark: {
    backgroundImage: `url(${splashImage})`,
    backgroundSize: "10%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  whitebg: {
    backgroundColor: "white"
  }
}));

const GraphContainer = props => {
  const [url, setUrl] = useState("");
  const [filters, setFilters] = useState(props.filters);
  const [queryType, setQueryType] = useState("");
  const [chartDataSM, setChartDataSM] = useState([]);

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeYear,
    changeQuarter,
    getCurrentYear
  } = useCalendar();

  // //hides control panel
  // const [hidden, setHidden] = useState(false);

  // function HideFilters() {
  //   setHidden(!hidden);
  // }
  //keys used for socialmedia
  const [keys, setKeys] = useState([]);

  //displays graph selected
  const [open, setOpen] = useState("bar");
  const [displayButton, setDisplayButton] = useState([]);
  const chartData = {};
  const clipboard = new ClipboardJS(".btn", {
    text: function() {
      return document.location.href;
    }
  });
  clipboard.on("success", function(e) {
    swal({ title: "", text: "copied url!", icon: "success" });
  });
  // ?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeeklyzazfilter3equalscountry_of_residencecommaKENzazfilter4equalsundefinedcommaundefined

  function handleApply() {
    dispatch(
      queriesFilters({
        filters: filters,
        setFilters: setFilters,
        filterBoxStartDate: filterBoxStartDate,
        setFilterBoxStartDate: setFilterBoxStartDate,
        filterBoxEndDate: filterBoxEndDate,
        setFilterBoxEndDate: setFilterBoxEndDate,
        changeYear: changeYear,
        changeQuarter: changeQuarter,
        getCurrentYear: getCurrentYear,
        open: open
      })
    );
  }

  return (
    <>
      <CssBaseline />
      <Grid container maxWidth="xl">
        <Grid container maxWidth="xl">
          <Grid container xs={12} style={{ height: "50px" }}>
            <Grid item xs={3} className={classes.titleContainer}>
              <Box display="flex" height="100%" alignItems="center">
                <h1 className={classes.h1}>Cross-Border Trade DataBank</h1>
              </Box>
            </Grid>
            <Grid
              item
              xs={9}
              style={{
                height: "50px"
              }}
              className={classes.whitebg}
            >
              <SelectedFilterDisplay filters={filters} />
            </Grid>
          </Grid>
          <Grid xs={3}></Grid>
          <Grid
            container
            xs={12}
            style={{ height: "30px" }}
            className={classes.whitebg}
          >
            <Grid xs={3}>
              <Grid
                container
                spacing={2}
                style={{ height: "30px", padding: "2%" }}
              >
                <ClearFilters />

                <Apply handleApply={handleApply} />
              </Grid>
            </Grid>
            <Grid container xs={3} spacing={1} style={{ height: "30px" }}>
              <GraphButtons
                open={open}
                setOpen={setOpen}
                filters={filters}
                setDisplayButton={setDisplayButton}
                displayButton={displayButton}
                queryType={queryType}
              />
            </Grid>
            <Grid container xs={4}></Grid>
            <Grid container xs={2} spacing={1} style={{ height: "30px" }}>
              <SocialMedia
                filters={filters}
                queryType={queryType}
                filterBoxStartDate={filterBoxStartDate}
                filterBoxEndDate={filterBoxEndDate}
                csvData={chartDataSM.dataStructure}
                keys={chartDataSM.crossFilterValues}
                sampleSize={chartDataSM.totalSampleSize}
              />
            </Grid>
          </Grid>
          <Grid container maxWidth="xl" className={classes.whitebg}>
            <Grid container xs={3} className={classes.filters}>
              <Grid
                container
                style={{ flexDirection: "column", paddingTop: "5%" }}
              >
                <FilterBox
                  filters={filters}
                  setFilters={setFilters}
                  filterBoxStartDate={filterBoxStartDate}
                  setFilterBoxStartDate={setFilterBoxStartDate}
                  filterBoxEndDate={filterBoxEndDate}
                  setFilterBoxEndDate={setFilterBoxEndDate}
                  changeYear={changeYear}
                  changeQuarter={changeQuarter}
                  getCurrentYear={getCurrentYear}
                  open={open}
                />
              </Grid>

              <Grid container>
                <CompareSubSamples />
              </Grid>

              <Grid item className={classes.filters}>
                <CalendarFilter />
              </Grid>
              <Grid item className={classes.filters}>
                <LineFilter />
              </Grid>
            </Grid>
            <Grid item xs={9} className={classes.watermark}>
              <Queries2
                filters={filters}
                setFilters={setFilters}
                filterBoxStartDate={filterBoxStartDate}
                setFilterBoxStartDate={setFilterBoxStartDate}
                filterBoxEndDate={filterBoxEndDate}
                setFilterBoxEndDate={setFilterBoxEndDate}
                open={open}
                setOpen={setOpen}
                setDisplayButton={setDisplayButton}
                displayButton={displayButton}
                queryType={queryType}
                setQueryType={setQueryType}
                setChartDataSM={setChartDataSM}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphContainer;

const FilterHideButton = styled.button`
  padding: 3.5px 5px;
  background: #2c2e32;
  font-weight: 400;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1.4rem;
  height: 30px;
  opacity: 0.75;
  border: none;
  position: absolute;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
  p {
    height: 24px;
  }
`;
const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 1px;
  padding: 5px;
  margin-bottom: 5px;
`;
const SocialMediaIconsTwitter = styled.a`
  font-size: 2.5rem;
  margin: 0 10px;
  color: rgb(0, 172, 238);
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;
const SocialMediaIconsFacebook = styled.a`
  font-size: 2.5rem;
  margin: 0 10px;
  color: rgb(59, 89, 152);
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;

const ContentContainerDiv = styled.div`
  // border-right: 1px solid lightgrey;
  margin-right: 2px;
`;

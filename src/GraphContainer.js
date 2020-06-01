import React, { useState } from "react";
import "./App.scss";
import "./index.css";
import FilterBox from "./Components/FilterBox";
import SelectedFilterDisplay from "./Components/SelectedFilterDisplay";
import "react-dropdown/style.css";

import Queries2 from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
import swal from "sweetalert";
import ClipboardJS from "clipboard";

import { Footer } from "./Components/Footer";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
    fontWeight: 600,
    color: "#ffffff",
    marginLeft: "20px",
    alignItems: "center"
  },
  filters: {
    padding: "2rem"
  }
}));

const GraphContainer = props => {
  const [url, setUrl] = useState("");
  const [filters, setFilters] = useState(props.filters);

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

  //hides control panel
  const [hidden, setHidden] = useState(false);

  function HideFilters() {
    console.log("Hide Filters");
    setHidden(!hidden);
  }

  //displays graph selected
  const [open, setOpen] = useState("bar");

  const clipboard = new ClipboardJS(".btn", {
    text: function() {
      return document.location.href;
    }
  });
  clipboard.on("success", function(e) {
    swal({ title: "", text: "copied url!", icon: "success" });
  });
  // ?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeeklyzazfilter3equalscountry_of_residencecommaKENzazfilter4equalsundefinedcommaundefined
  return (
    <>
      <CssBaseline />
      <Grid container maxWidth="xl">
        <Grid container maxWidth="xl">
          <Grid container xs={12} style={{ height: "50px" }}>
            <Grid item xs={3} style={{ background: "#2c2e32", height: "50px" }}>
              <h1 className={classes.h1}>Informal Cross-Border Trade Data</h1>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                background: "white",
                height: "50px",
                alignContent: "center"
              }}
            >
              <SelectedFilterDisplay filters={filters} />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ height: "50px" }}></Grid>
          <Grid container maxWidth="xl">
            <Grid item xs={3} className={classes.filters}>
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
            {/* <Grid item xs={1} className={classes.filterHideButton} onClick={HideFilters}>
            
                {hidden ? <p>►</p> : <p>◄</p>}
             
            </Grid> */}
            <Grid item xs={9} className={hidden ? "extend" : "chart-container"}>
              <Queries2
                filters={filters}
                filterBoxStartDate={filterBoxStartDate}
                setFilterBoxStartDate={setFilterBoxStartDate}
                filterBoxEndDate={filterBoxEndDate}
                setFilterBoxEndDate={setFilterBoxEndDate}
                open={open}
                setOpen={setOpen}
              />
            </Grid>
          </Grid>
        </Grid>
        <Footer />
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

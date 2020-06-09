import React from "react";
import "./scss/graphButtons.scss";
import graphImage from "../assets/images/linegraph.png";
import mapImage from "../assets/images/map.png";
import barImage from "../assets/images/barchart.png";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const GraphButtons = ({ open, setOpen, filters, queryType }) => {
  const lineButton = () => {
    if (open !== "line" && queryType === "sessionsData") {
      return (
        <button className="all-btn" onClick={() => setOpen("line")}>
          <img src={graphImage} />
          <h1>Line Graph</h1>
        </button>
      );
    } else {
      return <></>;
    }
  };

  const barButton = () => {
    if (open !== "bar") {
      return (
        <button className="all-btn" onClick={() => setOpen("bar")}>
          <img src={barImage} />
          <h1>Bar Chart</h1>
        </button>
      );
    } else {
      return <></>;
    }
  };

  const choroButton = () => {
    if (
      open !== "choropleth" &&
      filters[0]["selectedCategory"] === "Country of Residence"
    ) {
      return (
        <button className="all-btn" onClick={() => setOpen("choropleth")}>
          <img src={mapImage} />
          <h1>Map</h1>
        </button>
      );
    } else if (
      open !== "choropleth" &&
      filters[0]["selectedCategory"] === "Final Destination Country"
    ) {
      return (
        <button className="all-btn" onClick={() => setOpen("choropleth")}>
          <img src={mapImage} />
          <h1>Map</h1>
        </button>
      );
    } else if (
      open !== "choropleth" &&
      filters[0]["selectedCategory"] ===
        "Requested Procedures for Destination (Imports to:)"
    ) {
      return (
        <button className="all-btn" onClick={() => setOpen("choropleth")}>
          <img src={mapImage} />
          <h1>Map</h1>
        </button>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Grid item>{barButton()}</Grid>
      <Grid item>{lineButton()}</Grid>
      <Grid item>{choroButton()}</Grid>
    </>
  );
};
export default GraphButtons;

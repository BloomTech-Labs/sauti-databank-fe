import React from "react";
import "./scss/lineGraphButton.scss";
import graphImage from "../assets/images/linegraph.png";
import mapImage from "../assets/images/map.png";
import barImage from "../assets/images/barchart.png";
import Grid from "@material-ui/core/Grid";

const GraphButtons = ({
  open,
  setOpen,
  filters,
  setDisplayButton,
  displayButton,
  queryType
}) => {
  const lineButton = () => {
    return (
      <Grid item xs={3}>
        <button className="line-btn" onClick={() => setOpen("line")}>
          <img src={graphImage} />
          <h1>Line Graph</h1>
        </button>
      </Grid>
    );
  };

  const barButton = () => {
    return (
      <Grid item xs={3}>
        <button className="bar-btn" onClick={() => setOpen("bar")}>
          <img src={barImage} />
          <h1>Bar Chart</h1>
        </button>
      </Grid>
    );
  };

  const choroButton = () => {
    return (
      <Grid item xs={3}>
        <button className="choro-map" onClick={() => setOpen("choropleth")}>
          <img src={mapImage} />
          <h1>Map</h1>
        </button>
      </Grid>
    );
  };

  console.log(queryType);
  if (open !== "line" && queryType === "sessionsData") {
    return <>{lineButton()}</>;
  }

  if (open !== "bar") {
    return <>{barButton()}</>;
  }
  if (
    open !== "choropleth" &&
    filters[0]["selectedCategory"] === "Final Destination Country"
  ) {
    return <>{choroButton()}</>;
  }
  if (
    open !== "choropleth" &&
    filters[0]["selectedCategory"] ===
      "Requested Procedures for Destination (Imports to:)"
  ) {
    return <>{choroButton()}</>;
  }
  if (
    open !== "choropleth" &&
    filters[0]["selectedCategory"] === "Country of Residence"
  ) {
    return <>{choroButton()}</>;
  } else {
    return <></>;
  }
};
export default GraphButtons;

import React from "react";
import "./scss/graphButtons.scss";
import graphImage from "../assets/images/linegraph.png";
import mapImage from "../assets/images/map.png";
import barImage from "../assets/images/barchart.png";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const GraphButtons = ({ open, setOpen, filters, queryType }) => {
  const classes = useStyles();

  const lineButton = () => {
    if (open !== "line" && queryType === "sessionsData") {
      return (
        <div className="all-btn" onClick={() => setOpen("line")}>
          <Tooltip
            title="Line Graph"
            arrow
            classes={{ tooltip: classes.customWidth }}
          >
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 2rem 2rem"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 11.78L20.24 4.45L21.97 5.45L16.74 14.5L10.23 10.75L5.46 19H22V21H2V3H4V17.54L9.5 8L16 11.78Z"
                fill="#9F1C0F"
              />
            </svg>
          </Tooltip>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const barButton = () => {
    if (open !== "bar") {
      return (
        <div className="all-btn" onClick={() => setOpen("bar")}>
          <Tooltip
            title="Bar Chart"
            arrow
            classes={{ tooltip: classes.customWidth }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"
                fill="#9F1C0F"
              />
            </svg>
          </Tooltip>
        </div>
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
        <div className="all-btn" onClick={() => setOpen("choropleth")}>
          <Tooltip title="Map" arrow classes={{ tooltip: classes.customWidth }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.6326 3.05268 20.7598 3.14645 20.8536C3.24021 20.9473 3.36739 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.36739 20.9473 3.24021 20.8536 3.14645C20.7598 3.05268 20.6326 3 20.5 3ZM10 5.47L14 6.87V18.53L10 17.13V5.47ZM5 6.46L8 5.45V17.15L5 18.31V6.46ZM19 17.54L16 18.55V6.86L19 5.7V17.54Z"
                fill="#9F1C0F"
              />
            </svg>
          </Tooltip>
        </div>
      );
    } else if (
      open !== "choropleth" &&
      filters[0]["selectedCategory"] === "Final Destination Country"
    ) {
      return (
        <div className="all-btn" onClick={() => setOpen("choropleth")}>
          <Tooltip title="Map" arrow classes={{ tooltip: classes.customWidth }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.6326 3.05268 20.7598 3.14645 20.8536C3.24021 20.9473 3.36739 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.36739 20.9473 3.24021 20.8536 3.14645C20.7598 3.05268 20.6326 3 20.5 3ZM10 5.47L14 6.87V18.53L10 17.13V5.47ZM5 6.46L8 5.45V17.15L5 18.31V6.46ZM19 17.54L16 18.55V6.86L19 5.7V17.54Z"
                fill="#9F1C0F"
              />
            </svg>
          </Tooltip>
        </div>
      );
    } else if (
      open !== "choropleth" &&
      filters[0]["selectedCategory"] ===
        "Requested Procedures for Destination (Imports to:)"
    ) {
      return (
        <div className="all-btn" onClick={() => setOpen("choropleth")}>
          <Tooltip title="Map" arrow classes={{ tooltip: classes.customWidth }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.6326 3.05268 20.7598 3.14645 20.8536C3.24021 20.9473 3.36739 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.36739 20.9473 3.24021 20.8536 3.14645C20.7598 3.05268 20.6326 3 20.5 3ZM10 5.47L14 6.87V18.53L10 17.13V5.47ZM5 6.46L8 5.45V17.15L5 18.31V6.46ZM19 17.54L16 18.55V6.86L19 5.7V17.54Z"
                fill="#9F1C0F"
              />
            </svg>
          </Tooltip>
        </div>
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
const useStyles = makeStyles(theme => ({
  customWidth: {
    fontSize: "12px"
  }
}));

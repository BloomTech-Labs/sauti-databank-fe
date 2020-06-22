import React from "react";
import { getSelectedOption } from "../OptionFunctions";
import "./scss/SelectedFilterDisplay.scss";
import Grid from "@material-ui/core/Grid";

const SelectedFilterDisplay = ({ filters }) => {
  const makeFilterList = () => {
    console.log("makeFilterList WAS CALLED");
    return Object.keys(filters)
      .filter(filterId => filterId >= 2)
      .map(filterId => {
        if (filters[filterId].selectedCategory) {
          return (
            <>
              <span className="redText"> Additional Filter -</span>
              {filters[filterId].selectedCategory} :
              <span className="italic">
                {" "}
                {getSelectedOption(filters, filterId)};
              </span>
            </>
          );
        } else {
          return <></>;
        }
      });
  };

  function showCompare() {
    if (filters[1].selectedCategory) {
      return (
        <>
          <span className="redText"> Subsample -</span>
          <span className="italic">{filters[1].selectedCategory} </span>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Grid item style={{ padding: "1%", fontSize: "1.5rem" }}>
        <span className="redText">Data Series -</span>{" "}
        <span className="italic">{filters[0].selectedCategory}</span>
        {makeFilterList()}
        {showCompare()}
      </Grid>
    </>
  );
};
export default SelectedFilterDisplay;

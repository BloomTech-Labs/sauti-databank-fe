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
              {filters[filterId].selectedCategory} :
              {getSelectedOption(filters, filterId)} |
            </>
          );
        } else {
          return <></>;
        }
      });
  };

  return (
    <>
      <Grid item style={{ padding: "1%", fontSize: "1.5rem" }}>
        <span className="redText">Data Series:</span>{" "}
        {filters[0].selectedCategory}{" "}
        <span className="redText"> Subsample:</span>
        {filters[1].selectedCategory}{" "}
        <span className="redText"> Additional Filter:</span>
        {makeFilterList()}
      </Grid>
    </>
  );
};
export default SelectedFilterDisplay;

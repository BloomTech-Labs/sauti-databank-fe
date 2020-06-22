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
          {filters[1].selectedCategory}
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
        {filters[0].selectedCategory}
        {makeFilterList()}
        {showCompare()}
      </Grid>
    </>
  );
};
export default SelectedFilterDisplay;

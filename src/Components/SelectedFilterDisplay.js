import React from "react";
import { getSelectedOption } from "../OptionFunctions";
import "./scss/SelectedFilterDisplay.scss";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const SelectedFilterDisplay = ({ filters }) => {
  const makeFilterList = () => {
    return Object.keys(filters)
      .filter(filterId => filterId >= 2)
      .map(filterId => {
        if (filters[filterId].selectedCategory) {
          return (
            <>
              <span className="filterTitle"> Additional Filter -</span>
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
          <span className="filterTitle"> Compare By -</span>
          {filters[1].selectedCategory}
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Box
        display="flex"
        height="100%"
        alignItems="center"
        style={{ fontSize: "1.5rem", padding: "0% 1%" }}
      >
        <span className="filterTitle">Data Series -</span>{" "}
        {filters[0].selectedCategory}
        {makeFilterList()}
        {showCompare()}
      </Box>
    </>
  );
};
export default SelectedFilterDisplay;

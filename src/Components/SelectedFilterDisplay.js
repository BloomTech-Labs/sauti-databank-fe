import React from "react";
import { getSelectedOption } from "../OptionFunctions";
import "./scss/SelectedFilterDisplay.scss";

const SelectedFilterDisplay = ({ filters }) => {
  const makeFilterList = () => {
    console.log("makeFilterList WAS CALLED");
    return Object.keys(filters)
      .filter(filterId => filterId >= 2)
      .map(filterId => {
        return (
          <p>
            {filters[filterId].selectedCategory} -{" "}
            {getSelectedOption(filters, filterId)}
          </p>
        );
      });
  };

  return (
    <>
      <h3>
        <strong>Data Series:</strong> {filters[0].selectedCategory}|{" "}
        <strong> Subsample:</strong>
        {filters[1].selectedCategory} |<strong> Additional Filter:</strong>
        {makeFilterList()}
      </h3>
    </>
  );
};
export default SelectedFilterDisplay;

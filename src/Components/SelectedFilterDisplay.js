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
          <>
            {filters[filterId].selectedCategory} :
            {getSelectedOption(filters, filterId)} |
          </>
        );
      });
  };

  return (
    <>
      <h3>
        <span className="redText">Data Series:</span>{" "}
        {filters[0].selectedCategory}|{" "}
        <span className="redText"> Subsample:</span>
        {filters[1].selectedCategory} |{" "}
        <span className="redText"> Additional Filter:</span>
        {makeFilterList()}
      </h3>
    </>
  );
};
export default SelectedFilterDisplay;

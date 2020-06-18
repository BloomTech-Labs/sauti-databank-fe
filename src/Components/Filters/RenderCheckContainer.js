import React from "react";
import CategoryOptions from "./CategoryOptions";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
//component - diplays a button to see options when button is clicked
const RenderCheckContainer = ({
  i,
  filters,
  graphLabels,
  // CategoryOptions,
  itemName,

  setFilters,
  FilterBoxOptions,
  setUpdateUrlFlag,
  updateUrlFlag
}) => {
  // do all conditional renderings using if statements for now
  // for (let item in )
  //console.log(filters[i])
  const showOptions = (i, filters, graphLabels) => {
    if (filters[i].showOptions) {
      return graphLabels[`${filters[i].selectedTableColumnName}`].labels.map(
        option => (
          //not updating filter
          //does not have selected table column name
          <CategoryOptions
            i={i}
            filters={filters}
            graphLabels={graphLabels}
            option={option}
            setUpdateUrlFlag={setUpdateUrlFlag}
            updateUrlFlag={updateUrlFlag}
            setFilters={setFilters}
          />
        )
      );
    } else {
      return graphLabels[`${filters[i].selectedTableColumnName}`].labels
        .filter(option => {
          return filters[i].selectableOptions[option];
        })
        .map(option => (
          <CategoryOptions
            i={i}
            filters={filters}
            graphLabels={graphLabels}
            option={option}
            setUpdateUrlFlag={setUpdateUrlFlag}
            updateUrlFlag={updateUrlFlag}
            setFilters={setFilters}
          />
        ));
    }
  };
  //remove additional filtering options for 'Data Series',

  // if (graphLabels[`${filters[i].selectedTableColumnName}`]) {
  if (itemName === filters[i].selectedCategory) {
    //if (graphLabels[item]) {
    return (
      // <Grid container style={{flexDirection: "row"}}>
      <RadioGroup style={{ flexDirection: "row" }}>
        {/* <CheckboxContainer> */}
        {showOptions(i, filters, graphLabels)}
        {/* </CheckboxContainer> */}
      </RadioGroup>
      // </Grid>
    );
  } else {
    return <div></div>;
  }
};
export default RenderCheckContainer;

const CheckboxContainer = styled.div`
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  margin: 10px 0;
  padding-bottom: 10px;
  padding-left: 1%;
  border-bottom: 1px solid #ccc;
`;

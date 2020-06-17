import React from "react";
import CategoryOptions from "./CategoryOptions";
import styled from "styled-components";
//component - diplays a button to see options when button is clicked
const RenderCheckContainer = ({
  i,
  filters,
  graphLabels,
  // CategoryOptions,
  itemName,
  displayRenderContainer,
  setFilters,
  FilterBoxOptions,
  setUpdateUrlFlag,
  updateUrlFlag,
  setDisplayDrop
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
  console.log(filters);

  // if (graphLabels[`${filters[i].selectedTableColumnName}`]) {
  if (itemName === filters[i].selectedCategory) {
    //if (graphLabels[item]) {
    return (
      <CheckboxContainer>
        {showOptions(i, filters, graphLabels)}
      </CheckboxContainer>
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
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

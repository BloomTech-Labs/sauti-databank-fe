import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ClearFilters = () => {
  const clearReducer = useSelector(state => state.clearReducer.clear);

  const {
    setFilters,
    setFilterBoxStartDate,
    setFilterBoxEndDate,
    setUpdateUrlFlag,
    filters,
    getTodaysDate,
    updateUrlFlag
  } = clearReducer;
  return (
    <>
      <ResetButton
        // className="reset-btn"
        onClick={e => {
          setFilters({
            0: {
              ...filters[0],
              nameOfFilter: "Data Series",
              selectableOptions: {}
            },
            1: {
              nameOfFilter: "Compare SubSamples",
              selectedCategory: "",
              selectableOptions: {},
              selectedTable: "Users",
              selectedTableColumnName: "",
              showOptions: false,
              optionHasBeenSelected: false
            },
            2: {
              nameOfFilter: "Data Filter",
              selectedCategory: "",
              selectableOptions: {},
              selectedTable: "",
              selectedTableColumnName: "",
              showOptions: true,
              optionHasBeenSelected: false
            }
          });
          setFilterBoxStartDate("2017-01-01");
          setFilterBoxEndDate(getTodaysDate());
          setUpdateUrlFlag(!updateUrlFlag);
        }}
      >
        Clear Filters
      </ResetButton>
    </>
  );
};
export default ClearFilters;

const ResetButton = styled.p`
  text-decoration: none;
  padding: 10px 5px;
  color: white;
  background-color: slategrey;
  border: 2px solid slategrey;
  border-radius: 5px;
  width: 100px;
  font-weight: bold;
  text-align: center;
  opacity: 0.75;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

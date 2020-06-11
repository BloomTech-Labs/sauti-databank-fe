import React from "react";
import graphLabels from "../graphLabels";
import Select, { components } from "react-select";
import RenderCheckContainer from "../FilterBoxComponents/RenderCheckContainer";
import styled from "styled-components";
const AddFilter = ({
  filterSelectorName,
  filters,
  setFilters,
  ControlComponent,
  index,
  formatGroupLabel,
  setUpdateUrlFlag,
  FilterBoxOptions,
  updateUrlFlag,
  dataFilterVar,
  colourStyles,
  CategoryOptions
}) => {
  return (
    <div>
      <form>
        {/* labels filter */}
        <p>{filterSelectorName}</p>
        <Select
          defaultValue={{ label: filters[index].selectedCategory }}
          // isClearable
          //seems not in use
          formatGroupLabel={formatGroupLabel}
          components={{ Control: ControlComponent }}
          // isSearchable
          onChange={e => {
            setUpdateUrlFlag(!updateUrlFlag);
            let optionFlags = {};
            graphLabels[
              `${FilterBoxOptions.default[e.label].value.type}`
            ].labels.forEach(option => {
              optionFlags = {
                ...optionFlags,
                [option]: false
              };
            });
            setFilters({
              ...filters,
              [index]: {
                ...filters[index],
                selectedCategory: e.label, //option
                selectedTableColumnName:
                  FilterBoxOptions.default[e.label].value.type,

                selectedTable: FilterBoxOptions.default[e.label].value.query,
                selectedOption: undefined,
                selectableOptions: { ...optionFlags }
              }
            });
          }}
          name="color"
          styles={colourStyles}
          options={dataFilterVar(
            FilterBoxOptions.superCategories,
            Object.keys(filters)
              .map(filterId => {
                return filters[filterId].selectedCategory;
              })
              .filter(selectedCategory => selectedCategory.length > 0)
          )}
        />
        {/* additional options below 'Data Series' and 'Add Filter' */}
        <RenderCheckContainer
          i={index}
          filters={filters}
          graphLabels={graphLabels}
          //   props={props}
          CategoryOptions={CategoryOptions}
          CheckboxContainer={CheckboxContainer}
          setFilters={setFilters}
        />
      </form>
    </div>
  );
};
export default AddFilter;

const CheckboxContainer = styled.div`
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

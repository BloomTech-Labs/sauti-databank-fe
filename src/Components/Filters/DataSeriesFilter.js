import React from "react";
import graphLabels from "../graphLabels";
import Select, { components } from "react-select";

const DataSeriesFilter = ({
  filterSelectorName,
  filters,
  setFilters,
  ControlComponent,
  index,
  formatGroupLabel,
  setUpdateUrlFlag,
  FilterBoxOptions,
  updateUrlFlag,
  xVar,
  colourStyles
}) => {
  return (
    <>
      {/* labels filter */}
      <p>{filterSelectorName}</p>
      <Select
        // shows selected category
        defaultValue={{ label: filters[index].selectedCategory }}
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
        options={xVar(
          FilterBoxOptions.superCategories,
          Object.keys(filters)
            .map(filterId => {
              return filters[filterId].selectedCategory;
            })
            .filter(selectedCategory => selectedCategory.length > 0)
        )}
      />
    </>
  );
};
export default DataSeriesFilter;

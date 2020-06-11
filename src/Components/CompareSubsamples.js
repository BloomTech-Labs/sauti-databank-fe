import React from "react";
import graphLabels from "./graphLabels";
import Select, { components } from "react-select";

const CompareSubSamples = ({
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
          options={xVar(
            FilterBoxOptions.superCategories,
            Object.keys(filters)
              .map(filterId => {
                return filters[filterId].selectedCategory;
              })
              .filter(selectedCategory => selectedCategory.length > 0)
          )}
        />
      </form>
    </div>
  );
};
export default CompareSubSamples;

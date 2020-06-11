import React, { useEffect } from "react";
import graphLabels from "../graphLabels";
import Select, { components } from "react-select";
import { useSelector } from "react-redux";

const CompareSubSamples = () => {
  const reducerSub = useSelector(
    state => state.compareSubSamplesReducer.compareSub
  );

  console.log(reducerSub.open);

  const filterSelectorName = reducerSub.filterSelectorName;
  const filters = reducerSub.filters;
  const setFilters = reducerSub.setFilters;
  const ControlComponent = reducerSub.ControlComponent;
  const index = reducerSub.index;
  const formatGroupLabel = reducerSub.formatGroupLabel;
  const setUpdateUrlFlag = reducerSub.setUpdateUrlFlag;
  const FilterBoxOptions = reducerSub.FilterBoxOptions;
  const updateUrlFlag = reducerSub.updateUrlFlag;
  const xVar = reducerSub.xVar;
  const colourStyles = reducerSub.colourStyles;
  const open = reducerSub.open;

  // useEffect(()=> {
  //   if(reducerSub !== undefined){
  //  filterSelectorName=reducerSub.filterSelectorName
  //  filters=reducerSub.filters
  //  setFilters=reducerSub.setFilters
  //   ControlComponent=reducerSub.ControlComponent
  //   index=reducerSub.index
  //   formatGroupLabel=reducerSub.formatGroupLabel
  //  setUpdateUrlFlag=reducerSub.setUpdateUrlFlag
  //  FilterBoxOptions=reducerSub.FilterBoxOptions
  //   updateUrlFlag=reducerSub.updateUrlFlag
  //   xVar=reducerSub.xVar
  //  colourStyles=reducerSub.colourStyles
  //  open = reducerSub.open }
  // }, [reducerSub])

  console.log(open);

  if (filterSelectorName === "Compare SubSamples" && open === "bar") {
    console.log("run filter");
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
  } else {
    return (
      <>
        <h1>Hellloooooooooooooooooooooooooo</h1>{" "}
      </>
    );
  }
};
export default CompareSubSamples;

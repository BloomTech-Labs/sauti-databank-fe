import React from "react";
import styled from "styled-components";

//only being used for AddFilter -> RenderCheckContainer
const FilterCategoryOptions = props => {
  let {
    i,
    filters,
    graphLabels,
    option,
    item,
    setFilters,
    setUpdateUrlFlag,
    updateUrlFlag,
    catItem,
    index,
    FilterBoxOptions
  } = props;

  function setSelectedTableColumnName(catItem, index) {
    setUpdateUrlFlag(!updateUrlFlag);
    let optionFlags = {};
    graphLabels[
      `${FilterBoxOptions.default[catItem].value.type}`
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
        selectedCategory: catItem, //option
        selectedTableColumnName: FilterBoxOptions.default[catItem].value.type,

        selectedTable: FilterBoxOptions.default[catItem].value.query,
        selectedOption: undefined,
        selectableOptions: { ...optionFlags }
      }
    });
  }

  // for options tag
  const changeOption = (i, filters, graphLabels, option) => {
    let optionFlags = {};
    graphLabels[item].labels.forEach(option => {
      optionFlags = {
        ...optionFlags,
        [option]: false
      };
    });
    setFilters({
      ...filters,
      [i]: {
        ...filters[i],
        selectedCategory: catItem,
        selectableOptions: { [option]: true },
        selectedTableColumnName: FilterBoxOptions.default[catItem].value.type,
        selectedTable: FilterBoxOptions.default[catItem].value.query
        // selectedOption: option,
        // selectableOptions: {
        //   ...optionFlags,
        //   [option]: !filters[i].selectableOptions[option]
        // }
      }
    });
  };

  const isChecked = (i, filters, option) => {
    return filters[i].selectableOptions[option] === true;
  };

  return (
    <Options key={option}>
      <input
        type="radio"
        name="CrossFilter"
        value={option}
        // seems to need this when this is a component
        checked={isChecked(i, filters, option)}
        onChange={e => {
          //   setSelectedTableColumnName(catItem,  index)
          setUpdateUrlFlag(!updateUrlFlag);
          changeOption(i, filters, graphLabels, option, catItem);
        }}
      />
      <FilterOption>{option}</FilterOption>
    </Options>
  );
};
export default FilterCategoryOptions;

const FilterOption = styled.p`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
`;

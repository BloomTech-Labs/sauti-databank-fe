import React from "react";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CategoryOptions = ({
  setUpdateUrlFlag,
  updateUrlFlag,
  setFilters,
  i,
  filters,
  graphLabels,
  option
}) => {
  const changeOption = (i, filters, graphLabels, option) => {
    let optionFlags = {};
    graphLabels[`${filters[i].selectedTableColumnName}`].labels.forEach(
      option => {
        optionFlags = {
          ...optionFlags,
          [option]: false
        };
      }
    );
    setFilters({
      ...filters,
      [i]: {
        ...filters[i],
        // selectedOption: option,
        selectableOptions: {
          ...optionFlags,
          [option]: !filters[i].selectableOptions[option]
        }
      }
    });
  };
  const isChecked = (i, filters, option) => {
    return filters[i].selectableOptions[option] === true;
  };

  return (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio />}
      checked={isChecked(i, filters, option)}
      onChange={e => {
        setUpdateUrlFlag(!updateUrlFlag);

        changeOption(i, filters, graphLabels, option);
      }}
      label={option}
    />
    //   <Radio
    //   key={option}
    //     type="radio"
    //     name="CrossFilter"
    //     value={option}
    //     // seems to need this when this is a component
    //     checked={isChecked(i, filters, option)}
    //     onChange={e => {
    //       setUpdateUrlFlag(!updateUrlFlag);

    //       changeOption(i, filters, graphLabels, option);
    //     }}
    //     label="Female"
    //   >
    //   <FilterOption>{option}</FilterOption>
    // </Radio>
  );
};
export default CategoryOptions;

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

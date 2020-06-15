import React, { useState } from "react";
import graphLabels from "../graphLabels";
import Select, { components } from "react-select";
import RenderCheckContainer from "./RenderCheckContainer";
import styled from "styled-components";
const AddFilter = ({
  filters,
  setFilters,
  index,
  FilterBoxOptions,
  CategoryOptions,
  setUpdateUrlFlag,
  updateUrlFlag
}) => {
  const [displayDrop, setDisplayDrop] = useState(false);

  //onmouseOver change
  // function changeOption(e) {
  //   console.log(`AddFilter`, e.target.value);
  //   setUpdateUrlFlag(!updateUrlFlag);
  //   let optionFlags = {};
  //   graphLabels[
  //     `${FilterBoxOptions.default[e.target.value].value.type}`
  //   ].labels.forEach(option => {
  //     optionFlags = {
  //       ...optionFlags,
  //       [option]: false
  //     };
  //   });
  //   setFilters({
  //     ...filters,
  //     [index]: {
  //       ...filters[index],
  //       selectedCategory: e.target.value, //option
  //       selectedTableColumnName:
  //         FilterBoxOptions.default[e.target.value].value.type,

  //       selectedTable: FilterBoxOptions.default[e.target.value].value.query,
  //       selectedOption: undefined,
  //       selectableOptions: { ...optionFlags }
  //     }
  //   });
  // }

  console.log(`FilterBoxOptions`, FilterBoxOptions);
  let allSelectableOptions = Object.keys(FilterBoxOptions.default);
  allSelectableOptions.unshift("KEY DEMOGRAPHICS");

  const allItems = [];
  for (let key in FilterBoxOptions.default) {
    allItems.push([key, FilterBoxOptions.default[key].value.type]);
  }

  const displayDropOptions = () => {
    if (displayDrop === true) {
      return (
        <div className="dataSeriesBox">
          <p>Filter +</p>
          <div>
            {allItems.map(e => {
              return (
                <>
                  <option
                  // className="selectable"
                  // value={e[0]}
                  //  onClick={changeOption}
                  >
                    {e[0]}
                  </option>
                  <RenderCheckContainer
                    item={e[1]}
                    catItem={e[0]}
                    i={index}
                    filters={filters}
                    graphLabels={graphLabels}
                    CheckboxContainer={CheckboxContainer}
                    setFilters={setFilters}
                    index={index}
                    setUpdateUrlFlag={setUpdateUrlFlag}
                    updateUrlFlag={updateUrlFlag}
                    FilterBoxOptions={FilterBoxOptions}
                  />
                </>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="dataSeriesBox">
            <p>
              Filter <i class="arrow down"></i>
            </p>
          </div>
        </>
      );
    }
  };
  return <div onClick={() => setDisplayDrop(true)}>{displayDropOptions()}</div>;
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

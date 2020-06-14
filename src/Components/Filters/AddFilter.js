import React, { useState } from "react";
import graphLabels from "../graphLabels";
import Select, { components } from "react-select";
import RenderCheckContainer from "../FilterBoxComponents/RenderCheckContainer";
import styled from "styled-components";
const AddFilter = ({
  filters,
  setFilters,
  index,
  FilterBoxOptions,
  CategoryOptions
}) => {
  const [displayDrop, setDisplayDrop] = useState(false);

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
          <p>Data +</p>
          <div>
            {allItems.map(e => {
              return (
                <>
                  <div>
                    <h2>{e[0]}</h2>
                    <RenderCheckContainer
                      item={e[1]}
                      i={index}
                      filters={filters}
                      graphLabels={graphLabels}
                      CategoryOptions={CategoryOptions}
                      CheckboxContainer={CheckboxContainer}
                      setFilters={setFilters}
                    />
                  </div>
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
              Data <i class="arrow down"></i>
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

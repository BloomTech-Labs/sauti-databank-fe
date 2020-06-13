import React, { useState } from "react";
import graphLabels from "../graphLabels";
import "../../Components/scss/dataSeries.scss";

const DataSFilter = ({
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
  const [displayDrop, setDisplayDrop] = useState(false);
  console.log(xVar);

  // const onChange = e => {
  //   setUpdateUrlFlag(!updateUrlFlag);
  //   let optionFlags = {};
  //   graphLabels[
  //     `${FilterBoxOptions.default[e.label].value.type}`
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
  //       selectedCategory: e.label, //option
  //       selectedTableColumnName: FilterBoxOptions.default[e.label].value.type,

  //       selectedTable: FilterBoxOptions.default[e.label].value.query,
  //       selectedOption: undefined,
  //       selectableOptions: { ...optionFlags }
  //     }
  //   });
  // };

  //nameOfFilter: "Data Series", selectedCategory: "Gender",

  let allSelectableOptions = Object.keys(FilterBoxOptions.default);

  allSelectableOptions.unshift("KEY DEMOGRAPHICS");

  // console.log(allSelectableOptions);
  //filters[0]['selectedCategory'][e.target.value],
  function changeOption(e) {
    console.log(`changeOption`, e.target.value);

    setUpdateUrlFlag(!updateUrlFlag);
    let optionFlags = {};
    graphLabels[
      `${FilterBoxOptions.default[e.target.value].value.type}`
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
        selectedCategory: e.target.value, //option
        selectedTableColumnName:
          FilterBoxOptions.default[e.target.value].value.type,

        selectedTable: FilterBoxOptions.default[e.target.value].value.query,
        selectedOption: undefined,
        selectableOptions: { ...optionFlags }
      }
    });
    console.log(`filters`, filters[0]["selectedCategory"]);
  }

  const displayDropOptions = () => {
    console.log(displayDrop);

    if (displayDrop === true) {
      return (
        <div className="dataSeriesBox">
          <p>Data +</p>
          <div>
            {allSelectableOptions.map(e => {
              if (e === "Most Requested Procedure Commodities") {
                return (
                  <>
                    <h1>'INFORMATION DEMAND'</h1>
                    <option
                      className="selectable"
                      value={e}
                      onClick={changeOption}
                    >
                      {e}
                    </option>
                  </>
                );
              } else if (e === "Exchange Rate Direction") {
                return (
                  <>
                    <h1>'BUSINESS BEHAVIOR'</h1>
                    <option
                      className="selectable"
                      value={e}
                      onClick={changeOption}
                    >
                      {e}
                    </option>
                  </>
                );
              } else {
                return (
                  <option
                    className="selectable"
                    value={e}
                    onClick={changeOption}
                  >
                    {e}
                  </option>
                );
              }
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

  return (
    <div onClick={() => setDisplayDrop(!displayDrop)}>
      {displayDropOptions()}
    </div>
  );
};
export default DataSFilter;

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
  const displayDropOptions = () => {
    console.log(displayDrop);

    const onChange = e => {
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
          selectedTableColumnName: FilterBoxOptions.default[e.label].value.type,

          selectedTable: FilterBoxOptions.default[e.label].value.query,
          selectedOption: undefined,
          selectableOptions: { ...optionFlags }
        }
      });
    };
    console.log(`xvar`, xVar);

    let allSelectableOptions = Object.keys(FilterBoxOptions.default);
    allSelectableOptions.sort();
    allSelectableOptions.unshift("KEY DEMOGRAPHICS");

    console.log(allSelectableOptions);
    //
    // let catSelectOption = [];
    // for (let i = 0; i < allSelectableOptions; i++) {
    //   console.log(i);
    //   if (
    //     allSelectableOptions[i] ===
    //     "Most Requested Agency Information for Procedures"
    //   ) {
    //     catSelectOption.push("INFORMATION DEMAND");
    //   } else if (allSelectableOptions[i] === "Exchange Rate Direction") {
    //     catSelectOption.push("BUSINESS BEHAVIOR");
    //   } else {
    //     catSelectOption.push(allSelectableOptions[i]);
    //   }
    //   return catSelectOption;
    // }
    // console.log(catSelectOption);

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
                    <option value={e}>{e}</option>
                  </>
                );
              } else if (e === "Exchange Rate Direction") {
                return (
                  <>
                    <h1>'BUSINESS BEHAVIOR'</h1>
                    {/* <option value={e}>{e}</option> */}
                  </>
                );
              } else {
                return <option value={e}>{e}</option>;
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

import React, { useEffect, useState } from "react";
import graphLabels from "../graphLabels";
import { useSelector } from "react-redux";
import "../../Components/scss/dataSeries.scss";

const CompareSubSamples = () => {
  const reducerSub = useSelector(
    state => state.compareSubSamplesReducer.compareSub
  );

  const {
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
    colourStyles,
    open
  } = reducerSub;

  function changeOption(e) {
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
  }

  // if (filterSelectorName === "Compare SubSamples" && open === "bar") {
  //   return (
  //     <div>
  //       <form>
  //         {/* labels filter */}
  //         <p>{filterSelectorName}</p>
  //         <Select
  //           defaultValue={{ label: filters[index].selectedCategory }}
  //           // isClearable
  //           //seems not in use
  //           formatGroupLabel={formatGroupLabel}
  //           components={{ Control: ControlComponent }}
  //           // isSearchable
  //           onChange={e => {
  //             setUpdateUrlFlag(!updateUrlFlag);
  //             let optionFlags = {};
  //             graphLabels[
  //               `${FilterBoxOptions.default[e.label].value.type}`
  //             ].labels.forEach(option => {
  //               optionFlags = {
  //                 ...optionFlags,
  //                 [option]: false
  //               };
  //             });
  //             setFilters({
  //               ...filters,
  //               [index]: {
  //                 ...filters[index],
  //                 selectedCategory: e.label, //option
  //                 selectedTableColumnName:
  //                   FilterBoxOptions.default[e.label].value.type,

  //                 selectedTable: FilterBoxOptions.default[e.label].value.query,
  //                 selectedOption: undefined,
  //                 selectableOptions: { ...optionFlags }
  //               }
  //             });
  //           }}
  //           name="color"
  //           styles={colourStyles}
  //           options={xVar(
  //             FilterBoxOptions.superCategories,
  //             Object.keys(filters)
  //               .map(filterId => {
  //                 return filters[filterId].selectedCategory;
  //               })
  //               .filter(selectedCategory => selectedCategory.length > 0)
  //           )}
  //         />
  //       </form>
  //     </div>
  //   );
  // } else {
  //   return <></>;
  // }
  const [displayDrop, setDisplayDrop] = useState(false);

  if (filterSelectorName === "Compare SubSamples" && open === "bar") {
    let allSelectableOptions = Object.keys(FilterBoxOptions.default);

    const displayDropOptions = () => {
      if (displayDrop === true) {
        return (
          <div className="dataSeriesBox">
            <p>Compare +</p>
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
                Compare <i class="arrow down"></i>
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
  } else {
    return <></>;
  }
};
export default CompareSubSamples;

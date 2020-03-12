import React, { useState, useEffect, useCallback } from "react";
import "../App.scss";
import ReactGa from "react-ga";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import Select, { components } from "react-select";
import { FilterBoxOptions } from "./FilterBoxOptions";
import graphLabels from "./graphLabels";
import Loader from "react-loader-spinner";
import { colourOptions, groupedOptions } from "./docs/data";

import CalendarModal from "../dashboard/CalendarModal";

import { decodeToken, getToken, getSubscription } from "../dashboard/auth/Auth";

export default function FilterBox(props) {
  const {
    filters,
    setFilters,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;
  const x = (theSuperCategories, categoriesCollected) => {
    return theSuperCategories.map(superCategory => {
      return {
        label: superCategory.label,
        options: superCategory.options
          .map(category => {
            // console.log(categoriesCollected, category)
            return {
              label: !categoriesCollected.includes(category.label)
                ? category.label
                : undefined
            };
          })
          .filter(category => category.label !== undefined)
      };
    });
  };
  // console.log(Object.keys(props.filters).map(filterId => {
  //   return props.filters[filterId].selectedCategory
  // })

  // )
  // const y = x(FilterBoxOptions.superCategories,
  //   Object.keys(props.filters).map(filterId => {
  //     return props.filters[filterId].selectedCategory
  //   })
  //   .filter(selectedCategory => selectedCategory.length > 0)
  //   )
  // console.log(props.filters)
  // console.log(y)
  const FilterSelector = props => {
    const {
      filterSelectorName,
      // formatGroupLabel,
      // ControlComponent,
      filters,
      setFilters,
      i,
      // FilterBoxOptions,
      graphLabels
    } = props;

    console.log(i);
    // styles for the react select component
    const groupStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    };
    const groupBadgeStyles = {
      backgroundColor: "#EBECF0",
      borderRadius: "2em",
      color: "#172B4D",
      display: "inline-block",
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: "1",
      minWidth: 1,
      padding: "0.16666666666667em 0.5em",
      textAlign: "center"
    };

    const itemStyle = {
      fontSize: 15
    };
    // controlling the super categories
    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span style={itemStyle}>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    // controls the item the user selects
    const controlStyles = {
      borderRadius: "1px solid black",
      // padding: 'px',
      // margin: "20px",

      // the selected item
      fontSize: 15,
      // background: colourOptions[2].color,
      color: "white"
    };

    // controls the items the user can select
    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: "white" }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        // const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isDisabled ? "red" : "blue",
          color: "#FFF",
          cursor: isDisabled ? "not-allowed" : "default",
          // items to select
          fontSize: 15
        };
      }
    };

    const ControlComponent = props => (
      <div style={controlStyles}>
        {<p>Custom Control</p>}
        <components.Control {...props} />
      </div>
    );

    return (
      <div>
        <form>
          <p>{filterSelectorName}</p>
          <Select
            // inputValue={setup}
            // defaultValue={colourOptions[0]}
            defaultValue={
              // FilterBoxOptions.superCategories[0].options[0]
              { label: filters[i].selectedCategory }
            }
            // value={}
            // isClearable
            formatGroupLabel={formatGroupLabel}
            components={{ Control: ControlComponent }}
            // isSearchable
            onChange={e => {
              console.log(e.label, filters[i]);
              // console.log(FilterBoxOptions.default[e.label].value)
              setFilters({
                ...filters,
                [i]: {
                  ...filters[i],
                  selectedCategory: e.label, //option
                  selectedTableColumnName:
                    FilterBoxOptions.default[e.label].value.type,
                  // selectedTableColumnName: `${e.value.type}`,
                  // this set doens't always exist

                  avaliableOptions: Object.keys(graphLabels).includes(
                    FilterBoxOptions.default[e.label].value.type
                  )
                    ? graphLabels[
                        `${FilterBoxOptions.default[e.label].value.type}`
                      ].labels
                    : [],
                  selectedTable: FilterBoxOptions.default[e.label].value.query,
                  // selectedTable: e.value.query,
                  // accees all the options from graphlables
                  // and put all of them in here as
                  // option : false
                  selectedOption: undefined
                }
              });

              // {
              //   /* FilterBoxOptions.default[props.filters[0].selectedCategory] */
              // }

              // setSetup(e.label)
            }}
            name="color"
            styles={colourStyles}
            // options={groupedOptions}

            options={
              // FilterBoxOptions.superCategories
              x(
                FilterBoxOptions.superCategories,
                Object.keys(filters)
                  .map(filterId => {
                    return filters[filterId].selectedCategory;
                  })
                  .filter(selectedCategory => selectedCategory.length > 0)
              )
            }
          />
          {/* add a button to show or hide these */}
          {/* JS likes to pass integers as string to components */}
          {i !== String(1) &&
            graphLabels[`${filters[i].selectedTableColumnName}`] && (
              <CheckboxContainer>
                <p>Select an option to further filter the data: </p>
                <button
                  onClick={() => {
                    setFilters({
                      ...filters,
                      [i]: {
                        ...filters[i],
                        showOptions: !filters[i].showOptions
                      }
                    });
                  }}
                >
                  {filters[i].showOptions ? "Hide" : "Show"}
                </button>
                {filters[i].showOptions &&
                  graphLabels[
                    `${filters[i].selectedTableColumnName}`
                  ].labels.map(option => (
                    <Options key={option}>
                      <input
                        type="radio"
                        name="CrossFilter"
                        value={option}
                        // seems to need this when this is a compoennt
                        checked={filters[i].selectedOption === option}
                        onChange={e => {
                          // console.log(filters);
                          setFilters({
                            ...filters,
                            [i]: {
                              ...filters[i],
                              selectedOption: option
                            }
                          });
                        }}
                      />
                      <FilterOption>{option}</FilterOption>
                    </Options>
                  ))}
              </CheckboxContainer>
            )}
        </form>
      </div>
    );
  };
  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }
  const newSub = getSubscription();
  let sub;
  if (newSub) {
    sub = newSub;
  }

  // const [filterBoxIndex, setFilterBoxIndex] = useState({
  //   type: "gender",
  //   query: "Users",
  //   label: ""
  // });
  // // console.log(`filterBoxIndex`, filterBoxIndex);
  // const [filterBoxCrossFilter, setFilterBoxCrossFilter] = useState({
  //   type: "",
  //   query: "Users",
  //   label: ""
  // });
  // const [filterBoxAdditionalFilter, setFilterBoxAdditionalFilter] = useState({
  //   type: "",
  //   query: "",
  //   label: ""
  // });
  // console.log(`filterBoxCrossFilter`, filterBoxCrossFilter);
  // const [filterBoxIndexLabel, setFilterBoxIndexLabel] = useState("Gender");
  // console.log(`filterBoxIndexLabel`, filterBoxIndexLabel);
  // const [filterBoxCrossLabel, setFilterBoxCrossLabel] = useState("");
  // console.log(`filterBoxCrossLabel`, filterBoxCrossLabel);

  // const [
  //   filterBoxAdditionalFilterLabel,
  //   setFilterBoxAdditionalFilterLabel
  // ] = useState("");
  const [setup, setSetup] = useState(colourOptions[0]);
  const [loading, setLoading] = useState(false);
  const getAvaliableOptions = (options, filters) => {
    // return options.filter(option => {
    //   return !Object.keys(filters)
    //     .map(filterId => {
    //       return filters[filterId].selectedCategory;
    //     })
    //     .includes(option.label);
    // });
  };
  // controlling the items the user can select from

  const handleSubmit = useCallback(
    e => {
      if (e.target.textContent === "Submit") {
        e.preventDefault();
      }
      // props.setIndex(filterBoxIndex);
      // props.setIndexLabel(filterBoxIndexLabel);
      // props.setCrossLabel(filterBoxCrossLabel);
      // props.setCrossFilter(filterBoxCrossFilter);
      // props.setAdditionalFilter(filterBoxAdditionalFilter);
      // don't exist so don't use
      setFilterBoxStartDate(filterBoxStartDate);
      setFilterBoxEndDate(filterBoxEndDate);
    },
    [
      // filterBoxAdditionalFilter,
      // filterBoxCrossFilter,
      // filterBoxCrossLabel,
      filterBoxEndDate,
      // filterBoxIndex,
      // filterBoxIndexLabel,
      filterBoxStartDate,
      setFilterBoxStartDate,
      setFilterBoxEndDate
    ]
  );

  // const handleAuto = useCallback(
  //   e => {
  //     // props.setIndex(filterBoxIndex);
  //     // props.setIndexLabel(filterBoxIndexLabel);
  //     // props.setCrossLabel(filterBoxCrossLabel);
  //     // props.setCrossFilter(filterBoxCrossFilter);
  //     // props.setAdditionalFilter(filterBoxAdditionalFilter);
  //     props.setStartDate(filterBoxStartDate);
  //     props.setEndDate(filterBoxEndDate);
  //   },
  //   [
  //     // filterBoxAdditionalFilter,
  //     // filterBoxCrossFilter,
  //     // filterBoxCrossLabel,
  //     filterBoxEndDate,
  //     // filterBoxIndex,
  //     // filterBoxIndexLabel,
  //     filterBoxStartDate,
  //     props
  //   ]
  // );
  // console.log(
  //   "IMPORTANTTT",
  //   filterBoxAdditionalFilter.type,
  //   !graphLabels[`${filterBoxAdditionalFilter.type}`]
  // );

  // useEffect(() => {
  //   if (
  //     !graphLabels[`${filterBoxAdditionalFilter.type}`] &&
  //     filterBoxAdditionalFilter.type
  //   ) {
  //     handleAuto();
  //     setLoading(true);
  //   }
  //   /* eslint-disable */
  // }, [filterBoxAdditionalFilter.type]);

  // useEffect(() => {
  //   if (props.checkboxOptions.length) {
  //     setLoading(false);
  //   }
  // }, [props.checkboxOptions]);

  // const ClickTracker = index => {
  //   ReactGa.event({
  //     category: "Option",
  //     action: `Clicked a Filter Option: ${index}`
  //   });
  // };

  // console.log("FILTER BOX ADDITIONALFILTER TYPE", filterBoxAdditionalFilter.type);
  // console.log(" ONE - props.CheckboxOptions - ADDITIONAL FILTER CHECKBOXES", props.checkboxOptions);
  // console.log(" TWO - props.SECONDCheckboxOptions", props.secondCheckboxOptions);

  return (
    <DropdownContainer>
      {Object.keys(filters).map(filterId => (
        <FilterSelector
          key={filterId}
          filterSelectorName={filters[filterId].nameOfFilter}
          filters={filters}
          setFilters={setFilters}
          i={filterId}
          graphLabels={graphLabels}
          // these are the subcomponents used to control the styles of
          // the react selection component
          // formatGroupLabel={formatGroupLabel}
          // ControlComponent={ControlComponent}
          // FilterBoxOptions={FilterBoxOptions}
        />
      ))}
      <div className="btn-container">
        <Button
          // className="checkbox-submit-btn"
          // type="submit"
          // disabled={loading}
          onClick={e => {
            // console.log("here");
            // console.log(filters);
            // put in check for how many filters we can add
            setFilters({
              ...filters,
              [Object.keys(filters).length]: {
                nameOfFilter: "Data Filter",
                selectedCategory: "",
                selectedOption: undefined,
                avaliableOptions: [],
                selectedTable: "",
                selectedTableColumnName: "",
                showOptions: false
              }
            });
          }}
          style={{ cursor: loading ? "auto" : "pointer" }}
        >
          Add Additional Filter
        </Button>
      </div>
      <form>
        {/*
        if loading
        <Loader
            className="options-loader"
            type="Oval"
            color="#708090"
            width={50}
            height={20}
            timeout={120000000}
          /> */}

        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <DateContainer>
            <div>
              <p>Start</p>
              <input
                name="startData"
                type="date"
                value={filterBoxStartDate}
                disabled={loading}
                onChange={e => setFilterBoxStartDate(e.target.value)}
              />
            </div>
            <div>
              <p>End</p>
              <input
                disabled={loading}
                name="endData"
                type="date"
                value={filterBoxEndDate}
                id="today"
                onChange={e => setFilterBoxEndDate(e.target.value)}
              />
            </div>
          </DateContainer>
        ) : (
          <CalendarModal />
        )}
        <div className="btn-container">
          <Button
            className="checkbox-submit-btn"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            style={{ cursor: loading ? "auto" : "pointer" }}
          >
            Submit
          </Button>
        </div>
        <p
          className="reset-btn"
          onClick={e => {
            props.setFilters({
              // default query setup
              0: {
                nameOfFilter: "Data Series",
                selectedCategory: "Gender", // label
                selectedOption: undefined,
                avaliableOptions: [],
                selectedTable: "Users", // value.query
                selectedTableColumnName: "gender", // value.type
                showOptions: false
              },
              1: {
                nameOfFilter: "Compare SubSamples",
                selectedCategory: "",
                selectedOption: undefined,
                avaliableOptions: [],
                selectedTable: "",
                selectedTableColumnName: "",
                showOptions: false
              },
              2: {
                nameOfFilter: "Data Filter",
                selectedCategory: "",
                selectedOption: undefined,
                avaliableOptions: [],
                selectedTable: "",
                selectedTableColumnName: "",
                showOptions: false
              }
            });
          }}
        >
          Reset
        </p>
      </form>
    </DropdownContainer>
  );
}

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
const CheckboxContainer = styled.div`
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const DateContainer = styled.div`
  margin: 20px 0;
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    input {
      font-family: "Helvetica", sans-serif;
      font-size: 16px;
      margin: 0;
      border-radius: 2px;
      border: 1px solid #ccc;
      padding: 10px;
      ::-webkit-inner-spin-button {
        display: none;
      }
      ::-webkit-clear-button {
        display: none;
      }
      ::-webkit-calendar-picker-indicator {
        opacity: 0.8;
        cursor: pointer;
        color: #999;
      }
    }
  }
`;

const Button = styled.button`
  background: #47837f;
  width: 40%;
  color: #fff;
  font-weight: 400;
  padding: 10px;
  border: none;
  border-radius: 2px;
  text-align: center;
  align-self: center;
  font-size: 1.5rem;
  :hover {
    cursor: pointer;
  }
`;

const DropdownContainer = styled.div`
  font-family: Helvetica, sans-serif;
  color: $greyColor;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 26.9rem;
  p {
    font-size: 1.3rem;
    margin: 10px 0;
  }
  .disclosure {
    font-size: 14px;
    color: #999;
    font-style: italic;
    font-weight: 400;
  }
  .reset-btn {
    text-decoration: underline;
    opacity: 0.7;
    cursor: pointer;
    margin-top: 20px;
  }
  .dropdown {
    color: $greyColor;
    font-size: 1.6rem;
    font-weight: normal;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .myControlClassName {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
  }
  .Dropdown-arrow {
    position: absolute;
    top: 21px;
    right: 15px;
  }
  .btn-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

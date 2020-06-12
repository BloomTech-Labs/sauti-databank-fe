import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
//around the filters
import Select, { components } from "react-select";
import { FilterBoxOptions } from "../FilterBoxOptions";
import graphLabels from "../graphLabels";
import { colourOptions, groupedOptions } from "../docs/data";
import useCalendar, { getTodaysDate } from "../../hooks/useCalendar";
import { useHistory } from "react-router-dom";
//import CalendarModal from "../dashboard/CalendarModal";
import {
  decodeToken,
  getToken,
  getSubscription
} from "../../dashboard/auth/Auth";
import { getAvaliableOptions, getSelectedOption } from "../../OptionFunctions";
import CalendarParent from "../../dashboard/CalendarParent";
import RenderCheckContainer from "../FilterBoxComponents/RenderCheckContainer";
import Grid from "@material-ui/core/Grid";

import DataSeriesFilter from "./DataSeriesFilter";
import AddFilter from "./AddFilter";

import { useDispatch } from "react-redux";
import { compareSubSamples } from "../redux-actions/compareSubSamples";
import { calendarAction } from "../redux-actions/calendarAction";

export default function FilterBox(props) {
  const History = useHistory();
  const {
    filters,
    setFilters,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeYear,
    changeQuarter,
    getCurrentYear,
    open
  } = props;
  const [updateUrlFlag, setUpdateUrlFlag] = useState(false);

  //theSuperCategories (Key Demographic, Information Demand, Business Behavior)
  //categoriesCollected (categories selected ex. 'gender')
  const xVar = (theSuperCategories, categoriesCollected) => {
    return theSuperCategories.map(superCategory => {
      return {
        label: superCategory.label,
        options: superCategory.options
          //  filters out the already selected option
          .map(category => {
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

  const dataFilterVar = (theSuperCategories, categoriesCollected) => {
    return theSuperCategories.map(superCategory => {
      return {
        label: superCategory.label,
        options: superCategory.options
      };
    });
  };

  const FilterSelector = props => {
    const {
      filterSelectorName,
      filters,
      setFilters,
      i,

      graphLabels
    } = props;

    let index = i;

    // styles for the react select component
    const groupStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    };
    const groupBadgeStyles = {
      backgroundColor: "#212121",
      borderRadius: "2em",
      color: "white",
      display: "inline-block",
      fontSize: 12,
      fontWeight: "bold",
      lineHeight: "1.2",
      minWidth: 1,
      padding: "0.16666666666667em 0.5em",
      textAlign: "center"
    };

    const itemStyle = {
      fontSize: 15
    };
    // controlling the super categories
    //seems to not be in use
    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span style={itemStyle}>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    // controls the item the user selects
    const controlStyles = {
      borderRadius: "1px solid black",

      fontSize: 14,
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
          backgroundColor: isDisabled ? "red" : "rgba(128, 128, 128, .15)",
          backgroundColor: isFocused && "rgba(128, 128, 128, .5)",
          borderBottom: ".25px solid grey",
          color: "#212121",
          cursor: isDisabled ? "not-allowed" : "pointer",
          // items to select
          fontSize: 12
        };
      }
    };

    const ControlComponent = props => (
      <div style={controlStyles}>
        <components.Control {...props} />
      </div>
    );

    const CategoryOptions = props => {
      let { i, filters, graphLabels, option } = props;

      // for options tag
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
        <Options key={option}>
          <input
            type="radio"
            name="CrossFilter"
            value={option}
            // seems to need this when this is a component
            checked={isChecked(i, filters, option)}
            onChange={e => {
              setUpdateUrlFlag(!updateUrlFlag);

              changeOption(i, filters, graphLabels, option);
            }}
          />
          <FilterOption>{option}</FilterOption>
        </Options>
      );
    };

    const dispatch = useDispatch();

    useEffect(() => {
      if (filterSelectorName === "Compare SubSamples") {
        dispatch(
          compareSubSamples({
            filterSelectorName: filterSelectorName,
            filters: filters,
            setFilters: setFilters,
            formatGroupLabel: formatGroupLabel,
            ControlComponent: ControlComponent,
            index: index,
            formatGroupLabel: formatGroupLabel,
            setUpdateUrlFlag: setUpdateUrlFlag,
            FilterBoxOptions: FilterBoxOptions,
            updateUrlFlag: updateUrlFlag,
            xVar: xVar,
            colourStyles: colourOptions,
            open: open,
            filterSelectorName: filterSelectorName
          })
        );
      }
    }, [open, filters]);

    //all 3 filtering options
    //first is 'Data Series'
    if (filterSelectorName === "Data Series") {
      return (
        <DataSeriesFilter
          filterSelectorName={filterSelectorName}
          filters={filters}
          setFilters={setFilters}
          formatGroupLabel={formatGroupLabel}
          ControlComponent={ControlComponent}
          index={index}
          formatGroupLabel={formatGroupLabel}
          setUpdateUrlFlag={setUpdateUrlFlag}
          FilterBoxOptions={FilterBoxOptions}
          updateUrlFlag={updateUrlFlag}
          xVar={xVar}
          colourStyles={colourOptions}
        />
      );
    } else if (filterSelectorName === "Data Filter") {
      return (
        <AddFilter
          filterSelectorName={filterSelectorName}
          filters={filters}
          setFilters={setFilters}
          formatGroupLabel={formatGroupLabel}
          ControlComponent={ControlComponent}
          index={index}
          formatGroupLabel={formatGroupLabel}
          setUpdateUrlFlag={setUpdateUrlFlag}
          FilterBoxOptions={FilterBoxOptions}
          updateUrlFlag={updateUrlFlag}
          dataFilterVar={dataFilterVar}
          colourStyles={colourOptions}
          CategoryOptions={CategoryOptions}
        />
      );
    } else {
      return <></>;
    }
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

  const [setup, setSetup] = useState(colourOptions[0]);
  const [loading, setLoading] = useState(false);

  let urlSearchParams = {};
  Object.keys(filters).forEach(filterId => {
    urlSearchParams = {
      ...urlSearchParams,
      ["filter" + String(filterId)]: `${
        filters[filterId].selectedTableColumnName
          ? filters[filterId].selectedTableColumnName
          : "undefined"
      }comma${getSelectedOption(filters, filterId)}`
    };
  });

  //let ourSearch = useHistory().location.search;
  const inverseConvertOptionUrl = option => {
    // these come from the selection options the user will see
    // -1 means the search failed
    if (option.search(/\//) > -1) {
      return option.replace(/\//g, "forwardslash");
    } else if (option.search(/ /) > -1) {
      return option.replace(/ /g, "whitespace");
    } else {
      return option;
    }
  };
  useEffect(() => {
    let keys = Object.keys(urlSearchParams);
    let values = Object.values(urlSearchParams).map(value =>
      inverseConvertOptionUrl(value)
    );

    const filterStrings = keys
      .map((key, i) => key + "equals" + values[i])
      .join("zaz");

    History.push("?" + filterStrings); //new URLSearchParams({ ...urlSearchParams }).toString());
  }, [updateUrlFlag]);

  const handleSubmit = useCallback(
    e => {
      if (e.target.textContent === "Submit") {
        e.preventDefault();
      }

      setFilterBoxStartDate(filterBoxStartDate);
      setFilterBoxEndDate(filterBoxEndDate);
    },
    [
      filterBoxEndDate,

      filterBoxStartDate,
      setFilterBoxStartDate,
      setFilterBoxEndDate
    ]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      calendarAction({
        tier: tier,
        newSub: newSub,
        filterBoxStartDate: filterBoxStartDate,
        setFilterBoxStartDate: setFilterBoxStartDate,
        filterBoxEndDate: filterBoxEndDate,
        setFilterBoxEndDate: setFilterBoxEndDate,
        changeYear: changeYear,
        changeQuarter: changeQuarter,
        getCurrentYear: getCurrentYear,
        changeYear: changeYear,
        changeQuarter: changeQuarter,
        getCurrentYear: getCurrentYear,
        loading: loading,
        open: props.open
      })
    );
  }, [open, filters]);

  return (
    <>
      <DropdownContainer>
        {Object.keys(filters).map(filterId => (
          <FilterSelector
            key={filterId}
            filterSelectorName={filters[filterId].nameOfFilter}
            filters={filters}
            setFilters={setFilters}
            i={filterId}
            graphLabels={graphLabels}
          />
        ))}
        <div className="btn-container">
          <Button
            onClick={e => {
              const currentDataFilter = Object.keys(filters).length - 1;

              if (
                tier !== undefined &&
                (tier === "ADMIN" || tier === "PAID" || tier === "GOV_ROLE")
              ) {
                setFilters({
                  ...filters,
                  // make a flag that is only true when this button is clicked on
                  // put the flag on the last additional filter known to the user
                  [currentDataFilter]: {
                    ...filters[currentDataFilter],
                    // set to true only if selectableOptions has a selected item
                    // (the only time optionHasBeenSelected will be true)
                    showOptions: false
                  },
                  [Object.keys(filters).length]: {
                    nameOfFilter: "Data Filter",
                    selectedCategory: "",
                    selectableOptions: {},
                    selectedTable: "",
                    selectedTableColumnName: "",
                    showOptions: true
                  }
                });
              }
            }}
            style={{ cursor: loading ? "auto" : "pointer" }}
          >
            Add Filter
          </Button>
        </div>
        <form>
          {/* <CalendarParent
            tier={tier}
            newSub={newSub}
            filterBoxStartDate={filterBoxStartDate}
            setFilterBoxStartDate={setFilterBoxStartDate}
            filterBoxEndDate={filterBoxEndDate}
            setFilterBoxEndDate={setFilterBoxEndDate}
            changeYear={changeYear}
            changeQuarter={changeQuarter}
            getCurrentYear={getCurrentYear}
            changeYear={changeYear}
            changeQuarter={changeQuarter}
            getCurrentYear={getCurrentYear}
            loading={loading}
            open={props.open}
          /> */}
          <ResetButton
            // className="reset-btn"
            onClick={e => {
              props.setFilters({
                0: {
                  ...filters[0],
                  nameOfFilter: "Data Series",
                  selectableOptions: {}
                },
                1: {
                  nameOfFilter: "Compare SubSamples",
                  selectedCategory: "",
                  selectableOptions: {},
                  selectedTable: "Users",
                  selectedTableColumnName: "",
                  showOptions: false,
                  optionHasBeenSelected: false
                },
                2: {
                  nameOfFilter: "Data Filter",
                  selectedCategory: "",
                  selectableOptions: {},
                  selectedTable: "",
                  selectedTableColumnName: "",
                  showOptions: true,
                  optionHasBeenSelected: false
                }
              });
              setFilterBoxStartDate("2017-01-01");
              setFilterBoxEndDate(getTodaysDate());
              setUpdateUrlFlag(!updateUrlFlag);
            }}
          >
            Clear Filters
          </ResetButton>
        </form>
      </DropdownContainer>
    </>
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
  flex-direction: column;
  input {
    font-family: "Helvetica", sans-serif;
    font-size: 14px;
    margin: 0;
    border-radius: 2px;
    border: 1px solid #ccc;
    padding: 10px 8px;
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
`;
const StartEndContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const YearPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;
const YearButtons = styled.button`
  padding: 5px;
  width: 25%;
  background-color: #47837f;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  border: 0.5px solid darkgrey;
  border-radius: 5px;
  opacity: 0.75;
  &:hover {
    opacity: 1
    cursor: pointer;
  }
`;
const MonthButtons = styled.button`
  padding: 5px;
  width: 25%;
  background-color: khaki;
  color: #212121;
  font-size: 1.4rem;
  font-weight: bold;
  border: 0.5px solid darkgrey;
  border-radius: 5px;
  opacity: 0.75;
  &:hover {
    opacity: 1
    cursor: pointer;
  }
`;
const Button = styled.button`
  background: #47837f;
  width: 40%;
  color: #fff;
  font-weight: 400;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  text-align: center;
  align-self: center;
  font-size: 1.5rem;
  opacity: 0.8;
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const DropdownContainer = styled.div`
  font-family: Helvetica, sans-serif;
  color: $greyColor;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 275px;
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
    &:hover {
      color: black;
    }
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
const ResetButton = styled.p`
  text-decoration: none;
  padding: 10px 5px;
  color: white;
  background-color: slategrey;
  border: 2px solid slategrey;
  border-radius: 5px;
  width: 100px;
  font-weight: bold;
  text-align: center;
  opacity: 0.75;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

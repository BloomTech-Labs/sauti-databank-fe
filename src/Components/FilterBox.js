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
import useCalendar, { getTodaysDate } from "../hooks/useCalendar";
import { useHistory } from "react-router-dom";
import CalendarModal from "../dashboard/CalendarModal";

import { decodeToken, getToken, getSubscription } from "../dashboard/auth/Auth";
import { getAvaliableOptions, getSelectedOption } from "../OptionFunctions";

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
    getCurrentYear
  } = props;
  const [updateUrlFlag, setUpdateUrlFlag] = useState(false);
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

  const FilterSelector = props => {
    const {
      filterSelectorName,
      filters,
      setFilters,
      i,

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
    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span style={itemStyle}>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    // controls the item the user selects
    const controlStyles = {
      borderRadius: "1px solid black",

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
          backgroundColor: isDisabled ? "red" : "rgba(128, 128, 128, .15)",
          backgroundColor: isFocused && "rgba(128, 128, 128, .5)",
          borderBottom: ".25px solid grey",
          color: "#212121",
          cursor: isDisabled ? "not-allowed" : "pointer",
          // items to select
          fontSize: 15
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
            // seems to need this when this is a compoennt
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

    const RenderCheckContainer = props => {
      // do all conditional renderings using if statements for now
      let { i, filters, graphLabels } = props;
      console.log("RenderCheckContainer", i, filters[i].showOptions);

      const showOptions = (i, filters, graphLabels) => {
        if (filters[i].showOptions) {
          return (
            graphLabels[`${filters[i].selectedTableColumnName}`].labels
              // .filter(option => {return filters[i].selectableOptions[option]})
              .map(option => (
                <CategoryOptions
                  i={i}
                  filters={filters}
                  graphLabels={graphLabels}
                  option={option}
                />
              ))
          );
        } else {
          return graphLabels[`${filters[i].selectedTableColumnName}`].labels
            .filter(option => {
              return filters[i].selectableOptions[option];
            })
            .map(option => (
              <CategoryOptions
                i={i}
                filters={filters}
                graphLabels={graphLabels}
                option={option}
              />
            ));
        }
      };

      console.log("show options", i, filters[i].showOptions);
      if (i !== String(1)) {
        if (graphLabels[`${filters[i].selectedTableColumnName}`]) {
          return (
            <CheckboxContainer>
              <p>Please pick an option: </p>
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    [i]: {
                      ...filters[i],
                      showOptions: !filters[i].showOptions
                      // selectableOptions: {...optionFlags}
                    }
                    // add all the options here
                  });
                }}
              >
                {/* maybe set this one along with the selected option flag? */}
                {filters[i].showOptions ? "Hide" : "Show"}
              </button>

              {showOptions(i, filters, graphLabels)}
            </CheckboxContainer>
          );
        } else {
          return <div></div>;
        }
      } else {
        return <div></div>;
      }
    };

    return (
      <div>
        <form>
          <p>{filterSelectorName}</p>
          <Select
            defaultValue={{ label: filters[i].selectedCategory }}
            // isClearable

            formatGroupLabel={formatGroupLabel}
            components={{ Control: ControlComponent }}
            // isSearchable
            onChange={e => {
              console.log(e.label, filters[i]);
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
                [i]: {
                  ...filters[i],
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
            options={x(
              FilterBoxOptions.superCategories,
              Object.keys(filters)
                .map(filterId => {
                  return filters[filterId].selectedCategory;
                })
                .filter(selectedCategory => selectedCategory.length > 0)
            )}
          />

          <RenderCheckContainer
            i={i}
            filters={filters}
            graphLabels={graphLabels}
          />
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

  const [setup, setSetup] = useState(colourOptions[0]);
  const [loading, setLoading] = useState(false);

  console.log("filters", filters);

  let urlSearchParams = {};
  Object.keys(filters).forEach(filterId => {
    urlSearchParams = {
      ...urlSearchParams,
      ["filter" + String(filterId)]: `${
        filters[filterId].selectedTableColumnName
          ? filters[filterId].selectedTableColumnName
          : "undefined"
      },${getSelectedOption(filters, filterId)}`
    };
  });

  let ourSearch = useHistory().location.search;
  useEffect(() => {
    console.log("LOOK AT ME!!!!!!!");
    console.log(urlSearchParams);
    History.push("?" + new URLSearchParams({ ...urlSearchParams }).toString());
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
              setFilters({
                ...filters,
                [currentDataFilter]: {
                  ...filters[currentDataFilter],
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
            }}
            style={{ cursor: loading ? "auto" : "pointer" }}
          >
            Add Filter
          </Button>
        </div>
        <form>
          {tier === "ADMIN" ||
          tier === "PAID" ||
          tier === "GOV_ROLE" ||
          newSub ? (
            <DateContainer>
              <StartEndContainer>
                <span>
                  <p>Start</p>
                  <input
                    name="startData"
                    type="date"
                    value={filterBoxStartDate}
                    disabled={loading}
                    onChange={e => setFilterBoxStartDate(e.target.value)}
                  />
                </span>
                <span>
                  <p>End</p>
                  <input
                    disabled={loading}
                    name="endData"
                    type="date"
                    value={filterBoxEndDate}
                    id="today"
                    onChange={e => setFilterBoxEndDate(e.target.value)}
                  />
                </span>
              </StartEndContainer>
              <YearPicker>
                <MonthButtons onClick={changeQuarter("Q1")}>Q1</MonthButtons>
                <MonthButtons onClick={changeQuarter("Q2")}>Q2</MonthButtons>
                <MonthButtons onClick={changeQuarter("Q3")}>Q3</MonthButtons>
                <MonthButtons onClick={changeQuarter("Q4")}>Q4</MonthButtons>
                <YearButtons
                  onClick={changeYear((getCurrentYear() - 3).toString())}
                >
                  {(getCurrentYear() - 3).toString()}
                </YearButtons>
                <YearButtons
                  onClick={changeYear((getCurrentYear() - 2).toString())}
                >
                  {(getCurrentYear() - 2).toString()}
                </YearButtons>
                <YearButtons
                  onClick={changeYear((getCurrentYear() - 1).toString())}
                >
                  {(getCurrentYear() - 1).toString()}
                </YearButtons>
                <YearButtons onClick={changeYear(getCurrentYear().toString())}>
                  {getCurrentYear().toString()}
                </YearButtons>
              </YearPicker>
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
                  ...filters[0],
                  nameOfFilter: "Data Series",
                  // this way they can reset their original selected options
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
          </p>
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

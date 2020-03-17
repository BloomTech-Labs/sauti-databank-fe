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
import { getTodaysDate } from "../dashboard/CalendarModal";

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
            defaultValue={{ label: filters[i].selectedCategory }}
            // isClearable
            formatGroupLabel={formatGroupLabel}
            components={{ Control: ControlComponent }}
            // isSearchable
            onChange={e => {
              console.log(e.label, filters[i]);
              setFilters({
                ...filters,
                [i]: {
                  ...filters[i],
                  selectedCategory: e.label, //option
                  selectedTableColumnName:
                    FilterBoxOptions.default[e.label].value.type,

                  avaliableOptions: Object.keys(graphLabels).includes(
                    FilterBoxOptions.default[e.label].value.type
                  )
                    ? graphLabels[
                        `${FilterBoxOptions.default[e.label].value.type}`
                      ].labels
                    : [],
                  selectedTable: FilterBoxOptions.default[e.label].value.query,
                  // accees all the options from graphlables
                  // and put all of them in here as
                  // option : false
                  selectedOption: undefined
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
                        // selectableOptions:
                      }
                      // add all the options here
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

  const [setup, setSetup] = useState(colourOptions[0]);
  const [loading, setLoading] = useState(false);

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
    <div>
      {/* <a target="_blank" href="https://twitter.com/home?status=This%20photo%20is%20awesome!%20Check%20it%20out:%20pic.twitter.com/9Ee63f7aVp">Share on Twitter</a> */}

      <a
        target="_blank"
        href="https://twitter.com/share?ref_src=twsrc%5Etfw?text=this%20website%20is%20awesome!"
        class="twitter-share-button"
        data-show-count="false"
      >
        Tweet
      </a>

      <br />

      <div
        class="fb-share-button"
        data-href="https://blissful-pare-60612f.netlify.com/data"
        data-layout="button"
        data-size="small"
      >
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
          class="fb-xfbml-parse-ignore"
        >
          Share
        </a>
      </div>
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
                  selectedCategory: "Gender",
                  selectedOption: undefined,
                  avaliableOptions: [],
                  selectedTable: "Users",
                  selectedTableColumnName: "gender",
                  showOptions: false
                },
                1: {
                  nameOfFilter: "Compare SubSamples",
                  selectedCategory: "",
                  selectedOption: undefined,
                  avaliableOptions: [],
                  selectedTable: "Users",
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
              setFilterBoxStartDate("2017-01-01");
              setFilterBoxEndDate(getTodaysDate());
            }}
          >
            Reset
          </p>
        </form>
      </DropdownContainer>
    </div>
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

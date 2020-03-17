import React, { useState, useEffect, useCallback } from "react";
import "../App.scss";
import ReactGa from "react-ga";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { FilterBoxOptions } from "./FilterBoxOptions";
import graphLabels from "./graphLabels";
import Loader from "react-loader-spinner";

import CalendarModal, { getTodaysDate } from "../dashboard/CalendarModal";
import useCalendar from "../hooks/useCalendar";

import { decodeToken, getToken, getSubscription } from "../dashboard/auth/Auth";

export default function FilterBox(props) {
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

  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;

  const [filterBoxIndex, setFilterBoxIndex] = useState({
    type: "gender",
    query: "Users",
    label: ""
  });
  // console.log(`filterBoxIndex`, filterBoxIndex);
  const [filterBoxCrossFilter, setFilterBoxCrossFilter] = useState({
    type: "",
    query: "Users",
    label: ""
  });
  const [filterBoxAdditionalFilter, setFilterBoxAdditionalFilter] = useState({
    type: "",
    query: "",
    label: ""
  });
  // console.log(`filterBoxCrossFilter`, filterBoxCrossFilter);
  const [filterBoxIndexLabel, setFilterBoxIndexLabel] = useState("Gender");
  // console.log(`filterBoxIndexLabel`, filterBoxIndexLabel);
  const [filterBoxCrossLabel, setFilterBoxCrossLabel] = useState("");
  // console.log(`filterBoxCrossLabel`, filterBoxCrossLabel);

  const [
    filterBoxAdditionalFilterLabel,
    setFilterBoxAdditionalFilterLabel
  ] = useState("");

  // const {
  //   filterBoxStartDate,
  //   setFilterBoxStartDate,
  //   filterBoxEndDate,
  //   setFilterBoxEndDate
  // } = useCalendar();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    e => {
      if (e.target.textContent === "Submit") {
        e.preventDefault();
      }
      props.setIndex(filterBoxIndex);
      props.setIndexLabel(filterBoxIndexLabel);
      props.setCrossLabel(filterBoxCrossLabel);
      props.setCrossFilter(filterBoxCrossFilter);
      props.setAdditionalFilter(filterBoxAdditionalFilter);
      props.setStartDate(filterBoxStartDate);
      props.setEndDate(filterBoxEndDate);
    },
    [
      filterBoxAdditionalFilter,
      filterBoxCrossFilter,
      filterBoxCrossLabel,
      filterBoxEndDate,
      filterBoxIndex,
      filterBoxIndexLabel,
      filterBoxStartDate,
      props
    ]
  );

  const handleAuto = useCallback(
    e => {
      props.setIndex(filterBoxIndex);
      props.setIndexLabel(filterBoxIndexLabel);
      props.setCrossLabel(filterBoxCrossLabel);
      props.setCrossFilter(filterBoxCrossFilter);
      props.setAdditionalFilter(filterBoxAdditionalFilter);
      props.setStartDate(filterBoxStartDate);
      props.setEndDate(filterBoxEndDate);
    },
    [
      filterBoxAdditionalFilter,
      filterBoxCrossFilter,
      filterBoxCrossLabel,
      filterBoxEndDate,
      filterBoxIndex,
      filterBoxIndexLabel,
      filterBoxStartDate,
      props
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
        <form>
          <p>Choose Category</p>
          <Dropdown
            controlClassName="myControlClassName"
            arrowClassName="myArrowClassName"
            className="dropdown"
            disabled={loading}
            options={FilterBoxOptions.default}
            value={filterBoxIndexLabel}
            onChange={e => {
              setFilterBoxIndex(e.value);
              setFilterBoxIndexLabel(e.label);
              setFilterBoxIndex({
                type: e.value.type,
                query: e.value.query,
                label: e.label
              });
            }}
          />
          {graphLabels[`${filterBoxIndex.type}`] && (
            <CheckboxContainer>
              <p>Select an option to further filter the data: </p>
              {graphLabels[`${filterBoxIndex.type}`].labels.map(option => (
                <Options key={option}>
                  <input
                    type="radio"
                    name="CrossFilter"
                    value={option}
                    onChange={e => (
                      props.setFirstSelectedCheckbox({
                        [`${filterBoxIndex.type}`]: option
                      }),
                      props.setIndex(filterBoxIndex)
                    )}
                  />
                  <FilterOption>{option}</FilterOption>
                </Options>
              ))}
            </CheckboxContainer>
          )}
          <p>Choose Second Category</p>
          <Dropdown
            controlClassName="myControlClassName"
            arrowClassName="myArrowClassName"
            className="dropdown"
            disabled={loading}
            options={FilterBoxOptions.default.filter(
              obj => obj.label !== filterBoxIndexLabel
            )}
            value={filterBoxCrossLabel}
            placeholder="Select second option..."
            onChange={e => {
              setFilterBoxCrossLabel(e.label);
              setFilterBoxCrossFilter(e.value);
              setFilterBoxCrossFilter({
                type: e.value.type,
                query: e.value.query,
                label: e.label
              });
            }}
          />
          {/* ------------------------------------------------------------------------------- */}
          {graphLabels[`${filterBoxCrossFilter.type}`] && (
            <CheckboxContainer>
              <p>Select an option to further filter the data: </p>
              {graphLabels[`${filterBoxCrossFilter.type}`].labels.map(
                option => (
                  <Options key={option}>
                    <input
                      type="radio"
                      name="CrossFilter"
                      value={option}
                      onChange={e => (
                        props.setSecondSelectedCheckbox({
                          [`${filterBoxCrossFilter.type}`]: option
                        }),
                        props.setCrossFilter(filterBoxCrossFilter)
                      )}
                    />
                    <FilterOption>{option}</FilterOption>
                  </Options>
                )
              )}
            </CheckboxContainer>
          )}
          {/* ------------------------------------------------------------------------------- */}
          {props.secondCheckboxOptions.length > 1 && (
            <>
              <p>Select an option to further filter the data: </p>
              <CheckboxContainer>
                {props.secondCheckboxOptions.map(option => (
                  <Options key={option}>
                    <input
                      type="radio"
                      name="CrossFilter"
                      value={option}
                      onChange={e => {
                        props.setSecondSelectedCheckbox(
                          { [`${filterBoxCrossFilter.type}`]: option },
                          props.setCrossFilter(filterBoxCrossFilter)
                        );
                      }}
                    />
                    <FilterOption>{option}</FilterOption>
                  </Options>
                ))}
              </CheckboxContainer>
            </>
          )}
          <>
            <p>Additional Filter</p>
            <p className="disclosure">
              *This optional filter adjusts samplesize and may not always alter
              the graph appearance.
            </p>
            <Dropdown
              controlClassName="myControlClassName"
              arrowClassName="myArrowClassName"
              className="dropdown"
              // disabled={loading}
              options={FilterBoxOptions.default.filter(
                obj =>
                  obj.label !== filterBoxIndexLabel &&
                  obj.label !== filterBoxCrossLabel
              )}
              value={filterBoxAdditionalFilterLabel}
              placeholder="Select a filter..."
              onChange={e => {
                setFilterBoxAdditionalFilter({
                  type: e.value.type,
                  query: e.value.query,
                  label: e.label
                });
                setFilterBoxAdditionalFilterLabel(e.label);
                props.setCheckboxOptions([]);
              }}
            />
            <div
              className="reset-btn"
              onClick={() => {
                setFilterBoxAdditionalFilter({ type: "", query: "" });
                setFilterBoxAdditionalFilterLabel("");
                props.setAdditionalFilter({ type: "", query: "" });
                props.setCheckboxOptions([]);
                props.setSelectedCheckbox({});
                props.setFirstSelectedCheckbox({});
                props.setSecondSelectedCheckbox({});
              }}
            >
              <p>Clear Additional Filter</p>
            </div>
          </>
          {graphLabels[`${filterBoxAdditionalFilter.type}`] && (
            <CheckboxContainer>
              <p>Select an option to further filter the data: </p>
              {graphLabels[`${filterBoxAdditionalFilter.type}`].labels.map(
                option => (
                  <Options key={option}>
                    <input
                      type="radio"
                      name="CrossFilter"
                      value={option}
                      onChange={e => (
                        props.setSelectedCheckbox({
                          [`${filterBoxAdditionalFilter.type}`]: option
                        }),
                        props.setAdditionalFilter(filterBoxAdditionalFilter)
                      )}
                    />
                    <FilterOption>{option}</FilterOption>
                  </Options>
                )
              )}
            </CheckboxContainer>
          )}

          {/* {loading ? (
          <Loader
            className="options-loader"
            type="Oval"
            color="#708090"
            width={50}
            height={20}
            timeout={120000000}
          />
        ) : (
            props.checkboxOptions.length > 1 && (
              <>
                <p>Select an option to further filter the data: </p>
                <CheckboxContainer>
                  {props.checkboxOptions.map(option => (
                    <Options key={option}>
                      <input
                        type="radio"
                        name="CrossFilter"
                        value={option}
                        onChange={e => {
                          props.setSelectedCheckbox(
                            { [`${filterBoxAdditionalFilter.type}`]: option },
                            props.setAdditionalFilter(filterBoxAdditionalFilter)
                          );
                        }}
                      />
                      <FilterOption>{option}</FilterOption>
                    </Options>
                  ))}
                </CheckboxContainer>
              </>
            )
          )} */}

          {props.checkboxOptions.length > 1 && (
            <>
              <p>Select an option to further filter the data: </p>
              <CheckboxContainer>
                {props.checkboxOptions.map(option => (
                  <Options key={option}>
                    <input
                      type="radio"
                      name="CrossFilter"
                      value={option}
                      onChange={e => {
                        props.setSelectedCheckbox(
                          { [`${filterBoxAdditionalFilter.type}`]: option },
                          props.setAdditionalFilter(filterBoxAdditionalFilter)
                        );
                      }}
                    />
                    <FilterOption>{option}</FilterOption>
                  </Options>
                ))}
              </CheckboxContainer>
            </>
          )}

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
              props.setIndexLabel("Gender");
              props.setIndex({ type: "gender", query: "Users" });
              props.setCrossLabel("");
              props.setCrossFilter({ type: "", query: "Users" });
              props.setStartDate("2012-01-01");
              props.setEndDate("2020-01-08");
              props.setCheckboxOptions([]);
              props.setSelectedCheckbox({});
              props.setSecondSelectedCheckbox({});
              props.setFirstSelectedCheckbox({});
              setFilterBoxIndexLabel("Gender");
              setFilterBoxIndex({ type: "gender", query: "Users" });
              setFilterBoxCrossLabel("");
              setFilterBoxCrossFilter({ type: "", query: "Users" });
              setFilterBoxStartDate("2012-01-01");
              setFilterBoxEndDate(getTodaysDate());
              setFilterBoxAdditionalFilter({ type: "", query: "" });
              setFilterBoxAdditionalFilterLabel("");
              props.setAdditionalFilter({ type: "", query: "" });
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

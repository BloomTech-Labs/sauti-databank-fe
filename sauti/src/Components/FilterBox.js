import React, { useState, useEffect, useCallback } from "react";
import "../App.scss";
import ReactGa from "react-ga";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { FilterBoxOptions } from "./FilterBoxOptions";
import graphLabels from "./graphLabels";
import Loader from "react-loader-spinner";

export default function FilterBox(props) {
  const [filterBoxIndex, setFilterBoxIndex] = useState({ type: "request_type", query: "Sessions" });
  const [filterBoxCrossFilter, setFilterBoxCrossFilter] = useState({ type: "", query: "Users" });
  const [filterBoxIndexLabel, setFilterBoxIndexLabel] = useState("Most Requested Procedure Commodity");
  const [filterBoxArgForQuery, setFilterBoxArgForQuery] = useState("procedurecommodity");
  const [filterBoxCrossLabel, setFilterBoxCrossLabel] = useState("");
  const [filterBoxAdditionalFilter, setFilterBoxAdditionalFilter] = useState({type: '', query: ''});
  const [filterBoxAdditionalFilterLabel, setFilterBoxAdditionalFilterLabel] = useState("");
  const [filterBoxStartDate, setFilterBoxStartDate] = useState("2012-01-01");
  const [filterBoxEndDate, setFilterBoxEndDate] = useState("2020-01-08");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = useCallback(e => {
    if (e.target.textContent === "Submit"){
      e.preventDefault();
    }

    props.setIndex(filterBoxIndex);
    props.setIndexLabel(filterBoxIndexLabel);
    props.setCrossLabel(filterBoxCrossLabel);
    props.setCrossFilter(filterBoxCrossFilter);
    props.setAdditionalFilter(filterBoxAdditionalFilter);
    props.setStartDate(filterBoxStartDate);
    props.setEndDate(filterBoxEndDate);
    if (filterBoxArgForQuery) {
      props.setArgForQuery(filterBoxArgForQuery);
    }
  }, [filterBoxAdditionalFilter, filterBoxArgForQuery, filterBoxCrossFilter, filterBoxCrossLabel, filterBoxEndDate, filterBoxIndex, filterBoxIndexLabel, filterBoxStartDate, props]);
  
  const handleAuto = useCallback(e => {
    props.setIndex(filterBoxIndex);
    props.setIndexLabel(filterBoxIndexLabel);
    props.setCrossLabel(filterBoxCrossLabel);
    props.setCrossFilter(filterBoxCrossFilter);
    props.setAdditionalFilter(filterBoxAdditionalFilter);
    props.setStartDate(filterBoxStartDate);
    props.setEndDate(filterBoxEndDate);
    if (filterBoxArgForQuery) {
      props.setArgForQuery(filterBoxArgForQuery);
    }
  }, [filterBoxAdditionalFilter, filterBoxArgForQuery, filterBoxCrossFilter, filterBoxCrossLabel, filterBoxEndDate, filterBoxIndex, filterBoxIndexLabel, filterBoxStartDate, props]);
    
  useEffect(() => {
    if (!graphLabels[`${filterBoxAdditionalFilter.type}`] && filterBoxAdditionalFilter.type) {
      handleAuto()
      setLoading(true);
    }
    /* eslint-disable */
  }, [filterBoxAdditionalFilter.type])

  useEffect(() => {
    if (props.checkboxOptions.length) {
      setLoading(false);
    }
  }, [props.checkboxOptions])

  const ClickTracker = index => {
    ReactGa.event({
      category: "Option",
      action: `Clicked a Filter Option: ${index}`
    });
  };

  return (
    <DropdownContainer>
      <form>
        <p>Choose Category</p>
        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          disabled={loading}
          options={FilterBoxOptions.default.filter(obj => obj.label !== filterBoxCrossLabel)}
          value={filterBoxIndexLabel}
          onChange={e => {
            setFilterBoxIndex(e.value);
            setFilterBoxIndexLabel(e.label);
            ClickTracker(e.value.type);
            setFilterBoxAdditionalFilter({type: '', query: ''})
            props.setAdditionalFilter({type: '', query: ''})
            setFilterBoxAdditionalFilterLabel('')
            props.setCheckboxOptions([])
            props.setSelectedCheckbox({})
            if (e.value.arg) {
              setFilterBoxArgForQuery(e.value.arg);
            }
          }}
        />

        <p>Choose Second Category</p>
        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          disabled={loading}
          options={FilterBoxOptions.filtered.filter(obj => (obj.label !== filterBoxIndexLabel && obj.label !== filterBoxCrossLabel))}
          value={filterBoxCrossLabel}
          placeholder="Select second option..."
          onChange={e => {
            setFilterBoxCrossLabel(e.label);
            setFilterBoxCrossFilter(e.value);
            setFilterBoxAdditionalFilter({type: '', query: ''})
            props.setAdditionalFilter({type: '', query: ''})
            setFilterBoxAdditionalFilterLabel('')
            props.setCheckboxOptions([])
            props.setSelectedCheckbox({})
          }}
        />

        {filterBoxCrossFilter.type && (
          <>
            <p>Additional Filter</p>
            <Dropdown
              controlClassName="myControlClassName"
              arrowClassName="myArrowClassName"
              className="dropdown"
              disabled={loading}
              options={filterBoxIndex.type === 'request_type' 
                ? FilterBoxOptions.filtered.filter(obj => obj.label !== filterBoxCrossLabel) 
                : FilterBoxOptions.default.filter(obj=> (obj.label !== filterBoxIndexLabel && obj.label !== filterBoxCrossLabel))}
              value={filterBoxAdditionalFilterLabel}
              placeholder="Select a filter..."
              onChange={e => {
                if (e.value.arg) {
                  setFilterBoxAdditionalFilter({type: e.value.arg, query: e.value.query});
                } else {
                  setFilterBoxAdditionalFilter({type: e.value.type, query: e.value.query})
                };
                setFilterBoxAdditionalFilterLabel(e.label);
                props.setCheckboxOptions([]);
                ClickTracker(e.value.type);
              }}
            />
          </>
        )
        }

        {graphLabels[`${filterBoxAdditionalFilter.type}`] && (
          <CheckboxContainer>
            <p>Select an option to further filter the data: </p>
            {graphLabels[`${filterBoxAdditionalFilter.type}`].labels.map((option => (
              <Options key={option}>
                <input
                  type="radio"
                  name="CrossFilter"
                  value={option}
                  onChange={e => (
                    props.setSelectedCheckbox({ [`${filterBoxAdditionalFilter.type}`]: option })
                  )}
                />
                <FilterOption>{option}</FilterOption>
              </Options>
            ))
            )}
          </CheckboxContainer>
        )}

        {loading
          ? (
              <Loader
                className="options-loader"
                type="Oval"
                color="#708090"
                width={50}
                height={20}
                timeout={12000}
              />
          )
          : props.checkboxOptions.length > 1 && (
            <>
            <p>Select an option to further filter the data: </p>
              <CheckboxContainer>
                {(props.checkboxOptions.map(option => (
                  <Options key={option}>
                    <input
                      type="radio"
                      name="CrossFilter"
                      value={option}
                      onChange={e => {
                        props.setSelectedCheckbox({ [`request_value`]: option })
                      }}
                    />
                    <FilterOption>{option}</FilterOption>
                  </Options>
                ))
                )}
              </CheckboxContainer>
            </>
          )
        }

        {(filterBoxIndex.query === "Sessions" || filterBoxAdditionalFilter.query === 'Sessions')  && (
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
          <Button
            className="download-btn"
            onClick={() => console.log("Download CSV")}
            disabled={loading}
            style={{ cursor: loading ? "auto" : "pointer" }}
          >
            Download
          </Button>
        </div>

        <p
          className="reset-btn"
          onClick={e => {
            props.setIndexLabel("Most Requested Procedures Commodities");
            props.setIndex({ type: "request_type", query: "Sessions" });
            props.setCrossLabel("");
            props.setCrossFilter({ type: "", query: "Users" });
            props.setArgForQuery("procedurecommodity");
            props.setStartDate("2012-01-01");
            props.setEndDate("2020-01-08");
            props.setCheckboxOptions([]);
            props.setSelectedCheckbox({})
            setFilterBoxIndexLabel("Most Requested Procedures Commodities");
            setFilterBoxIndex({ type: "request_type", query: "Sessions" });
            setFilterBoxCrossLabel("");
            setFilterBoxCrossFilter({ type: "", query: "Users" });
            setFilterBoxArgForQuery("");
            setFilterBoxStartDate("2012-01-01");
            setFilterBoxEndDate("2020-01-08");
            
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

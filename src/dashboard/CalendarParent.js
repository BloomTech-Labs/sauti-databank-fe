import React from "react";
import styled from "styled-components";
import CalendarModal from "../dashboard/CalendarModal";

const CalendarParent = ({
  tier,
  newSub,
  filterBoxStartDate,
  setFilterBoxStartDate,
  filterBoxEndDate,
  setFilterBoxEndDate,
  changeYear,
  changeQuarter,
  getCurrentYear,
  loading
}) => {
  return (
    <>
      {tier === "ADMIN" || tier === "PAID" || tier === "GOV_ROLE" || newSub ? (
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
    </>
  );
};
export default CalendarParent;

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

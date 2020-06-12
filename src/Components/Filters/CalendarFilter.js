import React from "react";
import CalendarParent from "../../dashboard/CalendarParent";
import { useSelector } from "react-redux";

const CalendarFilter = () => {
  const reducerCal = useSelector(state => state.calendarReducer.calendar);
  console.log(reducerCal);

  const {
    tier,
    newSub,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeQuarter,
    getCurrentYear,
    changeYear,
    loading,
    open
  } = reducerCal;
  if (open === "bar") {
    return (
      <CalendarParent
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
        open={open}
      />
    );
  } else {
    return <></>;
  }
};
export default CalendarFilter;

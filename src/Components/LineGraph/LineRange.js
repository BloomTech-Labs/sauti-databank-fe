import React, { useState, useEffect } from "react";
import DateSlider from "./DateSlider";
import { getRangePeriods } from "../LineGraphHelpers/Range";

const LineRange = ({ time, setTime, timeInUse }) => {
  //Find range for slider
  //should run after time period is updated
  let allPeriodsArray = [];
  const rangeValues = getRangePeriods(time, allPeriodsArray);
  const totalRangePeriods = rangeValues.periodsAmount;
  allPeriodsArray = rangeValues.allPeriodsArray;

  //numbers displayed above the slider
  //displays first and last of all periods in selected range
  const [range, setRange] = useState([
    allPeriodsArray[0],
    allPeriodsArray[totalRangePeriods - 1]
  ]);

  //Sets range for Slider, after time is changed
  useEffect(() => {
    setRange([allPeriodsArray[0], allPeriodsArray[totalRangePeriods - 1]]);
  }, [time]);
  return (
    <>
      <DateSlider
        range={range}
        setRange={setRange}
        totalRangePeriods={totalRangePeriods}
        allPeriodsArray={allPeriodsArray}
        timeInUse={timeInUse}
        time={time}
        setTime={setTime}
      />
    </>
  );
};
export default LineRange;

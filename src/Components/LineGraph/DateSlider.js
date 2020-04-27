import React from "react";
import "antd/dist/antd.css";

import SliderDisplay from "./SliderDisplay";
import Slider2 from "./Slider2";

import { updateRange } from "../LineGraphHelpers/updateRange";

const DateSlider = ({
  range,
  setRange,
  totalRangePeriods,
  timeInUse,
  allPeriodsArray,
  time,
  setTime
}) => {
  function onChange(event) {
    setRange([allPeriodsArray[event[0]], allPeriodsArray[event[1] - 1]]);
  }

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
    setTime(updateRange(timeInUse, value));
  }

  return (
    <>
      <div id="slider">
        <div>
          <h2>Selected Range</h2>
          <p>{`${range[0]} - ${range[1]}`}</p>
        </div>
        <SliderDisplay
          totalRangePeriods={totalRangePeriods}
          timeInUse={timeInUse}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <Slider2
          totalRangePeriods={totalRangePeriods}
          range={range}
          setRange={setRange}
          //totalPeriods={totalPeriods}
          allPeriodsArray={allPeriodsArray}
          time={time}
          setTime={setTime}
          timeInUse={timeInUse}
        />
      </div>
    </>
  );
};
export default DateSlider;

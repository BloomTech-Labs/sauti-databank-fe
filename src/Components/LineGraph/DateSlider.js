import React from "react";
import "antd/dist/antd.css";

import SliderDisplay from "./SliderDisplay";
import Slider2 from "./Slider2";
// import moment from "moment";

// const { RangePicker } = DatePicker;

// const dateFormat = "YYYY/MM/DD";
// const monthFormat = "YYYY/MM";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const DateSlider = ({
  range,
  setRange,
  totalPeriods,
  allPeriodsArray,
  time,
  setTime
}) => {
  function onChange(event) {
    console.log(`onChange`, event);
    //setRange(`${allPeriodsArray[event[0]]} - ${allPeriodsArray[event[1] - 1]}`);
    setRange([allPeriodsArray[event[0]], allPeriodsArray[event[1] - 1]]);
  }

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
    // setRange(`${allPeriodsArray[0]} - ${allPeriodsArray[totalPeriods - 1]}`)
  }

  return (
    <>
      <div id="slider">
        <div>
          <h2>Selected Range</h2>
          <p>{`${range[0]} - ${range[1]}`}</p>
        </div>
        <SliderDisplay
          totalPeriods={totalPeriods}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <Slider2
          totalPeriods={totalPeriods}
          range={range}
          setRange={setRange}
          allPeriodsArray={allPeriodsArray}
          time={time}
          setTime={setTime}
        />
      </div>
    </>
  );
};
export default DateSlider;

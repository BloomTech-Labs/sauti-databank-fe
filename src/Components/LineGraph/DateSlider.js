import React, { useEffect } from "react";
import { Slider } from "antd";
import "antd/dist/antd.css";

import SliderDisplay from "./SliderDisplay";
// import moment from "moment";

// const { RangePicker } = DatePicker;

// const dateFormat = "YYYY/MM/DD";
// const monthFormat = "YYYY/MM";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const DateSlider = ({ range, setRange, totalPeriods, allPeriodsArray }) => {
  // console.log(`allPeriods`,allPeriodsArray, `totalPeriods`,totalPeriods);
  // console.log(`range`,range)
  function onChange(event) {
    console.log(`onChange`, event);
    setRange(`${allPeriodsArray[event[0]]} - ${allPeriodsArray[event[1] - 1]}`);
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
          <p>{range}</p>
        </div>
        <SliderDisplay
          totalPeriods={totalPeriods}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        {/* <div className="sensorSlider">
          <p>Select date range</p>
          <Slider
            range
            min={0}
            max={totalPeriods}
            step={1}
            defaultValue={[0, totalPeriods]}
            onChange={onChange}
          />
        </div> */}
      </div>
      {/* <RangePicker
        defaultValue={[
          moment("2015/01/01", dateFormat),
          moment("2015/01/01", dateFormat)
        ]}
        format={dateFormat}
      /> */}
    </>
  );
};
export default DateSlider;

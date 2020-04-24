import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Slider } from "antd";
import { DatePicker } from "antd";
// import moment from "moment";

// const { RangePicker } = DatePicker;

// const dateFormat = "YYYY/MM/DD";
// const monthFormat = "YYYY/MM";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const DateSlider = ({ range, setRange, totalPeriods, allPeriodsArray }) => {
  console.log(allPeriodsArray);
  function onChange(event) {
    setRange(`${allPeriodsArray[event[0]]} - ${allPeriodsArray[event[1] - 1]}`);
  }

  useEffect(
    allPeriodsArray => {
      console.log(allPeriodsArray);
      // setRange(`${allPeriodsArray[event[0]]} - ${allPeriodsArray[event[1] - 1]}`)
    },
    [allPeriodsArray]
  );

  return (
    <>
      <div id="slider">
        <div>
          <h2>Selected Range</h2>
          <p>{range}</p>
        </div>
        <div className="sensorSlider">
          <p>Select date range</p>
          <Slider
            range
            min={0}
            max={totalPeriods}
            step={1}
            defaultValue={[0, totalPeriods]}
            onChange={onChange}
          />
        </div>
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

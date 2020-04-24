import React, { useState } from "react";
import "antd/dist/antd.css";
import { Slider } from "antd";
import { DatePicker } from "antd";
// import moment from "moment";

// const { RangePicker } = DatePicker;

// const dateFormat = "YYYY/MM/DD";
// const monthFormat = "YYYY/MM";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const DateSlider = props => {
  function onAfterChange() {}

  const totalPeriods = props.time.length;

  let allPeriodsArray = [];
  for (let i = 0; i < props.time.length; i++) {
    let item = props.time[i];
    for (let key in item) {
      if (key === "date") {
        allPeriodsArray.push(item[key]);
      }
    }
  }
  console.log(allPeriodsArray);
  const [displayDate, setDisplayDate] = useState([
    `${allPeriodsArray[0]} - ${allPeriodsArray[totalPeriods - 1]}`
  ]);
  function onChange(event) {
    console.log(allPeriodsArray[event[1] - 1]);
    setDisplayDate(
      `${allPeriodsArray[event[0]]} - ${allPeriodsArray[event[1] - 1]}`
    );
  }

  function onAfterChange() {}

  const toggleSensor = () => {
    let x = document.getElementById("slider");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  return (
    <>
      <button onClick={toggleSensor}></button>
      <div id="slider">
        <div>
          <h2>Selected Range</h2>
          {/* <p>{first} - {last}</p>  */}
          <p>{displayDate}</p>
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

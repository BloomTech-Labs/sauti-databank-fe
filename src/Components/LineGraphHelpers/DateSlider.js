import React from "react";
import "antd/dist/antd.css";
import { Slider } from "antd";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const DateSlider = props => {
  let first = props.time[0].date;
  first = first.replace(/-/g, "");
  console.log(first);
  let last = props.time[props.time.length - 1].date;
  last = last.replace(/-/g, "");
  console.log(last);

  let lowest = 2017;
  let highest = 2019;
  // let lowest = Math.min(...physical_id)

  // let highest = Math.max(...physical_id)

  let highestList = [];
  let finalList = [];

  // function onAfterChange(value) {
  //   grid.map(e => {
  //     if (e.physical_id <= value[1]) {
  //       return highestList.push(e)
  //     }
  //   })
  //   highestList.map(e => {
  //     if (e.physical_id >= value[0]) {
  //       return finalList.push(e)
  //     }
  //   })
  // }

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
        <div className="sensorSlider">
          <p>Select date range</p>
          <Slider
            range
            min={2017.06}
            max={2019}
            step={0.01}
            defaultValue={[2017.06, 2019]}
            // onAfterChange={onAfterChange}
          />
        </div>
      </div>
      <RangePicker
        defaultValue={[
          moment("2015/01/01", dateFormat),
          moment("2015/01/01", dateFormat)
        ]}
        format={dateFormat}
      />
    </>
  );
};
export default DateSlider;

import React from "react";
import "antd/dist/antd.css";
import { Slider } from "antd";

const DateSlider = () => {
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
            min={lowest}
            max={highest}
            step={10}
            defaultValue={[lowest, highest]}
            // onAfterChange={onAfterChange}
          />
        </div>
      </div>
    </>
  );
};
export default DateSlider;

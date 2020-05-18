import React, { useEffect } from "react";
import "antd/dist/antd.css";
import Slider2 from "./Slider2";

const DateSlider = ({
  range,
  setRange,
  totalRangePeriods,
  timeInUse,
  allPeriodsArray,
  time,
  setTime
}) => {
  useEffect(() => {
    setRange([allPeriodsArray[0], allPeriodsArray[totalRangePeriods - 1]]);
  }, [time]);

  return (
    <>
      <div id="slider">
        <Slider2
          totalRangePeriods={totalRangePeriods}
          range={range}
          setRange={setRange}
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

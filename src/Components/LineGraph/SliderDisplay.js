import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import { timeInUsePeriodsArray } from "../LineGraphHelpers/updateRange";

const SliderDisplay = ({
  totalRangePeriods,
  onChange,
  onAfterChange,
  timeInUse
}) => {
  const [defaultSelect, setDefaultSelect] = useState([0, totalRangePeriods]);

  let rangeOptions = timeInUsePeriodsArray(timeInUse);
  const timeInUsePeriods = rangeOptions.length;

  useEffect(() => {
    setDefaultSelect([0, timeInUsePeriods]);
  }, [timeInUsePeriods]);

  return (
    <div className="Slider">
      <p>Select date range</p>
      <Slider
        range
        min={0}
        max={timeInUsePeriods}
        step={1}
        defaultValue={defaultSelect}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  );
};
export default SliderDisplay;

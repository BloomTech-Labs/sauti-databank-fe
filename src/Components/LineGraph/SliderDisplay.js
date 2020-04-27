import React from "react";
import { Slider } from "antd";
//import { DatePicker } from "antd";

const SliderDisplay = ({ totalRangePeriods, onChange, onAfterChange }) => {
  console.log(`totalRangePeriods`, totalRangePeriods);

  return (
    <div className="Slider">
      <p>Select date range</p>
      <Slider
        range
        min={0}
        max={totalRangePeriods}
        step={1}
        defaultValue={[0, totalRangePeriods]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  );
};
export default SliderDisplay;

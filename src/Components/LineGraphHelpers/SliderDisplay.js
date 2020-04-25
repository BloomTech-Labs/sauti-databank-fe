import React, { useEffect } from "react";
import { Slider } from "antd";
//import { DatePicker } from "antd";

const SliderDisplay = ({ totalPeriods, onChange, onAfterChange }) => {
  console.log(`totalPeriods`, totalPeriods);

  return (
    <div className="sensorSlider">
      <p>Select date range</p>
      <Slider
        range
        min={0}
        max={totalPeriods}
        step={1}
        defaultValue={[0, totalPeriods]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  );
};
export default SliderDisplay;

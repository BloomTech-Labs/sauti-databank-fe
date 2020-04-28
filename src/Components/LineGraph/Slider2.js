import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import {
  updateRange,
  timeInUsePeriodsArray
} from "../LineGraphHelpers/updateRange";

const useStyles = makeStyles({
  root: {
    width: 600,
    marginLeft: "5%"
  },
  rangeSlider: {
    fontSize: "2rem",
    paddingBottom: "2%"
  }
});

//Data loads value is 0 - totalRangePeriods, makes length of slider
//value should always be based on total length of time period being used.
export default function RangeSlider({
  totalRangePeriods,
  range,
  setRange,
  timeInUse,
  setTime
}) {
  const classes = useStyles();
  const [value, setValue] = useState([0, totalRangePeriods]);

  //when changing time period, slider will reset to give full range of new time period
  useEffect(() => {
    setValue([0, totalRangePeriods]);
  }, [timeInUse]);

  //all options of time period being used
  let rangeOptions = timeInUsePeriodsArray(timeInUse);
  const max = rangeOptions.length;

  const handleChange = (event, newValue) => {
    setRange([rangeOptions[value[0]], rangeOptions[value[1] - 1]]);
    setValue(newValue);
  };

  //updates chart based on selected values for all available values in timeInUse
  function onAfterChange() {
    setTime(updateRange(timeInUse, value));
  }

  return (
    <div className={classes.root}>
      <div className={classes.rangeSlider}>{`${range[0]} - ${range[1]}`}</div>
      <Slider
        value={value}
        onChange={handleChange}
        onClick={onAfterChange}
        aria-labelledby="range-slider"
        marks
        min={0}
        max={max}
      />
    </div>
  );
}

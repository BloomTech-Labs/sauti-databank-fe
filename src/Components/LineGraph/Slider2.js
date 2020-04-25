import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import { updateRange } from "../LineGraphHelpers/updateRange";

const useStyles = makeStyles({
  root: {
    width: 600
  }
});

function valuetext(range) {
  return `${range}°C`;
}

export default function RangeSlider({
  totalPeriods,
  range,
  setRange,
  allPeriodsArray,
  time,
  setTime
}) {
  console.log(`totalPeriods Slider2`, totalPeriods);
  const classes = useStyles();
  const [value, setValue] = React.useState([0, totalPeriods]);

  useEffect(() => {
    setValue([0, totalPeriods]);
  }, [totalPeriods]);

  //   function onChangeSlider(event) {
  //     console.log(`onChange`, event);
  //     setRange(`${allPeriodsArray[event[0]]} - ${allPeriodsArray[event[1] - 1]}`);
  //   }

  const handleChange = (event, newValue) => {
    setRange([allPeriodsArray[value[0]], allPeriodsArray[value[1] - 1]]);
    setValue(newValue);
  };

  function onAfterChange() {
    setTime(updateRange(time, value));
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        <p>{`${range[0]} - ${range[1]}`}</p>
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onClick={onAfterChange}
        //  onChange={onChangeSlider}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}

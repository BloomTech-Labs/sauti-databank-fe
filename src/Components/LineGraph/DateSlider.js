import React, { useEffect } from "react";

import Slider2 from "./Slider2";
import Grid from "@material-ui/core/Grid";

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
      <Grid container style={{ paddingLeft: "25%" }}>
        <Slider2
          totalRangePeriods={totalRangePeriods}
          range={range}
          setRange={setRange}
          allPeriodsArray={allPeriodsArray}
          time={time}
          setTime={setTime}
          timeInUse={timeInUse}
        />
      </Grid>
    </>
  );
};
export default DateSlider;

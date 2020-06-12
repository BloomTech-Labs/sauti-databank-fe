import React from "react";
import CalendarParent from "../../dashboard/CalendarParent";

const CalendarFilter = () => {
  return (
    <CalendarParent
      tier={tier}
      newSub={newSub}
      filterBoxStartDate={filterBoxStartDate}
      setFilterBoxStartDate={setFilterBoxStartDate}
      filterBoxEndDate={filterBoxEndDate}
      setFilterBoxEndDate={setFilterBoxEndDate}
      changeYear={changeYear}
      changeQuarter={changeQuarter}
      getCurrentYear={getCurrentYear}
      changeYear={changeYear}
      changeQuarter={changeQuarter}
      getCurrentYear={getCurrentYear}
      loading={loading}
      open={props.open}
    />
  );
};
return CalendarFilter;

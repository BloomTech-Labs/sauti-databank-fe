import { useState } from "react";
import { getTodaysDate } from "../dashboard/CalendarModal";

const useCalendar = () => {
  const [filterBoxStartDate, setFilterBoxStartDate] = useState("2017-01-01");
  const [filterBoxEndDate, setFilterBoxEndDate] = useState(getTodaysDate());

  return {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  };
};

export default useCalendar;

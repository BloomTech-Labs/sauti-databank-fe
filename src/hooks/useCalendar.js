import { useState } from "react";

export default function useCalendar() {
  const [filterBoxStartDate, setFilterBoxStartDate] = useState("2017-01-01");
  const [filterBoxEndDate, setFilterBoxEndDate] = useState(getTodaysDate());

  // changeYear and changeQuarter are event handlers
  const changeYear = year => event => {
    event.preventDefault();
    setFilterBoxStartDate(`${year}-01-01`);
    setFilterBoxEndDate(`${year}-12-31`);
  };

  const changeQuarter = quarter => event => {
    event.preventDefault();
    const [currentYear] = filterBoxStartDate.split("-");
    switch (quarter) {
      case "Q1":
        setFilterBoxStartDate(`${currentYear}-01-01`);
        setFilterBoxEndDate(`${currentYear}-03-31`);
        break;
      case "Q2":
        setFilterBoxStartDate(`${currentYear}-04-01`);
        setFilterBoxEndDate(`${currentYear}-06-30`);
        break;
      case "Q3":
        setFilterBoxStartDate(`${currentYear}-07-01`);
        setFilterBoxEndDate(`${currentYear}-09-30`);
        break;
      case "Q4":
        setFilterBoxStartDate(`${currentYear}-10-01`);
        setFilterBoxEndDate(`${currentYear}-12-31`);
        break;
      default:
        return;
    }
  };

  return {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeYear,
    changeQuarter,
    getCurrentYear
  };
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getTodaysDate() {
  const [_, month, day, year] = `${new Date()}`.split(" ");
  return `${year}-${formatMonth(month)}-${day}`;
  function formatMonth(month) {
    switch (month) {
      case "Jan":
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
    }
  }
}

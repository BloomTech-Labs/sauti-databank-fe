import React from "react";
import { topChecked, sumAll } from "../LineGraphHelpers/topChecked";
import { hundredScale } from "../LineGraphHelpers/scale100";

import LineTime from "./LineTime";

// Data Series will need to be Sessions for chart to work

//top 7 should be checked
//y-axis recalculate 100 based upon what is checked

const LineGraph = ({ filter0, buttonBar, data }) => {
  const lineArray = [...data.sessionsData];

  //Make an array of options that can be selected.
  // const keysArray = Object.keys(filter0.selectableOptions);

  //get option selected from the first filter
  const selectedTableColumnName = filter0.selectedTableColumnName;
  // 1. eliminate null values

  let lineNonNull = [];
  for (let i = 0; i < lineArray.length; i++) {
    let obj = lineArray[i];
    if (!Object.values(obj).includes(null)) {
      lineNonNull.push(obj);
    }
  }

  lineNonNull.map(item => {
    item["created_mo"] = item.created_date.substring(0, 7);
    item["created_year"] = item.created_date.substring(0, 4);
  });
  console.log("filter0", filter0);
  //FOR MONTHLY DISPLAY
  //3. Group categories together with date
  const reduceBy1 = (objectArray, property, property1) => {
    return objectArray.reduce(function(total, obj) {
      //combine date and cat type to make a new key
      let key = obj[property] + obj[property1];
      //make a new object if the year-mo and category not existing
      if (!total[key]) {
        total[key] = [];
      }
      //if year-mo, then push obj
      total[key].push(obj);
      return total;
    }, {});
  };

  const keysInOrder = [];
  topChecked(lineNonNull, selectedTableColumnName, keysInOrder);

  //a checkbox is created for each category that has more than 10 data points
  let allBoxes = [];
  for (let key in sumAll) {
    if (sumAll[key].length > 10) {
      allBoxes.push(key);
    }
  }
  allBoxes = allBoxes.sort();

  const checkboxes = [];
  for (let i = 0; i < allBoxes.length; i++) {
    checkboxes.push({
      name: allBoxes[i],
      key: `checkbox[i]`,
      label: allBoxes[i]
    });
  }

  //By year-month
  let groupedPeople1 = reduceBy1(
    lineNonNull,
    "created_mo",
    selectedTableColumnName
  );

  //By year
  let groupedYear = reduceBy1(
    lineNonNull,
    "created_year",
    selectedTableColumnName
  );

  // 4. get total amount per month
  //map through obj and get length of arrays
  let datesAmounts = {};

  function mapObj(mapper, o) {
    for (let key of Object.keys(o)) {
      datesAmounts[key] = mapper(o[key]);
    }
  }

  mapObj(function length(val) {
    return val.length;
  }, groupedPeople1);

  //By year
  let yearAmounts = {};

  function mapYear(mapper, o) {
    for (let key of Object.keys(o)) {
      yearAmounts[key] = mapper(o[key]);
    }
  }

  mapYear(function length(val) {
    return val.length;
  }, groupedYear);

  //5. combine date and quantity of categories, Monthly
  // let currentYM = "2017-01";
  // let dateObj = {};
  const dateCatArray = [];
  //let objectCombined = {};
  function combineAmountsToDates(o) {
    for (let key of Object.keys(o)) {
      let yearMo = key.slice(0, 7);
      let cat = key.slice(7, 100);
      let obj = {};
      obj["date"] = yearMo;
      obj[cat] = o[key];

      dateCatArray.push(obj);
    }
  }

  combineAmountsToDates(datesAmounts);

  //Yearly
  const yearCatArray = [];
  // let objectCombined = {};
  function combineAmountsToYear(o) {
    for (let key of Object.keys(o)) {
      let year = key.slice(0, 4);
      let cat = key.slice(4, 100);
      let obj = {};
      obj["date"] = year;
      obj[cat] = o[key];

      yearCatArray.push(obj);
      // }
    }
  }

  combineAmountsToYear(yearAmounts);

  //6. combine together to create object for Monthly data
  let usedDates = [];
  let itemDate = {};
  let allCombined = [];
  for (let i = 0; i < dateCatArray.length; i++) {
    let date = dateCatArray[i].date;
    if (usedDates.includes(date)) {
      itemDate = {
        ...itemDate,
        ...dateCatArray[i]
      };
      allCombined.push(itemDate);
    } else {
      let arraykeys = Object.keys(dateCatArray[i]);
      let arrayValues = Object.values(dateCatArray[i]);
      let newDate = {};
      newDate["date"] = date;
      newDate[arraykeys[1]] = arrayValues[1];
      itemDate = newDate;
      usedDates.push(date);
      allCombined.push(itemDate);
    }
  }

  //6.a. combine together to create object for Yearly data
  let usedYears = [];
  let itemYear = {};
  let allCombinedYears = [];
  for (let i = 0; i < yearCatArray.length; i++) {
    let date = yearCatArray[i].date;
    if (usedYears.includes(date)) {
      itemYear = {
        ...itemYear,
        ...yearCatArray[i]
      };
      allCombinedYears.push(itemYear);
    } else {
      let arraykeys = Object.keys(yearCatArray[i]);
      let arrayValues = Object.values(yearCatArray[i]);
      let newDate = {};
      newDate["date"] = date;
      newDate[arraykeys[1]] = arrayValues[1];
      itemYear = newDate;
      usedYears.push(date);
      allCombinedYears.push(itemYear);
    }
  }

  //Update Monthly
  let updated = [];
  for (let i = 0; i < allCombined.length; i++) {
    if (
      i + 1 < allCombined.length &&
      allCombined[i].date !== allCombined[i + 1].date
    ) {
      updated.push(allCombined[i]);
    } else if (i + 1 === allCombined.length) {
      updated.push(allCombined[i]);
    }
  }
  //Update Yearly
  let updatedYearly = [];
  // let update7 = [];
  for (let i = 0; i < allCombinedYears.length; i++) {
    if (
      i + 1 < allCombinedYears.length &&
      allCombinedYears[i].date !== allCombinedYears[i + 1].date
    ) {
      updatedYearly.push(allCombinedYears[i]);
    } else if (i + 1 === allCombinedYears.length) {
      updatedYearly.push(allCombinedYears[i]);
    }
  }

  //use updated yearly initially, then use selected items.

  const yearAll = hundredScale(updatedYearly);
  const year100 = yearAll.array;

  const monthAll = hundredScale(updated);
  const month100 = monthAll.array;

  //Quarterly
  const byQuarter = lineNonNull;

  for (let i = 0; i < byQuarter.length; i++) {
    let month = byQuarter[i]["created_mo"].slice(5, 7);
    let item = byQuarter[i];
    if (month === "01" || month === "02" || month === "03") {
      item["created_qtr"] = item["created_mo"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q1");
    } else if (month === "04" || month === "05" || month === "06") {
      item["created_qtr"] = item["created_mo"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q2");
    } else if (month === "07" || month === "08" || month === "09") {
      item["created_qtr"] = item["created_mo"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q3");
    } else if (month === "10" || month === "11" || month === "12") {
      item["created_qtr"] = item["created_mo"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q4");
    }
  }

  //3. Put categories together by Quarter
  const catByQtr = (objectArray, property, property1) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property] + obj[property1];
      //combine date and cat type to make a new key

      //make a new object if the year-mo and category not existing
      if (!total[key]) {
        total[key] = [];
      }
      //if year-qtr, then push obj
      total[key].push(obj);
      return total;
    }, {});
  };

  let groupedItems = catByQtr(
    byQuarter,
    "created_qtr",
    selectedTableColumnName
  );

  // 4.  get total amount per item in each quarter
  // map through obj and get length of arrays
  let qtrAmounts = {};
  function mapObjQtr(mapper, o) {
    for (let key of Object.keys(o)) {
      qtrAmounts[key] = mapper(o[key]);
    }
  }

  mapObjQtr(function length(val) {
    return val.length;
  }, groupedItems);

  //5. combine categories by quarter

  const dateCatArrayQtr = [];
  function combineAmountsToQtr(o) {
    for (let key of Object.keys(o)) {
      let yearQtr = key.slice(0, 7);
      let cat = key.slice(7, 100);
      let obj = {};
      obj["date"] = yearQtr;
      obj[cat] = o[key];

      dateCatArrayQtr.push(obj);
      // }
    }
  }

  combineAmountsToQtr(qtrAmounts);

  //6. combine together to create object for Monthly data
  let usedDatesQtr = [];
  let itemDateQtr = {};
  let allCombinedQtr = [];
  for (let i = 0; i < dateCatArrayQtr.length; i++) {
    let date = dateCatArrayQtr[i].date;

    if (usedDatesQtr.includes(date)) {
      itemDateQtr = {
        ...itemDateQtr,
        ...dateCatArrayQtr[i]
      };
      allCombinedQtr.push(itemDateQtr);
    } else {
      let arraykeys = Object.keys(dateCatArrayQtr[i]);
      let arrayValues = Object.values(dateCatArrayQtr[i]);

      let newDate = {};
      newDate["date"] = date;
      newDate[arraykeys[1]] = arrayValues[1];

      itemDateQtr = newDate;
      usedDatesQtr.push(date);
      allCombinedQtr.push(itemDateQtr);
    }
  }

  //6. update array
  const updatedQtr = [];
  for (let i = 0; i < allCombinedQtr.length; i++) {
    if (
      i + 1 < allCombinedQtr.length &&
      allCombinedQtr[i].date !== allCombinedQtr[i + 1].date
    ) {
      updatedQtr.push(allCombinedQtr[i]);
    } else if (i + 1 === allCombinedQtr.length) {
      updatedQtr.push(allCombinedQtr[i]);
    }
  }

  const quarterAll = hundredScale(updatedQtr);
  const quarter100 = quarterAll.array;

  let top7 = {};
  for (let i = 0; i < keysInOrder.length; i++) {
    let obj = {};
    obj[keysInOrder[i]] = true;
    top7 = { ...top7, ...obj };
  }

  return (
    <>
      <LineTime
        month100={month100}
        quarter100={quarter100}
        year100={year100}
        top7={top7}
        checkboxes={checkboxes}
        filter0={filter0}
      />
    </>
  );
};

export default LineGraph;

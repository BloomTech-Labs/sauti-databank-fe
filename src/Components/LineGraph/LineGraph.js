import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import CheckBox from "../CheckBox";
import "../../Components/scss/lineGraph.scss";

import { topChecked, sumAll } from "../LineGraphHelpers/topChecked";
import { hundredScale } from "../LineGraphHelpers/scale100";
import { getHighestSelected } from "../LineGraphHelpers/selectedCheckboxes";

import DateSlider from "./DateSlider";
import { getRangePeriods } from "../LineGraphHelpers/Range";

// Data Series will need to be Sessions for chart to work

//top 7 should be checked
//y-axis recalculate 100 based upon what is checked

const LineGraph = ({ filter0, buttonBar, data }) => {
  console.log(data);
  //const data = useSelector(state => state.queriesReducer.dataInfo);
  const lineArray = data.sessionsData;

  //Make an array of options that can be selected.
  // const keysArray = Object.keys(filter0.selectableOptions);

  //get option selected from the first filter
  const selectedTableColumnName = filter0.selectedTableColumnName;
  // 1. eliminate null values
  const lineNonNull = [];

  for (let i = 0; i < lineArray.length; i++) {
    if (
      lineArray[i][selectedTableColumnName] !== null &&
      lineArray[i][selectedTableColumnName] !== ""
    ) {
      lineNonNull.push(lineArray[i]);
    }
  }
  console.log(`lineNonNull`, lineNonNull);
  // 2. convert date to year-month
  lineNonNull.map(item => {
    item["created_date"] = item.created_date.substring(0, 7);
  });

  //2.a. created_year
  lineNonNull.map(item => {
    item["created_year"] = item.created_date.substring(0, 4);
  });

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
    "created_date",
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
  // const monthHighs = monthAll.highNumerical;
  // const moCurrentHigh = monthAll.high;

  //  Quarterly Data

  // 1. eliminate null values
  const lineNonNullQtr = [];
  for (let i = 0; i < lineArray.length; i++) {
    if (
      data.sessionsData[i][selectedTableColumnName] !== null &&
      data.sessionsData[i][selectedTableColumnName] !== ""
    ) {
      lineNonNullQtr.push(data.sessionsData[i]);
    }
  }

  //2. grab only year-mo
  lineNonNullQtr.map(item => {
    item["created_date"] = item.created_date.substring(0, 7);
  });

  const byQuarter = lineNonNullQtr;

  for (let i = 0; i < byQuarter.length; i++) {
    let month = byQuarter[i]["created_date"].slice(5, 7);
    let item = byQuarter[i];
    if (month === "01" || month === "02" || month === "03") {
      item["created_qtr"] = item["created_date"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q1");
    } else if (month === "04" || month === "05" || month === "06") {
      item["created_qtr"] = item["created_date"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q2");
    } else if (month === "07" || month === "08" || month === "09") {
      item["created_qtr"] = item["created_date"].slice(0, 5);
      item["created_qtr"] = item["created_qtr"].concat("Q3");
    } else if (month === "10" || month === "11" || month === "12") {
      item["created_qtr"] = item["created_date"].slice(0, 5);
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

  // const qtrHighest = highestValue(updatedQtr);
  const quarterAll = hundredScale(updatedQtr);
  const quarter100 = quarterAll.array;
  // const quarterHighs = quarterAll.highNumerical;
  // const qtrCurrentHigh = quarterAll.high;

  let top7 = {};
  for (let i = 0; i < keysInOrder.length; i++) {
    let obj = {};
    obj[keysInOrder[i]] = true;
    top7 = { ...top7, ...obj };
  }

  const [time, setTime] = useState(month100);
  const [timeInUse, setTimeInUse] = useState(month100);

  const [checkedItems, setCheckedItems] = useState(top7);

  //Find range for slider
  //should run after time period is updated
  let allPeriodsArray = [];
  const rangeValues = getRangePeriods(time, allPeriodsArray);
  const totalRangePeriods = rangeValues.periodsAmount;
  allPeriodsArray = rangeValues.allPeriodsArray;

  //numbers displayed above the slider
  //displays first and last of all periods in selected range
  const [range, setRange] = useState([
    allPeriodsArray[0],
    allPeriodsArray[totalRangePeriods - 1]
  ]);

  //Sets range for Slider, after time is changed
  useEffect(() => {
    setRange([allPeriodsArray[0], allPeriodsArray[totalRangePeriods - 1]]);
  }, [time]);

  let display = [];
  if (Object.entries(checkedItems).length > 0) {
    for (let i = 0; i < Object.entries(checkedItems).length; i++) {
      let bbb = Object.entries(checkedItems)[i];
      if (bbb.includes(true)) {
        display.push(bbb[0]);
      }
    }
  }

  let highest = getHighestSelected(time, display);

  //multiple functions onClick
  function moOnClick(event) {
    setTime(month100);
    setTimeInUse(month100);
  }

  function qtrOnClick(event) {
    setTime(quarter100);
    setTimeInUse(quarter100);
  }

  function yrOnClick(event) {
    setTime(year100);
    setTimeInUse(year100);
  }

  //checkboxs to display individual lines
  function handleChange(event) {
    let selected = event.target.name;
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  }

  // items to display on line chart
  const zero = display[0];
  const one = display[1];
  const two = display[2];
  const three = display[3];
  const four = display[4];
  const five = display[5];
  const six = display[6];
  const seven = display[7];

  //To reset all selected checkboxes
  const handleReset = event => {
    setCheckedItems(checkedItems);
  };

  return (
    <>
      <button onClick={buttonBar}>Display Bar Chart</button>
      <div className="toggleDateContainer">
        <p
          className={time === month100 ? "monthBtnOn" : "monthBtnOff"}
          onClick={moOnClick}
        >
          {" "}
          Monthly
        </p>
        <p
          className={time === quarter100 ? "monthBtnOn" : "monthBtnOff"}
          onClick={qtrOnClick}
        >
          {" "}
          Quarterly
        </p>
        <p
          className={time === year100 ? "monthBtnOn" : "monthBtnOff"}
          onClick={yrOnClick}
        >
          {" "}
          Yearly
        </p>
      </div>

      {/* <button onClick={() => setQuarter(!isQuarter)}>By Quarter</button> */}
      <ResponsiveContainer width="95%" height={600}>
        <LineChart
          data={time}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[0, highest]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={zero}
            stroke="blue"
            dot={false}
            // activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey={one} stroke="purple" dot={false} />
          <Line type="monotone" dataKey={two} stroke="orange" dot={false} />
          <Line type="monotone" dataKey={three} stroke="green" dot={false} />
          <Line type="monotone" dataKey={four} stroke="red" dot={false} />
          <Line type="monotone" dataKey={five} stroke="tan" dot={false} />
          <Line type="monotone" dataKey={six} stroke="yellow" dot={false} />
          <Line type="monotone" dataKey={seven} stroke="brown" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <button className="buttonReset" onClick={handleReset}>
        Reset
      </button>
      <div className="boxes">
        <React.Fragment>
          {checkboxes.map(option => (
            <label key={option.key}>
              <CheckBox
                name={option.name}
                checked={checkedItems[option.name]}
                handleChange={handleChange}
              />

              {option.name}
            </label>
          ))}
        </React.Fragment>
      </div>
      <DateSlider
        range={range}
        setRange={setRange}
        totalRangePeriods={totalRangePeriods}
        allPeriodsArray={allPeriodsArray}
        timeInUse={timeInUse}
        time={time}
        setTime={setTime}
      />
    </>
  );
};

export default LineGraph;

import React, { useState } from "react";
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

import CheckBox from "./CheckBox";
import "../Components/scss/lineGraph.scss";
import Graph from "./Graph";

// Data Series will need to be Sessions for chart to work

const LineGraph = ({ data, filter0, buttonHandle }) => {
  const [isQuarter, setQuarter] = useState(false);

  // const quarterHandle = e => {
  //   e.preventDefault();
  //   setQuarter(!isQuarter);
  // };

  const lineArray = data.sessionsData;

  //Make an array of options that can be selected.
  const keysArray = Object.keys(filter0.selectableOptions);

  //make checkbox options for graph
  const checkboxes = [];
  for (let i = 0; i < keysArray.length; i++) {
    checkboxes.push({
      name: keysArray[i],
      key: `checkbox[i]`,
      label: keysArray[i]
    });
  }

  //get option selected from the first filter
  const selectedTableColumnName = filter0.selectedTableColumnName;
  // 1. eliminate null values
  const lineNonNull = [];
  for (let i = 0; i < lineArray.length; i++) {
    if (lineArray[i][selectedTableColumnName] !== null) {
      lineNonNull.push(lineArray[i]);
    }
  }

  // 2. convert date to year-month
  lineNonNull.map(item => {
    item["created_date"] = item.created_date.substring(0, 7);
  });

  //2.a. created_year
  lineNonNull.map(item => {
    item["created_year"] = item.created_date.substring(0, 4);
  });

  console.log(`lineNonNull`, lineNonNull);
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
  console.log(`groupedYear`, groupedYear);
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
  console.log(`Monthly`, groupedPeople1);

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
  console.log(`groupedYear`, groupedYear);

  //5. combine date and quantity of categories, Monthly
  let currentYM = "2017-01";
  let dateObj = {};
  const dateCatArray = [];
  let objectCombined = {};
  function combineAmountsToDates(o) {
    for (let key of Object.keys(o)) {
      let yearMo = key.slice(0, 7);
      let cat = key.slice(7, 100);
      let obj = {};
      obj["date"] = yearMo;
      obj[cat] = o[key];
      // let currentObj = {};
      // currentObj[cat] = o[key];

      // dateObj = {};
      // dateObj["date"] = currentYM;
      // currentYM = yearMo;

      dateCatArray.push(obj);
      // }
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

  console.log(`yearCatArray`, yearCatArray);

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
  //console.log(`allCombined updated`, allCombined);

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
  console.log(`allCombined updated`, allCombinedYears);

  //Update Monthly
  let updated = [];
  for (let i = 0; i < allCombined.length; i++) {
    if (
      i + 1 < allCombined.length &&
      allCombined[i].date !== allCombined[i + 1].date
    ) {
      updated.push(allCombined[i]);
    }
  }

  //Update Yearly
  let updatedYearly = [];
  for (let i = 0; i < allCombinedYears.length; i++) {
    if (
      i + 1 < allCombinedYears.length &&
      allCombinedYears[i].date !== allCombinedYears[i + 1].date
    ) {
      updatedYearly.push(allCombinedYears[i]);
    }
  }
  console.log(allCombinedYears);
  console.log(`yearly`, updatedYearly);

  //Find highest value
  console.log(updatedYearly);
  let allYearValues = [];
  // for (let i = 0; i < updatedYearly.length; i++) {
  //   let item = updatedYearly[i];
  //   let values = Object.values(item);
  //   for (let i = 0; i < values.length; i++) {
  //     if (typeof values[i] !== "string") {
  //       allYearValues.push(values[i]);
  //     }
  //   }
  // }

  function highestValue(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      console.log(item);
      let values = Object.values(item);
      console.log(values);
      for (let i = 0; i < values.length; i++) {
        if (typeof values[i] !== "string") {
          console.log(values[i]);
          newArray.push(values[i]);
        }
      }
    }
    console.log(newArray);
    return Math.max(...newArray);
  }

  // let yrNewArray = [];
  const yearlyHighest = highestValue(updatedYearly);
  const monthlyHighest = highestValue(updated);
  console.log(monthlyHighest);
  console.log(yearlyHighest);
  // console.log(yrNewArray)

  //console.log(allYearValues);
  //const highestYrValue = Math.max(...allYearValues);
  //console.log(highestYrValue);

  function hundredScale(array, high) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      for (let key in item) {
        if (key !== "date") {
          item[key] = (item[key] / high) * 100;
          item[key] = item[key].toFixed(2);
        }
      }
    }
    return array;
  }

  const year100 = hundredScale(updatedYearly, yearlyHighest);
  const month100 = hundredScale(updated, monthlyHighest);
  console.log(year100);
  console.log(updated);
  console.log(month100);

  // for (let i=0; i < updatedYearly.length; i++){
  //   let item = updatedYearly[i]
  //   let obj = {}
  //   for(let key in item){
  //     if (key !== 'date'){
  //        item[key] = item[key]/highestYrValue*100
  //        item[key] = item[key].toFixed(2)
  //     }

  //   }
  //   console.log(item)
  // }
  // console.log(updatedYearly)

  //  Quarterly Data

  // 1. eliminate null values
  const lineNonNullQtr = [];
  for (let i = 0; i < lineArray.length; i++) {
    if (data.sessionsData[i][selectedTableColumnName] !== null) {
      lineNonNullQtr.push(data.sessionsData[i]);
    }
  }

  //2. grab only year-mo
  lineNonNullQtr.map(item => {
    item["created_date"] = item.created_date.substring(0, 7);
  });

  const byQuarter = lineNonNullQtr;
  //created_date: "2017-06"  -> 2017-Q2
  //|| month === '02' || month || '03'
  // let byQuarter = [];
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
  //let currentYM = "2017-Q1";
  let qtrObj = {};
  const dateCatArrayQtr = [];
  //let objectCombined = {};
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
  console.log(`allCombinedQtr`, allCombinedQtr);

  //6. update array
  const updatedQtr = [];
  for (let i = 0; i < allCombinedQtr.length; i++) {
    if (
      i + 1 < allCombinedQtr.length &&
      allCombinedQtr[i].date !== allCombinedQtr[i + 1].date
    ) {
      updatedQtr.push(allCombinedQtr[i]);
    }
  }

  //   //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  const [checkedItems, setCheckedItems] = useState({});
  console.log(checkedItems);
  console.log(typeof checkedItems);

  let display = [];
  if (Object.entries(checkedItems).length > 0) {
    for (let i = 0; i < Object.entries(checkedItems).length; i++) {
      let bbb = Object.entries(checkedItems)[i];
      if (bbb.includes(true)) {
        display.push(bbb[0]);
      }
    }
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

  //checkboxs to display individual lines
  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  //To reset all selected checkboxes
  const handleReset = event => {
    console.log("reset");
    setCheckedItems({});
  };

  return (
    <>
      <button onClick={buttonHandle}>Display Bar Chart</button>
      <div className="toggleDateContainer">
        <p
          className={!isQuarter ? "monthBtnOn" : "monthBtnOff"}
          onClick={() => setQuarter(!isQuarter)}
        >
          {" "}
          Monthly
        </p>
        <p
          className={isQuarter ? "monthBtnOn" : "monthBtnOff"}
          onClick={() => setQuarter(!isQuarter)}
        >
          {" "}
          Quarterly
        </p>
        <p
          className={isQuarter ? "monthBtnOn" : "monthBtnOff"}
          onClick={() => setQuarter(!isQuarter)}
        >
          {" "}
          Yearly
        </p>
      </div>

      {/* <button onClick={() => setQuarter(!isQuarter)}>By Quarter</button> */}
      <ResponsiveContainer width="95%" height={600}>
        <LineChart
          data={isQuarter ? year100 : updated}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[0, 100]} />
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
        </LineChart>
      </ResponsiveContainer>
      <button className="buttonReset" onClick={() => setCheckedItems({})}>
        Reset
      </button>
      <div className="boxes">
        <React.Fragment>
          {checkboxes.map(option => (
            <label key={option.key}>
              <CheckBox
                name={option.name}
                checked={checkedItems[option.name]}
                onChange={handleChange}
              />

              {option.name}
            </label>
          ))}
        </React.Fragment>
      </div>
    </>
  );
};

export default LineGraph;

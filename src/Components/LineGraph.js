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

// Data Series will need to be Sessions for chart to work

const LineGraph = ({ data, filter0 }) => {
  console.log(data.sessionsData);

  let lineArray = data.sessionsData;

  //Make an array of x values
  const keysArray = Object.keys(filter0.selectableOptions);
  console.log(filter0);
  console.log(keysArray);
  console.log(typeof keysArray);
  //make checkboxes for graph
  const checkboxes = [];
  for (let i = 0; i < keysArray.length; i++) {
    checkboxes.push({
      name: keysArray[i],
      key: `checkbox[i]`,
      label: keysArray[i]
    });
  }

  //get selected Table ColumnName
  const selectedTableColumnName = filter0.selectedTableColumnName;
  console.log(filter0.selectedTableColumnName);
  console.log(lineArray);
  // eliminate null values
  const lineNonNull = [];

  for (let i = 0; i < lineArray.length; i++) {
    //console.log(lineArray[i][selectedTableColumnName])
    if (lineArray[i][selectedTableColumnName] !== null) {
      lineNonNull.push(lineArray[i]);
    }
  }

  console.log(lineNonNull);
  //convert date to year-month
  lineNonNull.map(item => {
    item["created_date"] = item.created_date.substring(0, 7);
  });
  console.log(typeof lineNonNull);

  //Group by date
  // Array.prototype.groupedBy = function(prop){
  // return this.reduce(function(groups,item){
  //   const val = item[prop]
  //   groups[val] = groups[val]||[]
  //   groups[val].push(item)
  //   return groups
  // }, {})
  // }
  // const groupedBy = lineNonNull.groupedBy('created_date')
  // console.log(groupedBy)
  // console.log(typeof groupedBy)

  const reduceBy = (objectArray, property) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property];
      if (!total[key]) {
        total[key] = [];
      }
      total[key].push(obj);
      return total;
    }, {});
  };
  let groupedPeople = reduceBy(lineNonNull, "created_date");
  console.log(groupedPeople);

  let dateObj = {};
  let dateArray = [];
  function mObj(o) {
    for (let key of Object.keys(o)) {
      dateArray.push({ date: key });
      // dateObj[key] = mapper(o[key])
    }
  }

  mObj(groupedPeople);

  console.log(dateArray);

  const reduceBy1 = (objectArray, property, property1) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property] + obj[property1];
      if (!total[key]) {
        total[key] = [];
      }
      total[key].push(obj);
      return total;
    }, {});
  };
  let groupedPeople1 = reduceBy1(
    lineNonNull,
    "created_date",
    selectedTableColumnName
  );
  console.log(groupedPeople1);

  // get total amount per month
  //map through obj and get length or arrays
  let datesAmounts = {};

  function mapObj(mapper, o) {
    for (let key of Object.keys(o)) {
      datesAmounts[key] = mapper(o[key]);
    }
  }

  mapObj(function length(val) {
    return val.length;
  }, groupedPeople1);

  console.log(datesAmounts);

  //combine date and quantity of cat
  // let currentYM = "2017-01";
  // const dateCatArray = [];
  // let objectCombined = {};
  // function combineAmountsToDates(o) {
  //   for (let key of Object.keys(o)) {
  //     let yearMo = key.slice(0, 7);
  //     let cat = key.slice(7, 20);
  //     let obj = {};
  //     obj["date"] = yearMo;
  //     obj[cat] = o[key];
  //     let currentObj = {};
  //     currentObj[cat] = o[key];

  //     dateObj = {};
  //     dateObj["date"] = currentYM;
  //     //console.log('currentYM', currentYM)
  //     //console.log('yearMo', yearMo)
  //     if (yearMo === currentYM) {
  //       objectCombined = {
  //         ...dateObj,
  //         ...objectCombined,
  //         ...currentObj
  //       };
  //       dateCatArray.push(objectCombined);
  //     } else {
  //       currentYM = yearMo;
  //       console.log(obj)
  //       dateCatArray.push(obj);
  //     }
  //   }
  // }

  //combine date and quantity of cat
  let currentYM = "2017-01";
  const dateCatArray = [];
  let objectCombined = {};
  function combineAmountsToDates(o) {
    for (let key of Object.keys(o)) {
      let yearMo = key.slice(0, 7);
      let cat = key.slice(7, 20);
      let obj = {};
      obj["date"] = yearMo;
      obj[cat] = o[key];
      let currentObj = {};
      currentObj[cat] = o[key];

      dateObj = {};
      dateObj["date"] = currentYM;
      //console.log('currentYM', currentYM)
      //console.log('yearMo', yearMo)
      // if (yearMo === currentYM) {
      //   objectCombined = {
      //     ...dateObj,
      //     ...objectCombined,
      //     ...currentObj
      //   };
      //   dateCatArray.push(objectCombined);
      // } else {
      currentYM = yearMo;
      console.log(obj);
      dateCatArray.push(obj);
      // }
    }
  }

  combineAmountsToDates(datesAmounts);
  console.log(datesAmounts);
  console.log(dateCatArray);
  console.log(typeof dateCatArray);

  //combine together to create object
  let usedDates = [];
  let itemDate = {};
  let allCombined = [];
  for (let i = 0; i < dateCatArray.length; i++) {
    let date = dateCatArray[i].date;

    if (usedDates.includes(date)) {
      console.log("included");
      itemDate = {
        ...itemDate,
        ...dateCatArray[i]
      };
      allCombined.push(itemDate);
      console.log(itemDate);
    } else {
      console.log("not included");
      let arraykeys = Object.keys(dateCatArray[i]);
      let arrayValues = Object.values(dateCatArray[i]);
      console.log(arraykeys);
      let newDate = {};
      newDate["date"] = date;
      newDate[arraykeys[1]] = arrayValues[1];
      console.log(newDate);
      itemDate = newDate;
      usedDates.push(date);
      allCombined.push(itemDate);
    }
  }
  console.log(allCombined);

  var arrangedData = {};
  const newDateArra = dateCatArray.map(function(v, i) {
    //console.log(v)
    let currentDate = v["date"];
    //  let obj = {}
    //  obj['date'] = currentDate
    //  console.log(obj)
    for (let i = 0; i < dateCatArray.length; i++)
      if (dateCatArray[i]["date"] === currentDate) {
        // console.log(Object.keys(v))
        return { ...v, newitem: Object.values(dateCatArray) };
      } else {
        currentDate = dateCatArray[i]["date"];
        return { ...v };
      }
  });

  //array of objects by date, with line name : value

  //seperate by date
  var result = {};
  lineArray.forEach(function(v, i) {
    //console.log(v["created_date"])
    if (!result[v["created_date"]]) {
      result[v] = result[v["created_date"]];
    } else {
      result[v].push(i);
      console.log(`result2`, result);
    }
  });
  console.log(result);

  //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  const [checkedItems, setCheckedItems] = useState({});
  console.log(`const checkedItems`, checkedItems);

  //checkboxs to display individual lines
  const handleChange = event => {
    console.log(event.target.checked);
    console.log(checkedItems);
    console.log(Object.keys(checkedItems));
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
    console.log("checkedItems: ", checkedItems);
  };

  const handleReset = event => {
    setCheckedItems({});
  };

  return (
    <>
      <LineChart
        width={800}
        height={500}
        data={allCombined}
        // data={dateCatArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line
        type="monotone"
        dataKey="Millet"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Peas" stroke="#82ca9d" /> */}
        <Line type="monotone" dataKey="" stroke="#8875d9" />
      </LineChart>
      <button onClick={handleReset}>Reset</button>
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
    </>
  );
};

export default LineGraph;

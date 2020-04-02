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
import LineByQuarter from "./LineByQuarter";
import LineMonthly from "./LineMonthly";

// Data Series will need to be Sessions for chart to work

const LineGraph = ({ data, filter0, buttonHandle }) => {
  console.log(data.sessionsData);
  const [isQuarter, setQuarter] = useState(false);

  console.log(`isQuarter`, isQuarter);

  const quarterHandle = e => {
    e.preventDefault();
    setQuarter(!isQuarter);
  };

  //   let lineArray = data.sessionsData;

  //   //Make an array of x values
  //   const keysArray = Object.keys(filter0.selectableOptions);
  //   // console.log(filter0);
  //   // console.log(keysArray);
  //   // console.log(typeof keysArray);
  //   //make checkboxes for graph
  //   const checkboxes = [];
  //   for (let i = 0; i < keysArray.length; i++) {
  //     checkboxes.push({
  //       name: keysArray[i],
  //       key: `checkbox[i]`,
  //       label: keysArray[i]
  //     });
  //   }

  //   //get selected Table ColumnName
  //   const selectedTableColumnName = filter0.selectedTableColumnName;

  //   // 1. eliminate null values
  //   const lineNonNull = [];

  //   for (let i = 0; i < lineArray.length; i++) {
  //     //console.log(lineArray[i][selectedTableColumnName])
  //     if (lineArray[i][selectedTableColumnName] !== null) {
  //       lineNonNull.push(lineArray[i]);
  //     }
  //   }

  //   // console.log(lineNonNull);

  //   //2. convert date to year-month
  //   lineNonNull.map(item => {
  //     item["created_date"] = item.created_date.substring(0, 7);
  //   });
  //   //console.log(typeof lineNonNull);

  //   //3. Group together by year-month
  //   // const reduceBy = (objectArray, property) => {
  //   //   return objectArray.reduce(function(total, obj) {
  //   //     let key = obj[property];
  //   //     if (!total[key]) {
  //   //       total[key] = [];
  //   //     }
  //   //     total[key].push(obj);
  //   //     return total;
  //   //   }, {});
  //   // };
  //   // let groupedPeople = reduceBy(lineNonNull, "created_date");
  //   // console.log(groupedPeople);

  //   //Makes Array of dates
  //   // let dateObj = {};
  //   // let dateArray = [];
  //   // function mObj(o) {
  //   //   for (let key of Object.keys(o)) {
  //   //     dateArray.push({ date: key });
  //   //     // dateObj[key] = mapper(o[key])
  //   //   }
  //   // }

  //   // mObj(groupedPeople);

  //   //console.log(dateArray);

  //   //3. Group categories together with date
  //   const reduceBy1 = (objectArray, property, property1) => {
  //     return objectArray.reduce(function(total, obj) {
  //       let key = obj[property] + obj[property1];
  //       //combine date and cat type to make a new key

  //       //make a new object if the year-mo and category not existing
  //       if (!total[key]) {
  //         total[key] = [];
  //       }
  //       //if year-mo, then push obj
  //       total[key].push(obj);
  //       return total;
  //     }, {});
  //   };
  //   let groupedPeople1 = reduceBy1(
  //     lineNonNull,
  //     "created_date",
  //     selectedTableColumnName
  //   );

  //  // console.log(`lineNonNull`, lineNonNull);

  //   // 4. get total amount per month
  //   //map through obj and get length of arrays
  //   let datesAmounts = {};

  //   function mapObj(mapper, o) {
  //     for (let key of Object.keys(o)) {
  //       datesAmounts[key] = mapper(o[key]);
  //     }
  //   }

  //   mapObj(function length(val) {
  //     return val.length;
  //   }, groupedPeople1);

  //   //console.log(datesAmounts);

  //   //5. combine date and quantity of cat
  //   let currentYM = "2017-01";
  //   let dateObj = {};
  //   const dateCatArray = [];
  //   let objectCombined = {};
  //   function combineAmountsToDates(o) {
  //     for (let key of Object.keys(o)) {
  //       let yearMo = key.slice(0, 7);
  //       let cat = key.slice(7, 100);
  //       let obj = {};
  //       obj["date"] = yearMo;
  //       obj[cat] = o[key];
  //       // let currentObj = {};
  //       // currentObj[cat] = o[key];

  //       // dateObj = {};
  //       // dateObj["date"] = currentYM;
  //       // currentYM = yearMo;
  //       //console.log(obj);
  //       dateCatArray.push(obj);
  //       // }
  //     }
  //   }

  //   combineAmountsToDates(datesAmounts);
  //   // console.log(datesAmounts);
  //   // console.log(dateCatArray);
  //   // console.log(Object.values(dateCatArray));
  //   // console.log(typeof dateCatArray);

  //   //6. combine together to create object for Monthly data
  //   let usedDates = [];
  //   let itemDate = {};
  //   let allCombined = [];
  //   for (let i = 0; i < dateCatArray.length; i++) {
  //     let date = dateCatArray[i].date;

  //     if (usedDates.includes(date)) {
  //       //console.log("included");
  //       itemDate = {
  //         ...itemDate,
  //         ...dateCatArray[i]
  //       };
  //       allCombined.push(itemDate);
  //       //console.log(itemDate);
  //     } else {
  //       // allCombined.push(itemDate);
  //      // console.log("not included");
  //       let arraykeys = Object.keys(dateCatArray[i]);
  //       let arrayValues = Object.values(dateCatArray[i]);
  //       // console.log(arraykeys);
  //       let newDate = {};
  //       newDate["date"] = date;
  //       newDate[arraykeys[1]] = arrayValues[1];
  //       //console.log(newDate);
  //       itemDate = newDate;
  //       usedDates.push(date);
  //       allCombined.push(itemDate);
  //     }
  //   }
  //   console.log(`allCombined`, allCombined);

  //   //combine together to create object for Quarterly Data
  //   // let quarterDates = [];
  //   // let itemQuarter = dateCatArray[0];
  //   // console.log(itemQuarter)
  //   // let qtrCombined = [];
  //   // for (let i = 1; i < dateCatArray.length; i++) {
  //   //   let date = dateCatArray[i].date;
  //   //   let month = date.slice(5, 8);
  //   //   // console.log(`month`,month)
  //   //   // console.log(typeof month)
  //   //   // let previousItemMo = dateCatArray[i - 1].date.slice(5, 8);
  //   //   // console.log(`previousMonth`,previousItemMo)

  //   //   if (month === "01" || month === "04" || month === "07" || month === "10"){
  //   //    // console.log("new");
  //   //     // itemQuarter = {
  //   //     //   ...itemQuarter,
  //   //     //   ...dateCatArray[i]
  //   //     // };
  //   //     // qtrCombined.push(itemQuarter);
  //   //     //console.log(itemDate);
  //   //   } else {
  //   //     // allCombined.push(itemDate);
  //   //     console.log("add to object");
  //   //     // let arraykeys = Object.keys(dateCatArray[i]);
  //   //     // let arrayValues = Object.values(dateCatArray[i]);
  //   //     // // console.log(arraykeys);
  //   //     // let newDate = {};
  //   //     // newDate["date"] = date;
  //   //     // newDate[arraykeys[1]] = arrayValues[1];
  //   //     //console.log(newDate);
  //   //     itemQuarter = dateCatArray[i];

  //   //     qtrCombined.push(itemQuarter);
  //   //   }
  //   // }
  //   // console.log(`qtrCombined`, qtrCombined);

  //   //   if($date[i] == $date[i+1]) {
  //   //     //push date to array
  //   // }

  //   let enterDate = [];
  //   let updated = [];
  //   for (let i = 0; i < allCombined.length; i++) {
  //     if (
  //       i + 1 < allCombined.length &&
  //       allCombined[i].date !== allCombined[i + 1].date
  //     ) {
  //       updated.push(allCombined[i]);
  //     }
  //   }
  //   //console.log(updated);
  //   //console.log(itemDate);

  //   var arrangedData = {};
  //   const newDateArra = dateCatArray.map(function(v, i) {
  //     //console.log(v)
  //     let currentDate = v["date"];

  //     for (let i = 0; i < dateCatArray.length; i++)
  //       if (dateCatArray[i]["date"] === currentDate) {
  //         // console.log(Object.keys(v))
  //         return { ...v, newitem: Object.values(dateCatArray) };
  //       } else {
  //         currentDate = dateCatArray[i]["date"];
  //         return { ...v };
  //       }
  //   });

  //   //array of objects by date, with line name : value

  //   //seperate by date
  //   var result = {};
  //   lineArray.forEach(function(v, i) {
  //     //console.log(v["created_date"])
  //     if (!result[v["created_date"]]) {
  //       result[v] = result[v["created_date"]];
  //     } else {
  //       result[v].push(i);
  //       console.log(`result2`, result);
  //     }
  //   });
  //   console.log(result);

  //   //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  //   const [checkedItems, setCheckedItems] = useState([]);

  //   let display = [];
  //   if (Object.entries(checkedItems).length > 0) {
  //     for (let i = 0; i < Object.entries(checkedItems).length; i++) {
  //       let bbb = Object.entries(checkedItems)[i];
  //       if (bbb.includes(true)) {
  //         display.push(bbb[0]);
  //       }
  //     }
  //   }

  //   // items to display on line chart
  //   const zero = display[0];
  //   const one = display[1];
  //   const two = display[2];
  //   const three = display[3];
  //   const four = display[4];
  //   const five = display[5];

  //   //zero = 'Cereals - Ric'

  //   //checkboxs to display individual lines
  //   const handleChange = event => {
  //     setCheckedItems({
  //       ...checkedItems,
  //       [event.target.name]: event.target.checked
  //     });
  //   };

  //   const handleReset = event => {
  //     setCheckedItems({});
  //   };

  //const quarterData = LineByQuarter(lineNonNull, selectedTableColumnName)

  if (isQuarter === false) {
    return (
      <>
        <button onClick={buttonHandle}>Display Bar Chart</button>
        <button onClick={quarterHandle}>Quarterly</button>
        <LineMonthly
          data={data}
          filter0={filter0}
          buttonHandle={buttonHandle}
        />
      </>
    );
  } else {
    return (
      <>
        <button onClick={buttonHandle}>Display Bar Chart</button>
        <button onClick={quarterHandle}>Monthly</button>
        <LineByQuarter
          data={data}
          filter0={filter0}
          buttonHandle={buttonHandle}
        />
      </>
    );

    {
      /* <button onClick={buttonHandle}>Display Bar Chart</button>
      <button onClick={()=> setQuarter(!isQuarter)}>By Quarter</button>
      if({isQuarter} === false){}
      <LineChart
        width={1000}
        height={400}
        data={updated}
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
      </React.Fragment> */
    }
  }
};

export default LineGraph;

import React from "react";

const LineByQuarter = ({ lineNonNull, selectedTableColumnName }) => {
  //created_date: "2017-06"  -> 2017-Q2
  //|| month === '02' || month || '03'
  let byQuarter = [];
  for (let i = 0; i < lineNonNull.length; i++) {
    let month = lineNonNull[i]["created_date"].slice(5, 7);
    let item = lineNonNull[i];
    if (month === "01" || month === "02" || month === "03") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q1");
      byQuarter.push(item);
    } else if (month === "04" || month === "05" || month === "06") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q2");
      byQuarter.push(item);
    } else if (month === "07" || month === "08" || month === "09") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q3");
      byQuarter.push(item);
    } else if (month === "10" || month === "11" || month === "12") {
      item["created_date"] = item["created_date"].slice(0, 5);
      item["created_date"] = item["created_date"].concat("Q4");
      byQuarter.push(item);
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
  //console.log(`groupedQtr`, groupedQtr)
  console.log(typeof groupedQtr);

  console.log(`selectedTableColumnName`, selectedTableColumnName);
  let groupedItems = catByQtr(
    lineNonNull,
    "created_date",
    selectedTableColumnName
  );
  console.log(groupedItems);

  //4.  get total amount per item in each quarter
  //map through obj and get length of arrays
  let qtrAmounts = {};

  function mapObj(mapper, o) {
    for (let key of Object.keys(o)) {
      qtrAmounts[key] = mapper(o[key]);
    }
  }

  mapObj(function length(val) {
    return val.length;
  }, groupedItems);

  console.log(qtrAmounts);

  //5. combine categories by quarter
  let currentYM = "2017-Q1";
  let qtrObj = {};
  const dateCatArray = [];
  let objectCombined = {};
  function combineAmountsToQtr(o) {
    for (let key of Object.keys(o)) {
      let yearQtr = key.slice(0, 7);
      let cat = key.slice(7, 100);
      let obj = {};
      obj["date"] = yearQtr;
      obj[cat] = o[key];

      dateCatArray.push(obj);
      // }
    }
  }

  combineAmountsToQtr(qtrAmounts);
  // console.log(datesAmounts);
  console.log(dateCatArray);
  console.log(Object.values(dateCatArray));

  //6. combine together to create object for Monthly data
  let usedDates = [];
  let itemDate = {};
  let allCombined = [];
  for (let i = 0; i < dateCatArray.length; i++) {
    let date = dateCatArray[i].date;

    if (usedDates.includes(date)) {
      //console.log("included");
      itemDate = {
        ...itemDate,
        ...dateCatArray[i]
      };
      allCombined.push(itemDate);
      //console.log(itemDate);
    } else {
      // allCombined.push(itemDate);
      console.log("not included");
      let arraykeys = Object.keys(dateCatArray[i]);
      let arrayValues = Object.values(dateCatArray[i]);
      // console.log(arraykeys);
      let newDate = {};
      newDate["date"] = date;
      newDate[arraykeys[1]] = arrayValues[1];
      //console.log(newDate);
      itemDate = newDate;
      usedDates.push(date);
      allCombined.push(itemDate);
    }
  }
  console.log(`allCombined`, allCombined);

  //6. update array
  let updatedQtr = [];
  for (let i = 0; i < allCombined.length; i++) {
    if (
      i + 1 < allCombined.length &&
      allCombined[i].date !== allCombined[i + 1].date
    ) {
      updatedQtr.push(allCombined[i]);
    }
  }
  console.log(updatedQtr);
  console.log(itemDate);

  return <></>;
};
export default LineByQuarter;

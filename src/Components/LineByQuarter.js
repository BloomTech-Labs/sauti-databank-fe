import React from "react";

const LineByQuarter = ({ lineNonNull, selectedTableColumnName }) => {
  // console.log(data.sessionsData);
  // const [quarter, setQuarter] = useState(false);

  // const quarterHandle = () => {
  //   setQuarter(!quarter);
  // };

  // let lineArray = data.sessionsData;

  // //Make an array of x values
  // const keysArray = Object.keys(filter0.selectableOptions);
  // // console.log(filter0);
  // // console.log(keysArray);
  // // console.log(typeof keysArray);
  // //make checkboxes for graph
  // const checkboxes = [];
  // for (let i = 0; i < keysArray.length; i++) {
  //   checkboxes.push({
  //     name: keysArray[i],
  //     key: `checkbox[i]`,
  //     label: keysArray[i]
  //   });
  // }

  // //get selected Table ColumnName
  // const selectedTableColumnName = filter0.selectedTableColumnName;
  // // console.log(filter0.selectedTableColumnName);
  // // console.log(lineArray);
  // // eliminate null values
  // const lineNonNull = [];

  // for (let i = 0; i < lineArray.length; i++) {
  //   //console.log(lineArray[i][selectedTableColumnName])
  //   if (lineArray[i][selectedTableColumnName] !== null) {
  //     lineNonNull.push(lineArray[i]);
  //   }
  // }

  // // console.log(lineNonNull);

  // //convert date to year-month
  // lineNonNull.map(item => {
  //   item["created_date"] = item.created_date.substring(0, 7);
  // });
  // console.log(typeof lineNonNull);

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
  // console.log(byQuarter)

  //Group into Quarters
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
  let groupedQtr = reduceBy(lineNonNull, "created_date");
  console.log(groupedQtr);

  //Put categories together by Quarter
  const reduceBy1 = (objectArray, property, property1) => {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property] + obj[property1];
      //combine date and cat type to make a new key

      //make a new object if the year-mo and category not existing
      if (!total[key]) {
        total[key] = [];
      }
      //if year-mo, then push obj
      total[key].push(obj);
      return total;
    }, {});
  };
  let groupedPeople1 = reduceBy1(
    groupedQtr,
    "created_date",
    selectedTableColumnName
  );

  return <></>;
};
export default LineByQuarter;

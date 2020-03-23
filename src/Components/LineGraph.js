import React from "react";

//import "./styles.css";
import { ResponsiveLine } from "@nivo/line";

const LineGraph = ({ data, filter1 }) => {
  console.log(data.sessionsData);
  let lineData = data.sessionsData;
  //  console.log(lineData)
  //  console.log(filter1.selectedTableColumnName)
  //  console.log(filter1.avaliableOptions)
  const type = filter1.selectedTableColumnName;
  let category = [];
  category = filter1.avaliableOptions;

  let cat;
  let filteredArray;
  let datesItems = [];
  let datesArray = [];
  let resultArray = [];
  for (let i = 0; i < category.length; i++) {
    cat = category[i];
    //  console.log(cat)
    //  console.log(type)
    filteredArray = lineData.filter(e => e[type] == cat);
    // console.log(`filteredArray`,filteredArray)

    for (let i = 0; i < filteredArray.length; i++) {
      let date = filteredArray[i]["created_date"];
      if (typeof filteredArray[i]["created_date"] !== "undefined") {
        datesItems.push({
          item: filteredArray[i][type],
          created_date: filteredArray[i]["created_date"]
        });
        //console.log(datesItems[i]['created_date'])
        datesArray.push(filteredArray[i]["created_date"]);
      }

      //let subS = filteredArray[i]["created_date"]
    }

    datesItems.map(item => {
      //only keep year and month
      item.created_date = item.created_date.substring(0, 7);
    });
    //console.log(datesArray)
    let datesOnly = [];
    datesArray.map(item => {
      //take only year and month
      item = item.substring(0, 7);
      datesOnly.push(item);
    });
    console.log(datesOnly);
    // var occurance = function(datesOnly){
    var result = {};
    datesOnly.forEach(function(v, i) {
      if (!result[v]) {
        result[v] = [i];
      } else {
        result[v].push(i);
      }
    });
    console.log(result);
    //console.log(Object.entries(result))
    console.log(Object.keys(result));
    console.log(Object.values(result));
    console.log(Object.entries(result));
    let total = Object.entries(result);
    console.log(total.length);
    console.log(typeof total);
    resultArray = [];
    for (var o in result) {
      console.log(o);
      resultArray.push({ x: o, y: result[o].length });
    }
    console.log(resultArray);
  }
  const works = [
    {
      id: "read",
      data: resultArray
    }
  ];
  console.log(works);
  function chart(works) {
    return (
      <ResponsiveLine
        data={works}
        margin={{
          top: 0,
          right: 50,
          bottom: 50,
          left: 50
        }}
        yScale={{
          type: "linear",
          stacked: false
        }}
        xScale={{
          type: "time",
          precision: "day",
          format: "native"
        }}
        axisBottom={{
          format: "%b %d"
        }}
      />
    );
  }
  return (
    <>
      <div className="App">
        <React.Fragment>
          <h1>As Expected</h1>
          {chart(works)}
        </React.Fragment>
      </div>
    </>
  );
};
export default LineGraph;

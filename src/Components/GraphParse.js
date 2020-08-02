import React, { useEffect } from "react";
import dataParse from "./dataParse";
import Graph from "./Graph";
import { filterByDate } from "../DataParseHelpers/filterByDate";

const GraphParse = ({
  data,
  filters,
  queryType,
  filterBoxStartDate,
  filterBoxEndDate,
  setChartDataSM
}) => {
  console.log(
    "data",
    data,
    "end",
    filterBoxEndDate,
    "start",
    filterBoxStartDate
  );
  //maybe will need something like this in else statement to prevent errors: data.sessionData != undefined &&
  if (queryType === "sessionsData" && filterBoxStartDate && filterBoxEndDate) {
    data = filterByDate(data, filterBoxStartDate, filterBoxEndDate);
  }

  //used on SocialMedia.js
  console.log("data", data);
  let chartData = dataParse(
    filters[0].selectedTableColumnName,
    data[`${queryType}`] || data.tradersUsers,
    filters[1].selectedTableColumnName,

    filterBoxStartDate,

    filterBoxEndDate,
    filters[2].selectedTableColumnName,

    filters[0].selectedTable,
    filters[1].selectedTable
  );
  console.log("chartData", chartData);
  const graphItems = filters[1].selectedTableColumnName !== "";
  if (graphItems === true) {
    return (
      <>
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.crossFilterValues}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
          setChartDataSM={setChartDataSM}
          chartData={chartData}
        />
      </>
    );
  } else if (graphItems === false) {
    return (
      <>
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.keys || chartData.csvKeys}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
          setChartDataSM={setChartDataSM}
          chartData={chartData}
        />
      </>
    );
  }
};
export default GraphParse;

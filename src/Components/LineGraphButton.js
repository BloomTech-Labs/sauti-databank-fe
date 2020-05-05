import React, { useState } from "react";
import LineGraph from "./LineGraph/LineGraph";
import Graph from "./Graph";
import ChoroplethParent from "../Components/ChoroplethMap/ChoroplethParent";

import "./scss/lineGraphButton.scss";

const LineGraphButton = props => {
  const { data, chartData, filters, queryType, open, setOpen } = props;
  const graphItems = filters[1].selectedTableColumnName !== "";
  console.log(data);
  const buttonBar = e => {
    e.preventDefault();
    setOpen("bar");
    renderBar();
  };

  const buttonChoroMap = e => {
    e.preventDefault();
    setOpen("choropleth");
  };
  const buttonDotMap = e => {
    e.preventDefault();
    setOpen("dot");
  };

  const renderLine = () => {
    if (open === "line") {
      return (
        <>
          <LineGraph
            filter0={filters[0]}
            buttonBar={buttonBar}
            buttonChoroMap={buttonChoroMap}
            buttonDotMap={buttonDotMap}
            data={data}
          />
        </>
      );
    } else {
      return (
        <button onClick={() => setOpen("line")}>Display Line Graph</button>
      );
    }
  };

  const renderChoroplethMap = () => {
    if (open === "choropleth") {
      return (
        <>
          <ChoroplethParent
            gqlData={data}
            filters={filters}
            width={900}
            height={500}
          />
        </>
      );
    } else {
      return (
        <button className="choro-map" onClick={() => setOpen("choropleth")}>
          Display ChoroplethMap
        </button>
      );
    }
  };

  const renderDotMap = () => {
    if (open === "dot") {
      return (
        <>
          <h1>Dot Map</h1>
        </>
      );
    } else {
      return (
        <button className="bubble-map" onClick={() => setOpen("dot")}>
          Display Dot map
        </button>
      );
    }
  };

  const renderBar = () => {
    if (graphItems === true && open === "bar") {
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
          />
        </>
      );
    } else if (graphItems === false && open === "bar") {
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
          />
        </>
      );
    } else if (open !== "bar") {
      return <button onClick={() => setOpen("bar")}>Display Bar Chart</button>;
    }
  };

  if (data.sessionsData) {
    return (
      <>
        {renderLine()}
        {renderBar()}
        {renderChoroplethMap()}
        {renderDotMap()}
      </>
    );
  } else {
    return (
      <>
        <p>Line Graph not Available with 'Key Demographics' Data Series</p>
        {renderBar()}
        {renderChoroplethMap()}
        {renderDotMap()}
      </>
    );
  }
};

export default LineGraphButton;

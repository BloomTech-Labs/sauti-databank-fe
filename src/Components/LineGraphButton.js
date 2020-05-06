import React, { useState } from "react";
import LineGraph from "./LineGraph/LineGraph";
import GraphParse from "./GraphParse";
import ChoroplethParent from "../Components/ChoroplethMap/ChoroplethParent";
import { useSelector } from "react-redux";

import "./scss/lineGraphButton.scss";

const LineGraphButton = props => {
  const {
    data,
    filters,
    open,
    setOpen,
    queryType,
    filterBoxStartDate,
    filterBoxEndDate
  } = props;
  console.log(`data`, data);

  const reduxData = useSelector(state => state.queriesReducer.dataInfo);
  console.log(reduxData);

  const renderLine = () => {
    if (open === "line") {
      return (
        <>
          <LineGraph filter0={filters[0]} data={data} />
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
        <button onClick={() => setOpen("choropleth")}>
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
      return <button onClick={() => setOpen("dot")}>Display Dot map</button>;
    }
  };

  const renderBar = () => {
    if (open === "bar") {
      return (
        <GraphParse
          data={data}
          filters={filters}
          open={open}
          queryType={queryType}
          filterBoxStartDate={filterBoxStartDate}
          filterBoxEndDate={filterBoxEndDate}
        />
      );
    } else {
      return <button onClick={() => setOpen("bar")}>Display Bar Chart</button>;
    }
  };

  if (data.sessionsData) {
    return (
      <>
        {renderBar()}
        {renderLine()}
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

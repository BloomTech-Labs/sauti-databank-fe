import React from "react";
import LineGraph from "./LineGraph/LineGraph";
import GraphParse from "./GraphParse";
import ChoroplethParent from "../Components/ChoroplethMap/ChoroplethParent";
import "./scss/lineGraphButton.scss";
import { set } from "react-ga";

const LineGraphButton = props => {
  const {
    data,
    filters,
    open,
    setOpen,
    queryType,
    filterBoxStartDate,
    filterBoxEndDate,
    setChartDataSM
  } = props;
  console.log("data", data);

  const renderLine = () => {
    if (open === "line") {
      return (
        <>
          <LineGraph filter0={filters[0]} data={data} />
        </>
      );
    } else {
    }
  };

  const renderChoroplethMap = () => {
    if (open === "choropleth") {
      return (
        <>
          <ChoroplethParent
            gqlData={data}
            filters={filters}
            queryType={queryType}
            filters={filters}
          />
        </>
      );
    } else {
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
    }
  };

  const renderBar = () => {
    if (open === "bar") {
      console.log("data renderBar", data);
      return (
        <>
          <GraphParse
            data={data}
            filters={filters}
            open={open}
            queryType={queryType}
            filterBoxStartDate={filterBoxStartDate}
            filterBoxEndDate={filterBoxEndDate}
            setChartDataSM={setChartDataSM}
          />
        </>
      );
    } else if (open !== "bar") {
    }
  };

  if (filters[0]["selectedCategory"] === "Final Destination Country") {
    return (
      <>
        {renderLine()}
        {renderBar()}
        {renderChoroplethMap()}
      </>
    );
  } else if (
    filters[0]["selectedCategory"] ===
    "Requested Procedures for Destination (Imports to:)"
  ) {
    return (
      <>
        {renderLine()}
        {renderBar()}
        {renderChoroplethMap()}
      </>
    );
  } else if (
    open === "choropleth" &&
    filters[0]["selectedCategory"] !== "Country of Residence" &&
    filters[0]["selectedCategory"] !== "Final Destination Country" &&
    filters[0]["selectedCategory"] !==
      "Requested Procedures for Destination (Imports to:)"
  ) {
    setOpen("bar");
    return <>{renderBar()}</>;
  } else if (open === "line" && data.tradersUsers) {
    setOpen("bar");
    return <>{renderBar()}</>;
  } else if (data.sessionsData) {
    return (
      <>
        {renderBar()}
        {renderLine()}
      </>
    );
  } else if (
    data.tradersUsers &&
    filters[0]["selectedCategory"] === "Country of Residence"
  ) {
    return (
      <>
        {renderBar()}
        {renderChoroplethMap()}
      </>
    );
  } else {
    return <>{renderBar()}</>;
  }
};

export default LineGraphButton;

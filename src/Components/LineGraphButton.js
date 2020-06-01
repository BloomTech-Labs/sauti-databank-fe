import React from "react";
import LineGraph from "./LineGraph/LineGraph";
import GraphParse from "./GraphParse";
import ChoroplethParent from "../Components/ChoroplethMap/ChoroplethParent";
import graphImage from "../assets/images/linegraph.png";
import mapImage from "../assets/images/map.png";
import barImage from "../assets/images/barchart.png";
import "./scss/lineGraphButton.scss";

const LineGraphButton = props => {
  const {
    data,
    filters,
    open,
    setOpen,
    queryType,
    filterBoxStartDate,
    filterBoxEndDate,
    makeFilterList
  } = props;

  const renderLine = () => {
    if (open === "line") {
      return (
        <>
          <LineGraph filter0={filters[0]} data={data} />
        </>
      );
    } else {
      return (
        <button className="line-btn" onClick={() => setOpen("line")}>
          <img src={graphImage} />
          <h1>Line Graph</h1>
        </button>
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
            queryType={queryType}
            filters={filters}
          />
        </>
      );
    } else {
      return (
        <button className="choro-map" onClick={() => setOpen("choropleth")}>
          <img src={mapImage} />
          <h1>Map</h1>
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
          <img src={mapImage} />
          <h1>Bubble Map</h1>
        </button>
      );
    }
  };

  const renderBar = () => {
    if (open === "bar") {
      return (
        <>
          <GraphParse
            data={data}
            filters={filters}
            open={open}
            queryType={queryType}
            filterBoxStartDate={filterBoxStartDate}
            filterBoxEndDate={filterBoxEndDate}
          />
        </>
      );
    } else if (open !== "bar") {
      return (
        <button className="bar-btn" onClick={() => setOpen("bar")}>
          <img src={barImage} />
          <h1>Bar Chart</h1>
        </button>
      );
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

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
    filterBoxEndDate
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
            width={900}
            height={500}
          />
        </>
      );
    } else {
      return (
        <button className="choro-map" onClick={() => setOpen("choropleth")}>
          <img src={mapImage} />
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
        </button>
      );
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
    } else if (open !== "bar") {
      return (
        <button className="bar-btn" onClick={() => setOpen("bar")}>
          <img src={barImage} />
        </button>
      );
    }
  };

  if (data.sessionsData) {
    return (
      <>
        {renderLine()}
        {renderChoroplethMap()}
        {renderDotMap()}
        {renderBar()}
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

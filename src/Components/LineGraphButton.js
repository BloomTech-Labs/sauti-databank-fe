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
          <div className="graph-titles-container">
            <div className="graph-title-diplay">
              <h1 className="graph-title">Data Series</h1>
              <h2 className="graph-title-small">
                {filters[0].selectedCategory}
              </h2>
            </div>
            <div className="graph-title-diplay">
              <h1 className="graph-title">Subsample</h1>
              <h2 className="graph-title-small">
                {filters[1].selectedCategory}
              </h2>
            </div>
            {filters[2].selectedTableColumnName && (
              <div className="graph-title-diplay">
                <h3 className="graph-title">Additional Filter</h3>
                <h3 className="graph-title-small">{makeFilterList()}</h3>
              </div>
            )}
          </div>
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
            width={900}
            height={500}
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
          <div className="graph-titles-container">
            <div className="graph-title-diplay">
              <h3 className="graph-title">Data Series:</h3>
              <h2 className="graph-title-small">
                {filters[0].selectedCategory} |
              </h2>
            </div>
            <div className="graph-title-diplay">
              <h3 className="graph-title">Subsample:</h3>
              <h2 className="graph-title-small">
                {filters[1].selectedCategory} |
              </h2>
            </div>
            {filters[2].selectedTableColumnName && (
              <div className="graph-title-diplay">
                <h3 className="graph-title">Additional Filter:</h3>
                <h3 className="graph-title-small">{makeFilterList()}</h3>
              </div>
            )}
          </div>
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
  } else if (
    open === "choropleth" &&
    filters[0]["selectedCategory"] !== "Country of Residence" &&
    filters[0]["selectedCategory"] !== "Final Destination Country"
  ) {
    return (
      <>
        {renderBar()}
        <br></br>
        <br></br>
        <p>Map can only be used to display:</p>
        <h1>"Data Series": "Country of Residence"</h1>
        <h1>"Data Series": "Final Destination Country"</h1>
        <p>Other searches can be displayed on the Bar Chart.</p>
      </>
    );
  } else {
    return <>{renderBar()}</>;
  }
};

export default LineGraphButton;

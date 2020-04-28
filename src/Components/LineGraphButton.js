import React from "react";
import LineGraph from "./LineGraph/LineGraph";
import Graph from "./Graph";

// import { useSelector } from "react-redux";

const LineGraphButton = props => {
  const {
    data,
    chartData,
    filters,
    queryType,
    makeFilterList,
    buttonHandle,
    open,
    setOpen
  } = props;
  const graphItems = filters[1].selectedTableColumnName !== "";

  // const data = useSelector(state => state.queriesReducer.dataInfo);

  const renderUpdate = () => {
    if (open === true) {
      return (
        <>
          <LineGraph
            filter0={filters[0]}
            buttonHandle={buttonHandle}
            data={data}
          />
        </>
      );
    } else {
      return <button onClick={() => setOpen(!open)}>Display Line Graph</button>;
    }
  };

  const renderGraph = () => {
    if (graphItems === true && open === false) {
      return (
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.crossFilterValues}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
        />
      );
    } else if (graphItems === false && open === false) {
      return (
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.keys || chartData.csvKeys}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
        />
      );
    } else {
      return null;
    }
  };

  if (data.sessionsData) {
    return (
      <>
        <div className="graph-titles-container">
          <div className="graph-title-diplay">
            <h1 className="graph-title">Data Series</h1>
            <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
          </div>
          <div className="graph-title-diplay">
            <h1 className="graph-title">Subsample</h1>
            <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>
          </div>
          {filters[2].selectedTableColumnName && (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
              <h3 className="graph-title-small">{makeFilterList()}</h3>
            </div>
          )}
        </div>
        {renderUpdate()}
        {renderGraph()}
      </>
    );
  } else {
    return (
      <>
        <p>No Line Graph Available</p>
        <p>Line Graph not Available with 'Key Demographics' Data Series</p>
        <div className="graph-titles-container">
          <div className="graph-title-diplay">
            <h1 className="graph-title">Data Series</h1>
            <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
          </div>
          <div className="graph-title-diplay">
            <h1 className="graph-title">Subsample</h1>
            <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>
          </div>
          {filters[2].selectedTableColumnName && (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
              <h3 className="graph-title-small">{makeFilterList()}</h3>
            </div>
          )}
        </div>
        {renderGraph()}
      </>
    );
  }
};

export default LineGraphButton;

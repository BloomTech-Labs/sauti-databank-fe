import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  geoOrthographic,
  min,
  max,
  scaleSqrt,
  scaleLinear,
  map
} from "d3";
import useResizeObserver from "./useResizeObserver";
import "../scss/choropleth.scss";

import { countryRank } from "./mapParcer";

function GeoChart({
  updatedData,
  handleChanges,
  dataView,
  property,
  setProperty,
  category
}) {
  //use select from d3
  //useRef to access DOM element and pass to D3
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [maxColor, setMaxColor] = useState("#F3EED9");
  const [scaleData, setScaleData] = useState([
    1,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100
  ]);
  const [scalePercent, setScalePercent] = useState([1, 100]);
  //must start as empty array or will render text many times.
  const [allResults, setResults] = useState([]);

  function changeProperty() {
    setMaxColor("#A2181D");
    setProperty(category);
    setResults(countryRank(updatedData, category));
  }

  useEffect(() => {
    //need to work with D3
    const svg = select(svgRef.current);
    //find min and max of filter selected
    let minProp = min(updatedData, feature => feature.properties[property]);
    let maxProp = max(updatedData, feature => feature.properties[property]);

    //map country to color based on scale
    //https://mycolor.space/gradient?ori=to+right+bottom&hex=%23F6FA1F&hex2=%23EB1B12&sub=1
    const colorScale = scaleLinear()
      .domain([minProp, 2, maxProp])
      .range(["#F3EED9", "#E5da66", maxColor])
      .clamp(true);

    // use resized dimensions, to zoom in
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    // projects geo-coordinates on a 2D plane
    //https://github.com/d3/d3-geo
    const projection = geoOrthographic()
      .fitSize([width, height], selectedCountry || dataView)
      //precision makes zoom in and out smooth
      .precision(5000);

    // transforms geojson data to d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    // render each country
    svg
      .selectAll(".country")
      //sync county in svg with data.features
      .data(updatedData)
      .join("path")
      //click on a country, sets it to projection.fitSize
      //click a second time, will be null and zoom out
      .on("click", feature => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      //give a className of country
      .attr("class", "country")
      .transition()
      //time it takes to zoom in and out
      .duration(1000)
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", feature => pathGenerator(feature));

    // display text
    svg
      .selectAll(".label")
      //selectedCountry come from state
      .data([selectedCountry])
      //render a text element
      .join("text")
      //selected country gets a class name of .label
      .attr("class", "label")
      //text will be name and display
      .text(
        feature =>
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      //where on the screen to place the text
      .attr("x", "50%")
      .attr("y", "50%");

    //scale percentage
    svg
      .selectAll(".percent")
      .data(scalePercent)
      .join("text")
      .attr("class", "percent")
      .text((d, i) => scalePercent[i] + "%")
      .attr("x", (value, index) => index * 180 + 10)
      .attr("y", 23)
      .attr("stroke", "black");

    //scale colors
    svg
      .selectAll(".scale")
      .data(scaleData)
      .join("rect")
      .attr("class", "scale")
      .attr("width", "20px")
      .attr("height", "2.9rem")
      .attr("x", (value, index) => index * 20 + 10)
      .attr("y", "26")
      .attr("fill", colorScale);

    //creates a rectangle for each data point
    svg
      .selectAll(".block")
      .data(allResults)
      .join("rect")
      .attr("class", "block")
      .attr("width", "200px")
      .attr("height", "2.9rem")
      .attr("x", "78%")
      .attr("y", (d, i) => i * 28 + 38)
      .attr("fill", "white");

    svg
      .selectAll(".text1")
      //selectedCountry come from state
      .data(allResults)
      //render a text element
      //.join("text")
      .join("text")
      //selected country gets a class name of .label
      //class is used for styling
      .attr("class", "text1")
      //text will be name and display, from d element take i value
      .text((d, i) => allResults[i][0] + ": " + allResults[i][1] + "%")
      //match color with percentage
      .attr("stroke", (d, i) => colorScale(allResults[i][1]))
      //where on the screen to place the text
      .attr("x", "80%")
      .attr("y", (d, i) => i * 28 + 60);
  }, [
    updatedData,
    dimensions,
    property,
    selectedCountry,
    dataView,
    allResults
  ]);

  return (
    <>
      <button onClick={changeProperty}>Display Results</button>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        {/* declare className, not to interfere with other svg styling */}
        <div onMouseEnter={handleChanges} className="d3">
          <svg ref={svgRef}></svg>
        </div>
      </div>
      <h2 className="choro-parent-h2">Select Country</h2>
    </>
  );
}

export default GeoChart;

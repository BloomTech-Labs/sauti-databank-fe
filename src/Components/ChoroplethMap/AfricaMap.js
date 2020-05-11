import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoOrthographic, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";
import "../scss/choropleth.scss";

function GeoChart({ data, handleChanges, dataView, property }) {
  //use select from d3
  //useRef to access DOM element and pass to D3
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // will be called initially and on every data change
  useEffect(() => {
    //need to work with D3
    const svg = select(svgRef.current);
    //find min and max of filter selected
    const minProp = min(data.features, feature => feature.properties[property]);
    const maxProp = max(data.features, feature => feature.properties[property]);
    //map country to color based on scale
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#FFF5F2", "#eb5e52"]);

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
      .data(data.features)
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
      .duration(3000)
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
      .attr("x", 450)
      .attr("y", 250);
  }, [data, dimensions, property, selectedCountry, dataView]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      {/* declare className, not to interfere with other svg styling */}
      <div onMouseEnter={handleChanges} className="d3">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default GeoChart;

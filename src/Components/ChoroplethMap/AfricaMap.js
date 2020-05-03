import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";
import "../scss/choropleth.scss";
/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data, property }) {
  console.log(data.features);
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
    console.log(minProp, maxProp);
    //map country to color based on scale
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#ccc", "blue"]);

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    //https://github.com/d3/d3-geo
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    // transforms geojson data to d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    // render each country
    //sync county in svg with data.features
    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      //click on a country, sets it to projection.fitSize
      .on("click", feature => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", feature => pathGenerator(feature));

    // render text
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature =>
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [data, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <div className="d3">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default GeoChart;

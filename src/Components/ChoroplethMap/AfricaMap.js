import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  geoOrthographic,
  min,
  max,
  scaleLinear,
  map
} from "d3";
import useResizeObserver from "./useResizeObserver";
import dataTwo from "./africaData2.json";
import "../scss/choropleth.scss";

import { countryRank, getValues, arrayValues } from "./mapParcer";

function GeoChart({ data, handleChanges, dataView, property, setProperty }) {
  //use select from d3
  //useRef to access DOM element and pass to D3
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const results = countryRank(dataTwo, property);
  console.log(`property`, property);
  console.log(`results`, results);

  const [allResults, setResults] = useState(arrayValues(results));
  console.log(`allResults`, allResults);

  function changeProperty(event) {
    setResults([0, 0, 0, 0]);
    setProperty(event.target.value);
    //setResults(arrayValues(results))
    console.log("in ChangeProperty");
  }

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

    svg
      .selectAll(".text0")
      //selectedCountry come from state
      .data(allResults[0])
      //render a text element
      //.join("text")
      .join(
        //add attr to circles entering, not existing
        enter =>
          enter
            .append("text")
            .attr("r", value => value)
            .attr("x", 750)
            .attr("y", 100)
            .attr("stroke", "black"),
        //updates existing elements
        update =>
          update
            .attr("class", "updated")
            .attr("x", 800)
            .attr("y", 100)
            .attr("stroke", "green"),
        //default, do not need, but could use to animate exiting elements
        exit => exit.remove()
      )

      //selected country gets a class name of .label
      // .attr("class", "legendText0")
      //text will be name and display
      .text(allResults[0][0] + ": " + allResults[0][1] + "%")
      //where on the screen to place the text
      .attr("x", 750)
      .attr("y", 100);

    svg
      .selectAll(".text1")
      //selectedCountry come from state
      .data(allResults[1])
      //render a text element
      .join("text")
      //selected country gets a class name of .label
      // .attr("class", "legendText1")
      //text will be name and display
      .text(allResults[1][0] + ": " + allResults[1][1] + "%")
      //where on the screen to place the text
      .attr("x", 750)
      .attr("y", 115);

    svg
      .selectAll(".text2")
      //selectedCountry come from state
      .data(allResults[2])
      //render a text element
      .join("text")
      //selected country gets a class name of .label
      //.attr("class", "legendText2")
      //text will be name and display
      .text(allResults[2][0] + ": " + allResults[2][1] + "%")
      //where on the screen to place the text
      .attr("x", 950)
      .attr("y", 130);

    svg
      .selectAll(".text3")
      //selectedCountry come from state
      .data(allResults[3])
      //render a text element
      .join("text")
      //selected country gets a class name of .label
      .attr("class", "legendText3")
      //text will be name and display
      .text(allResults[3][0] + ": " + allResults[3][1] + "%")
      //where on the screen to place the text
      .attr("x", 750)
      .attr("y", 145);

    // svg
    // .selectAll(".text4")
    // //selectedCountry come from state
    // .data(text4)
    // //render a text element
    // .join("text")
    // //selected country gets a class name of .label
    // .attr("class", "legendText")
    // //text will be name and display
    // .text(
    //   text4[0] +
    //       ": " +
    //       text4[1] +"%"
    // )
    // //where on the screen to place the text
    // .attr("x", 750)
    // .attr("y", 100);
  }, [data, dimensions, property, selectedCountry, dataView, results]);

  return (
    <>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        {/* declare className, not to interfere with other svg styling */}
        <div onMouseEnter={handleChanges} className="d3">
          <svg ref={svgRef}></svg>
        </div>
      </div>
      <h2 className="choro-parent-h2">Select Country</h2>
      <select value={property} onChange={changeProperty}>
        <option value="countryOfResidence">Country of Residence</option>
        <option value="finalDestinationCountry">
          Final Destination Country
        </option>
        <option value="finalDestinationMarket">Final Destination Market</option>
      </select>
    </>
  );
}

export default GeoChart;

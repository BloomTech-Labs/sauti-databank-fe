import React from "react";
import * as d3 from "d3";

const ChoroMapData = () => {
  // range longitudes from 10 (S) to 55 (N) for every 1 degree
  const lons = d3.range(10, 55, 2).reverse();

  // range latitudes from -130 (W) to -60 (E) for every 1 degree
  const lats = d3.range(-130, -60, 2);

  // long / lat points in order from west to east, then north to south, like a wrap
  const points = lons.map((lon, i) => lats.map(lat => [lat, lon])).flat();

  return (
    <>
      <h1>Map</h1>
    </>
  );
};
export default ChoroMapData;

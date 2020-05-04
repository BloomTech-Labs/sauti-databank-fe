import React, { useState } from "react";
import AfricaMap from "./AfricaMap";
import data from "./africa.json";
import { choroplethDataParse } from "./choroplethDataParse";

function ChoroplethParent({ gqlData }) {
  console.log(`gqlData`, gqlData);

  choroplethDataParse(gqlData);

  const [property, setProperty] = useState("pop_est");
  return (
    <>
      <React.Fragment>
        <h2>Sauti Map</h2>
        <AfricaMap data={data} property={property} />
        <h2>Select Country</h2>
        <select
          value={property}
          onChange={event => setProperty(event.target.value)}
        >
          <option value="pop_est">Population</option>
          <option value="name_len">Name length</option>
          <option value="gdp_md_est">GDP</option>
        </select>
      </React.Fragment>
    </>
  );
}

export default ChoroplethParent;

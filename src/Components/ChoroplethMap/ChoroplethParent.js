import React, { useState } from "react";
import AfricaMap from "./AfricaMap";
import dataOne from "./africaData1.json";
import dataTwo from "./africaData2.json";
import { choroplethDataParse } from "./choroplethDataParse";

function ChoroplethParent({ gqlData }) {
  console.log(`gqlData`, gqlData);

  choroplethDataParse(gqlData);

  const [map, setMap] = useState(dataOne);

  const [property, setProperty] = useState("countryOfResidence");

  function handleChanges() {
    setMap(dataTwo);
  }

  return (
    <>
      <React.Fragment>
        <h2 className="choro-parent-h2">Sauti Map</h2>
        <AfricaMap
          handleChanges={handleChanges}
          data={map}
          property={property}
        />
        <h2 className="choro-parent-h2">Select Country</h2>
        <select
          value={property}
          onChange={event => setProperty(event.target.value)}
        >
          <option value="countryOfResidence">Country of Residence</option>
          <option value="finalDestinationCountry">
            Final Destination Country
          </option>
          <option value="finalDestinationMarket">
            Final Destination Market
          </option>
        </select>
      </React.Fragment>
    </>
  );
}

export default ChoroplethParent;

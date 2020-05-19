import React, { useState } from "react";
import AfricaMap from "./AfricaMap";
import dataOne from "./africaData1.json";
import dataTwo from "./africaData2.json";
import { choroplethDataParse } from "./choroplethDataParse";

function ChoroplethParent({ gqlData }) {
  choroplethDataParse(gqlData.tradersUsers);
  console.log(`choroplethData`, choroplethDataParse);

  choroplethDataParse(gqlData);

  const [map, setMap] = useState(dataOne);

  const [property, setProperty] = useState("start");

  function handleChanges() {
    setMap(dataTwo);
  }

  return (
    <>
      <React.Fragment>
        <h2 className="choro-parent-h2">Sauti Map</h2>
        <AfricaMap
          handleChanges={handleChanges}
          dataView={map}
          data={dataOne}
          property={property}
          setProperty={setProperty}
        />
      </React.Fragment>
    </>
  );
}

export default ChoroplethParent;

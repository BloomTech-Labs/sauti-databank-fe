import React, { useState } from "react";
import AfricaMap from "./AfricaMap";
import dataOne from "./africaData1.json";
import dataTwo from "./africaData2.json";
import { choroplethDataParse } from "./choroplethDataParse";

function ChoroplethParent({ gqlData, queryType }) {
  console.log(queryType);
  gqlData = gqlData[queryType];
  const category = Object.keys(gqlData[0])[0];
  const results = choroplethDataParse(gqlData, category);

  console.log(category);
  console.log(`choroplethData`, results);
  const resultsArray = Object.entries(results);
  console.log(resultsArray);

  let totalAmt = 0;
  for (let i = 0; i < resultsArray.length; i++) {
    totalAmt += resultsArray[i][1].length;
  }
  console.log(totalAmt);

  let africaArray = dataOne.features;
  for (let i = 0; i < resultsArray.length; i++) {
    let length = (resultsArray[i][1].length / totalAmt) * 100;
    length = length.toFixed(2);
    let abb = resultsArray[i][0];
    for (let i = 0; i < africaArray.length; i++) {
      if (abb === africaArray[i].properties.adm0_a3) {
        console.log(category);
        africaArray[i].properties[category] = length;
      } else if (!africaArray[i].properties[category]) {
        africaArray[i].properties[category] = 0;
      }
    }
  }

  console.log(africaArray);
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
          updatedData={africaArray}
          property={property}
          setProperty={setProperty}
        />
      </React.Fragment>
    </>
  );
}

export default ChoroplethParent;

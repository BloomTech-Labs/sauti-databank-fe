import React, { useState, useEffect } from "react";
import AfricaMap from "./AfricaMap";
import dataOne from "./africaData1.json";
import dataTwo from "./africaData2.json";
import { choroplethDataParse } from "./choroplethDataParse";
import "../scss/choropleth.scss";

function ChoroplethParent({ gqlData, queryType, filters }) {
  gqlData = gqlData[queryType];
  console.log(gqlData);
  let category;
  gqlData.length > 0
    ? (category = Object.keys(gqlData[0])[0])
    : console.log("No Data");

  const results = choroplethDataParse(gqlData, category);

  const resultsArray = Object.entries(results);

  let totalAmt = 0;
  for (let i = 0; i < resultsArray.length; i++) {
    totalAmt += resultsArray[i][1].length;
  }

  //when add a filter, information is not correct
  //should set all to zero, before applying resultsArray
  let africaArray = dataOne.features;
  for (let i = 0; i < africaArray.length; i++) {
    africaArray[i].properties[category] = 0;
  }
  for (let i = 0; i < resultsArray.length; i++) {
    let length = (resultsArray[i][1].length / totalAmt) * 100;
    length = length.toFixed(2);
    let abb = resultsArray[i][0];
    //match country abb with country on array
    for (let i = 0; i < africaArray.length; i++) {
      if (abb === africaArray[i].properties.adm0_a3) {
        africaArray[i].properties[category] = length;
      } else if (!africaArray[i].properties[category]) {
        africaArray[i].properties[category] = 0;
      }
    }
  }

  const [map, setMap] = useState(dataOne);

  const [property, setProperty] = useState("start");

  function handleChanges() {
    setMap(dataTwo);
  }

  if (gqlData.length === 0) {
    return (
      <div className="noData">
        <h1>No Data To Display for this search</h1>
      </div>
    );
  } else {
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
            category={category}
            filters={filters}
          />
        </React.Fragment>
      </>
    );
  }
}

export default ChoroplethParent;

import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { Features } from "./LPFeatures";

const LandingPageChoropleth = props => {
  const maleTraders = props.data.allTraders.filter(
    ({ gender }) => gender === "Male"
  );

  const maleTradersKEN = maleTraders.filter(
    ({ country_of_residence }) => country_of_residence === "KEN"
  );

  console.log(maleTradersKEN.length, "MALETRADERS");

  const femaleTraders = props.data.allTraders.filter(
    ({ gender }) => gender === "Female"
  );

  const femaleTradersKEN = femaleTraders.filter(
    ({ country_of_residence }) => country_of_residence === "KEN"
  );

  const data = [
    {
      id: "UGA",
      value: maleTradersKEN.length
    }
  ];

  return (
    <ResponsiveChoropleth
      data={data}
      features={Features.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="nivo"
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionType="naturalEarth1"
      projectionScale={340}
      projectionTranslation={[0.35, 0.5]}
      projectionRotation={[-3, -3, 3]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      tooltip={function(e) {}}
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 155,
          translateY: -53,
          itemsSpacing: 2,
          itemWidth: 96,
          itemHeight: 19,
          itemDirection: "left-to-right",
          itemTextColor: "#444444",
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
};

export default LandingPageChoropleth;

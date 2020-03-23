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
      id: "KEN",
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
      projectionType="equalEarth"
      projectionScale={188}
      projectionTranslation={[0.5, 0.5]}
      projectionRotation={[-34, 0, 0]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
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

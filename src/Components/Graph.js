import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from "react-csv-downloader";
import { Event } from "../dashboard/GoogleAnalytics/index";
import { getSubscription, getToken, decodeToken } from "../dashboard/auth/Auth";
import DownloadModal from "../dashboard/DownloadModal";
import styled from "styled-components";
import { getAvaliableOptions, getSelectedOption } from "../OptionFunctions";

const Graph = props => {
  /*
            additionalFilter={filters[2].selectedCategory}(done)

          selectedCheckbox={
            {[filters[2].selectedCategory]: getSelectedOption(filters, 2)}
          }(done)

          crossFilter={filters[1].selectedCategory}(done)

          index={filters[0].selectedTableColumnName}(done)

          label={filters[0].selectedCategory}(done)

          checkboxOptions={getAvaliableOptions(filters, 2)}

  */
  let { data, csvData, filters, keys, groupMode, sampleSize } = props;
  console.log("loading graph", props);
  // const tier = getTier();
  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }
  const newSub = getSubscription();
  let sub;
  if (newSub) {
    sub = newSub;
  }

  // const [csvHeaders, setCsvHeaders] = useState([]);
  // const [csvFormattedData, setCsvFormattedData] = useState([]);
  const [csvDownload, setCsvDownload] = useState([]);
  // console.log("add other", setupOther(data, csvData))
  // useEffect(() => {
  //   if (props.filteredData) {
  //     props.setCheckboxOptions(props.filteredData);
  //   }
  // }, []);

  //Gets headers for CSV.
  // let headers = data => {
  //   let allHeaders = [];
  //   //no crossfilter
  //   if (!filters[1].selectedCategory) {
  //     allHeaders = [filters[0].selectedTableColumnName];
  //     allHeaders.push({
  //       id: `${sampleSize}`,
  //       displayName: `Sample Size: ${sampleSize}`
  //     });
  //     // finish this
  //     // allHeaders.push({ id: `I am here` });
  //   } else {
  //     // at this case now
  //     allHeaders = [
  //       {
  //         id: `${filters[0].selectedTableColumnName}`,
  //         displayName: `${filters[0].selectedTableColumnName}`
  //       },
  //       ...keys,
  //       { id: `${filters[2].selectedCategory}` },
  //       // the rest of them should go here
  //       {
  //         id: `${sampleSize}`,
  //         displayName: `Sample Size: ${sampleSize}`
  //       },
  //       {
  //         id: `${sampleSize}`,
  //         displayName: `Sample Size: ${sampleSize}`
  //       },
  //       {
  //         id: `${sampleSize}`,
  //         displayName: `Sample Size: ${sampleSize}`
  //       },
  //       {
  //         id: `${sampleSize}`,
  //         displayName: `Sample Size: ${sampleSize}`
  //       }
  //       // { id: `I am here` }
  //     ];
  //   }
  //   return allHeaders;
  // };

  let makeValues = data => {
    return data.map(obj => {
      return Object.values(obj);
    });
  };
  let makeHeaders = data => {
    if (!filters[1].selectedCategory) {
      return [
        {
          id: `${filters[0].selectedTableColumnName}`,
          displayName: `${filters[0].selectedTableColumnName}`
        },
        // instead of the subsample keys we put in the total count
        {
          id: `${66}`, // random value
          displayName: `Total Count`
        },
        {
          id: `${67}`, // random value
          displayName: `% of Sample Size`
        },

        ...Object.keys(filters)
          .filter(filterId => filterId >= 2)
          .map(filterId => ({ id: `${filters[filterId].selectedCategory}` })),
        {
          id: `${sampleSize}`,
          displayName: `Sample Size: ${sampleSize}`
        }
      ];
    } else {
      return [
        {
          id: `${filters[0].selectedTableColumnName}`,
          displayName: `${filters[0].selectedTableColumnName}`
        },
        ...keys,
        ...Object.keys(filters)
          .filter(filterId => filterId >= 2)
          .map(filterId => ({ id: `${filters[filterId].selectedCategory}` })),
        {
          id: `${sampleSize}`,
          displayName: `Sample Size: ${sampleSize}`
        }
      ];
    }
  };
  let csvFormater = data => {
    // data is cropped before this function is called
    console.log("csvFormater", data, keys);
    // make sure all the options are selected
    //if there's additionalFilter
    // we need to put on all the additional filters as columns in the download
    // additionalFilter filters[2].selectedCategory
    // if we have any additional filters setup then run this
    //
    if (Object.keys(filters).length >= 2) {
      data = data.map(obj => {
        let additionalCategories = {};
        Object.keys(filters)
          .filter(filterId => filterId >= 2)
          .forEach(filterId => {
            additionalCategories = {
              ...additionalCategories,
              [filters[filterId].selectedCategory]: getSelectedOption(
                filters,
                filterId
              )
            };
          });

        return {
          ...obj,
          percentage: parseInt(
            (obj[obj[filters[0].selectedTableColumnName]] / sampleSize) * 100
          ),
          ...additionalCategories
        };
      });
    }
    // dummy sample size
    // data = [...data, {sampleSize: 30}]
    // we already have the data here
    // add a percentage column here using sampleSize
    console.log(data);
    console.log(makeValues(data));
    console.log(makeHeaders(data));

    return data;
    // return data.map(obj => {
    //   return Object.values(obj);
    // });
  };
  /*

values
0: (6) ["Cereals - Maize", "9", "5", "4", "10", "10-20"]
1: (6) ["Beans", "7", "5", "6", "3", "10-20"]
2: (6) ["Fruits", "3", "0", "1", "0", "10-20"]
3: (6) ["Cereals - Rice", "2", "0", "2", "0", "10-20"]
4: (6) ["Animal Products", "2", "0", "1", "1", "10-20"]
5: (6) ["Vegetables", "1", "1", "0", "0", "10-20"]
6: (6) ["Cereals - Maize", "9", "5", "4", "10", "10-20"]
7: (6) ["Cereals - Maize", "9", "5", "4", "10", "10-20"]
8: (6) ["Cereals - Maize", "9", "5", "4", "10", "10-20"]
9: (6) ["Beans", "7", "5", "6", "3", "10-20"]
10: (6) ["Beans", "7", "5", "6", "3", "10-20"]
11: (6) ["Beans", "7", "5", "6", "3", "10-20"]
12: (6) ["Fruits", "3", "0", "1", "0", "10-20"]
the values from each object

keys
0: {id: "commoditycat", displayName: "commoditycat"}
1: "Never"
2: "Daily"
3: "Weekly"
4: "Monthly"
5: {id: "Age"}
6: {id: "63", displayName: "Sample Size: 63"}
7: {id: "63", displayName: "Sample Size: 63"}
8: {id: "63", displayName: "Sample Size: 63"}
9: {id: "63", displayName: "Sample Size: 63"}

case !filters[1].selectedCategory
for filter 0
  1 object
for filter 1
  the options

for filters 2 to n
  1 object


*/
  let fileName = "";
  fileName = `${filters[0].selectedTableColumnName &&
    filters[0].selectedTableColumnName}${filters[1].selectedCategory &&
    "_by_" + filters[1].selectedCategory}${filters[2].selectedCategory &&
    `_where_${filters[2].selectedCategory}:(${
      Object.values({
        [filters[2].selectedCategory]: getSelectedOption(filters, 2)
      })[0]
    })`}`;

  let track = Event(fileName, "Downloaded Excel");

  useEffect(() => {
    // setCsvFormattedData(csvFormater(csvData));
    // setCsvHeaders(headers(csvData));
    setCsvDownload(csvFormater(csvData));
  }, [csvData]);
  // console.log("data for download", csvFormattedData, csvHeaders)
  // console.log("data for download", Object.values(csvDownload), [...Object.keys(csvDownload),
  // console.log(makeValues(data))
  // console.log(makeHeaders(data))

  //   {
  //   id: `${sampleSize}`,
  //   displayName: `Sample Size: ${sampleSize}`
  //   }
  // ])

  return (
    <>
      <div className="dwnld-btn">
        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <CsvDownloader
            track={track}
            datas={
              makeValues(csvDownload)
              // csvFormattedData
            }
            columns={
              makeHeaders(csvDownload)
              // csvHeaders
            }
            filename={fileName}
            suffix={`${new Date().toISOString()}`}
          >
            <DownloadText className="csv-download">Download ⯆</DownloadText>
          </CsvDownloader>
        ) : (
          <>
            <DownloadModal />
          </>
        )}
      </div>
      <div className="Graph-Container">
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy={filters[0].selectedTableColumnName}
          groupMode={groupMode} // Possibly add toggle selector to change group mode.
          margin={{ top: 50, right: 170, bottom: 75, left: 80 }}
          padding={0.3}
          innerPadding={3}
          maxValue={100}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          tooltip={({ id, value }) => (
            <strong
              style={{
                color: "#000000",
                fontSize: "15px",
                fontFamily: "Helvetica"
              }}
            >
              {id}: {value}%
            </strong>
          )}
          labelFormat={d => <tspan y={-15}>{d}% </tspan>}
          labelForm={d => <text>{d}% </text>}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend:
              filters[0].selectedCategory +
              " (values as percent of total)," +
              ` sample size = ${sampleSize}`,
            legendPosition: "middle",
            legendOffset: 35
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage", // Possibly toggle percentage or number in future release
            legendPosition: "middle",
            legendOffset: -60
          }}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </>
  );
};

export default Graph;

const DownloadText = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
  margin-top: 4px;
  margin-left: 2px;
  width: 100px;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

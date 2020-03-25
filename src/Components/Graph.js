import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from "react-csv-downloader";
import { Event } from "../dashboard/GoogleAnalytics/index";
import { getSubscription, getToken, decodeToken } from "../dashboard/auth/Auth";
import DownloadModal from "../dashboard/DownloadModal";
import styled from "styled-components";
import { getAvaliableOptions, getSelectedOption } from "../OptionFunctions";

const Graph = props => {
  let { data, csvData, filters, keys, groupMode, sampleSize } = props;
  console.log("loading graph", props);
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

  const [csvDownload, setCsvDownload] = useState([]);

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
          displayName: `total count`
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
    console.log("csvFormater", data, keys);
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

        return { ...obj, ...additionalCategories };
      });
    }
    return data;
  };

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
    setCsvDownload(csvFormater(csvData));
  }, [csvData]);

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
            <DownloadText className="csv-download">Download</DownloadText>
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
  font-size: 1.6rem;
  opacity: 0.8;
  width: 100px;
  border: none;
  border-radius: 5px;
  padding: 8px 0;
  background-color: #212121b9;
  color: white;
  font-weight: 500;
  text-align: center;
  &:hover {
    background-color: #212121d3;
    cursor: pointer;
    opacity: 1;
  }
`;

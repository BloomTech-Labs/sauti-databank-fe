import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from "react-csv-downloader";
import { Event } from "../dashboard/GoogleAnalytics/index";
import { getSubscription, getToken, decodeToken } from "../dashboard/auth/Auth";
import DownloadModal from "../dashboard/DownloadModal";
import { getAvaliableOptions, getSelectedOption } from "../OptionFunctions";

import {
  NoAccessText,
  DownloadText
} from "../dashboard/styledComponents/Index";

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

  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvFormattedData, setCsvFormattedData] = useState([]);

  // useEffect(() => {
  //   if (props.filteredData) {
  //     props.setCheckboxOptions(props.filteredData);
  //   }
  // }, []);

  //Gets headers for CSV.
  let headers = data => {
    let allHeaders = [];
    //no crossfilter
    if (!filters[1].selectedCategory) {
      allHeaders = [filters[0].selectedTableColumnName];
      allHeaders.push({
        id: `${sampleSize}`,
        displayName: `Sample Size: ${sampleSize}`
      });
      allHeaders.push({ id: `I am here` });
    } else {
      allHeaders = [
        {
          id: `${filters[0].selectedTableColumnName}`,
          displayName: `${filters[0].selectedTableColumnName}`
        },
        ...keys,
        { id: `${filters[2].selectedCategory}` },
        // the rest of them should go here
        {
          id: `${sampleSize}`,
          displayName: `Sample Size: ${sampleSize}`
        }
        // { id: `I am here` }
      ];
    }
    return allHeaders;
  };

  let csvFormater = data => {
    // data is cropped before this function is called
    console.log("csvFormater", data);
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

        return { ...obj, ...additionalCategories };
      });
    }
    console.log(data);
    return data.map(obj => {
      return Object.values(obj);
    });
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
    setCsvFormattedData(csvFormater(csvData));
    setCsvHeaders(headers(csvData));
  }, [csvData]);

  return (
    <div className="Graph-Container">
      <div className="dwnld-btn">
        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <CsvDownloader
            track={track}
            datas={csvFormattedData}
            columns={csvHeaders}
            filename={fileName}
            suffix={`${new Date().toISOString()}`}
          >
            <DownloadText className="csv-download">Download⯆</DownloadText>
          </CsvDownloader>
        ) : (
          <>
            <DownloadModal />
          </>
        )}
      </div>

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
  );
};

export default Graph;

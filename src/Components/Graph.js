import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from "react-csv-downloader";
import { Event } from "../dashboard/GoogleAnalytics/index";
import { getSubscription, getToken, decodeToken } from "../dashboard/auth/Auth";
import DownloadModal from "../dashboard/DownloadModal";
import styled from "styled-components";
import { getSelectedOption } from "../OptionFunctions";
import { useHistory } from "react-router-dom";
const Graph = props => {
  let {
    data,
    csvData,
    filters,
    keys,
    groupMode,
    sampleSize,
    tableName
  } = props;
  console.log(`keys Graph`, keys);
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
    console.log(`makeValues`, data);
    return data.map(obj => {
      return Object.values(obj);
    });
  };
  let makeHeaders = data => {
    console.log(`makeHeaders`, data);
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
  // the download
  let csvFormater = data => {
    // the subsample case is messed up
    // if the user selected a subsample
    if (filters[1].selectedCategory.length > 0) {
      // clean up the duplicate rows containing dataItem[filters[0].selectedTableColumnName]] as a value
      let newData = [];
      let newDataCache = {};
      data.forEach(dataItem => {
        // if dataItem[filters[0].selectedTableColumnName] is in object.keys(newDataCache)
        // assume dataItem[filters[0].selectedTableColumnName] exists
        if (!newDataCache[dataItem[filters[0].selectedTableColumnName]]) {
          newData = [...newData, dataItem];
          newDataCache = {
            ...newDataCache,
            [dataItem[filters[0].selectedTableColumnName]]: 1
          };
        }
      });
      data = newData;
    }

    // works fine for both cases
    if (Object.keys(filters).length >= 2) {
      data = data.map(obj => {
        // calculate the additional filters
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

        // case for the non subsamples
        if (filters[1].selectedCategory.length === 0) {
          return {
            ...obj, // all minus additional filters
            percentage: (
              (obj[obj[filters[0].selectedTableColumnName]] / sampleSize) *
              100
            ).toFixed(2),
            ...additionalCategories // additional filters
          };
        } else {
          // the subsamples(filters[1]) don't have an item count for calculating percentages

          return {
            ...obj, // all minus additional filters
            ...additionalCategories // additional filters
          };
        }
      });
    }
    // dummy sample size
    // data = [...data, {sampleSize: 30}]
    // we already have the data here
    // add a percentage column here using sampleSize
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
  const socialMediaLink = useHistory().location.search;
  return (
    <>
      {/* <div className="dwnld-btn">
        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <>
            <SocialMediaContainer className="social-media-container">
              <IconContainer>
                <ShareDiv>Share:</ShareDiv>
                <CsvDownloader
                  track={track}
                  datas={makeValues(csvDownload)}
                  columns={makeHeaders(csvDownload)}
                  filename={fileName}
                  suffix={`${new Date().toISOString()}`}
                >
                  <DownloadText className="csv-download">Download</DownloadText>
                </CsvDownloader>
                <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
                <div>
                  <SocialMediaIconsTwitter
                    className="twitter-share-button"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=https://www.databank.sautiafrica.org/data${socialMediaLink}`}
                  >
                    <i className="fab fa-twitter"></i>
                  </SocialMediaIconsTwitter>
                </div>
                <div
                  className="fb-share-button"
                  data-href={`https://www.databank.sautiafrica.org/data${socialMediaLink}`}
                  data-layout="button"
                  data-size="small"
                >
                  <SocialMediaIconsFacebook
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://www.databank.sautiafrica.org/data${socialMediaLink}&amp;src=sdkpreparse`}
                    className="fb-xfbml-parse-ignore"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </SocialMediaIconsFacebook>
                </div>
              </IconContainer>
            </SocialMediaContainer>
          </>
        ) : (
          <>
            <SocialMediaContainer className="social-media-container">
              <IconContainer>
                <ShareDiv>Share:</ShareDiv>
                <DownloadModal />
                <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
                <div>
                  <SocialMediaIconsTwitter
                    className="twitter-share-button"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=This%20website%20is%20awesome!"
                  >
                    <i className="fab fa-twitter"></i>
                  </SocialMediaIconsTwitter>
                </div>
                <div
                  className="fb-share-button"
                  data-href="https://blissful-pare-60612f.netlify.com/data"
                  data-layout="button"
                  data-size="small"
                >
                  <SocialMediaIconsFacebook
                    target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                    className="fb-xfbml-parse-ignore"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </SocialMediaIconsFacebook>
                </div>
              </IconContainer>
            </SocialMediaContainer>
          </>
        )}
      </div> */}
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
              ` sample size = ${sampleSize} ${tableName}`,
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
  background-color: slategrey;
  color: white;
  font-weight: 500;
  text-align: center;
  margin: 0 10px;
  &:hover {
    background-color: slategrey;
    cursor: pointer;
    opacity: 1;
  }
`;
const FilterHideButton = styled.button`
  padding: 8px 5px;
  background: #eb5e52;
  font-weight: 400;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
  width: 95px;
  opacity: 0.75;
  border: none;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 0.5px solid lightgrey;
  padding: 5px;
  margin-bottom: 5px;
  font-size: 1.6rem;
`;
const SocialMediaIconsTwitter = styled.a`
  font-size: 2.5rem;
  margin: 0 10px;
  color: rgb(0, 172, 238);
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;
const SocialMediaIconsFacebook = styled.a`
  font-size: 2.5rem;
  margin: 0 10px;
  color: rgb(59, 89, 152);
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;

const CopyUrlButton = styled.button`
  padding: 8px 5px;
  background: #47837f;
  font-weight: 400;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
  width: 95px;
  opacity: 0.75;
  border: none;
  margin: 0 10px;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const ContentContainerDiv = styled.div`
  border-right: 1px solid lightgrey;
  margin-right: 2px;
`;
const IconContainer = styled.span`
  display: flex;
  font-size: 1.8rem;
  align-items: center;
`;
const ShareDiv = styled.div`
  margin-right: 5px;
`;

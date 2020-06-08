import React, { useEffect, useState } from "react";
import CsvDownloader from "react-csv-downloader";
import { Event } from "../dashboard/GoogleAnalytics/index";
import { getSubscription, getToken, decodeToken } from "../dashboard/auth/Auth";
import DownloadModal from "../dashboard/DownloadModal";
import styled from "styled-components";
import { getSelectedOption } from "../OptionFunctions";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import dataParse from "./dataParse";
import csv from "react-csv-downloader/dist/lib/csv";
//import downloadBtn  from '../assets/images/downloadBtn'

//need to bring in data, for 109
const SocialMedia = ({
  filters,
  queryType,
  filterBoxStartDate,
  filterBoxEndDate,
  chartData,
  csvData
}) => {
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

  const sampleSize = chartData.totalSampleSize;
  // const csvData = chartData.dataStructure;
  const keys = chartData.crossFilterValues;

  let makeValues = csvDownload => {
    return csvDownload.map(obj => {
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
  let csvFormater = csvData => {
    // the subsample case is messed up
    // if the user selected a subsample
    if (filters[1].selectedCategory.length > 0) {
      // clean up the duplicate rows containing dataItem[filters[0].selectedTableColumnName]] as a value
      let newData = [];
      let newDataCache = {};
      csvData.forEach(dataItem => {
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
      csvData = newData;
    }

    // works fine for both cases
    if (Object.keys(filters).length >= 2) {
      csvData = csvData.map(obj => {
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
    return csvData;
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
    if (csvData) {
      setCsvDownload(csvFormater(csvData));
    }
  }, [csvData]);

  const socialMediaLink = useHistory().location.search;

  return (
    <>
      {tier === "ADMIN" || tier === "PAID" || tier === "GOV_ROLE" || newSub ? (
        <>
          <Grid item>
            <CsvDownloader
              track={track}
              datas={makeValues(csvDownload)}
              columns={makeHeaders(csvDownload)}
              filename={fileName}
              suffix={`${new Date().toISOString()}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8523 15.4922C11.8699 15.5146 11.8923 15.5327 11.9179 15.5452C11.9435 15.5577 11.9715 15.5641 12 15.5641C12.0285 15.5641 12.0565 15.5577 12.0821 15.5452C12.1077 15.5327 12.1301 15.5146 12.1477 15.4922L14.7727 12.1711C14.8687 12.0492 14.782 11.8687 14.625 11.8687H12.8883V3.9375C12.8883 3.83437 12.8039 3.75 12.7008 3.75H11.2945C11.1914 3.75 11.107 3.83437 11.107 3.9375V11.8664H9.375C9.21797 11.8664 9.13125 12.0469 9.22734 12.1688L11.8523 15.4922ZM20.5781 14.6719H19.1719C19.0688 14.6719 18.9844 14.7563 18.9844 14.8594V18.4688H5.01562V14.8594C5.01562 14.7563 4.93125 14.6719 4.82812 14.6719H3.42188C3.31875 14.6719 3.23438 14.7563 3.23438 14.8594V19.5C3.23438 19.9148 3.56953 20.25 3.98438 20.25H20.0156C20.4305 20.25 20.7656 19.9148 20.7656 19.5V14.8594C20.7656 14.7563 20.6812 14.6719 20.5781 14.6719Z"
                  fill="#9F1C0F"
                />
              </svg>
              {/* <DownloadText className="csv-download">Download</DownloadText> */}
            </CsvDownloader>
          </Grid>

          <Grid item>
            <CopyUrlButton>Copy URL</CopyUrlButton>
          </Grid>
          <Grid item>
            <SocialMediaIconsTwitter
              // className="twitter-share-button"
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=https://www.databank.sautiafrica.org/data${socialMediaLink}`}
            >
              <i className="fab fa-twitter"></i>
            </SocialMediaIconsTwitter>
          </Grid>

          <Grid
            item
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
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <DownloadModal />
          </Grid>
          <Grid item>
            <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
          </Grid>
          <Grid item>
            <SocialMediaIconsTwitter
              // className="twitter-share-button"
              target="_blank"
              href="https://twitter.com/intent/tweet?text=This%20website%20is%20awesome!"
            >
              <i className="fab fa-twitter"></i>
            </SocialMediaIconsTwitter>
          </Grid>
          <Grid
            item
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
          </Grid>
        </>
      )}
    </>
  );
};
export default SocialMedia;

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
  font-size: 1.1rem;
  width: 7rem;
  opacity: 0.75;
  border: none;
  margin: 0 10px;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;

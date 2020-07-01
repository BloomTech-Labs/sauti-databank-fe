import React, { useEffect, useState } from "react";
import CsvDownloader from "react-csv-downloader";
import { Event } from "../dashboard/GoogleAnalytics/index";
import { getSubscription, getToken, decodeToken } from "../dashboard/auth/Auth";
import DownloadModal from "../dashboard/DownloadModal";
import styled from "styled-components";
import { getSelectedOption } from "../OptionFunctions";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import dataParse from "./dataParse";
import csv from "react-csv-downloader/dist/lib/csv";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
//import downloadBtn  from '../assets/images/downloadBtn'

//need to bring in data, for 109
const SocialMedia = () => {
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
  const classes = useStyles();

  const socialMediaLink = useHistory().location.search;

  const barSelector = useSelector(
    state => state.barDownloadReducer.barDownload
  );
  const columnsRedux = barSelector.columns;
  const makeValuesRedux = barSelector.makeValues;
  const fileName = barSelector.fileName;
  const suffix = barSelector.suffix;
  const track = barSelector.track;

  if (columnsRedux !== undefined) {
    return (
      <>
        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <>
            <Grid item style={{ cursor: "pointer" }}>
              <CsvDownloader
                track={track}
                datas={makeValuesRedux}
                columns={columnsRedux}
                filename={fileName}
                suffix={suffix}
              >
                <Tooltip
                  title="Download"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
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
                </Tooltip>
                {/* <DownloadText className="csv-download">Download</DownloadText> */}
              </CsvDownloader>
            </Grid>

            <Grid item style={{ cursor: "pointer" }}>
              <Tooltip
                title="Copy URL"
                arrow
                classes={{ tooltip: classes.customWidth }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4528 15.5951C13.4176 15.5602 13.37 15.5406 13.3204 15.5406C13.2708 15.5406 13.2232 15.5602 13.188 15.5951L10.4646 18.3185C9.20361 19.5795 7.07549 19.7131 5.6833 18.3185C4.28877 16.924 4.42236 14.7982 5.6833 13.5373L8.40674 10.8139C8.47939 10.7412 8.47939 10.6217 8.40674 10.549L7.47393 9.61621C7.43869 9.58131 7.3911 9.56174 7.3415 9.56174C7.29191 9.56174 7.24432 9.58131 7.20908 9.61621L4.48564 12.3396C2.50283 14.3225 2.50283 17.531 4.48564 19.5115C6.46846 21.492 9.67705 21.4943 11.6575 19.5115L14.381 16.7881C14.4536 16.7154 14.4536 16.5959 14.381 16.5232L13.4528 15.5951ZM19.5138 4.48574C17.531 2.50292 14.3224 2.50292 12.3419 4.48574L9.61611 7.20917C9.58122 7.24441 9.56164 7.292 9.56164 7.3416C9.56164 7.39119 9.58122 7.43878 9.61611 7.47402L10.5466 8.40449C10.6192 8.47714 10.7388 8.47714 10.8114 8.40449L13.5349 5.68105C14.7958 4.42011 16.9239 4.28652 18.3161 5.68105C19.7106 7.07558 19.5771 9.20136 18.3161 10.4623L15.5927 13.1857C15.5578 13.221 15.5382 13.2686 15.5382 13.3182C15.5382 13.3678 15.5578 13.4153 15.5927 13.4506L16.5255 14.3834C16.5981 14.456 16.7177 14.456 16.7903 14.3834L19.5138 11.66C21.4942 9.67714 21.4942 6.46855 19.5138 4.48574ZM14.2989 8.72558C14.2637 8.69069 14.2161 8.67111 14.1665 8.67111C14.1169 8.67111 14.0693 8.69069 14.0341 8.72558L8.72549 14.0318C8.69059 14.0671 8.67102 14.1147 8.67102 14.1643C8.67102 14.2138 8.69059 14.2614 8.72549 14.2967L9.65361 15.2248C9.72627 15.2975 9.8458 15.2975 9.91846 15.2248L15.2247 9.91855C15.2974 9.84589 15.2974 9.72636 15.2247 9.65371L14.2989 8.72558Z"
                    fill="#9F1C0F"
                  />
                </svg>
              </Tooltip>
            </Grid>
            <Grid item>
              <SocialMediaIconsTwitter
                // className="twitter-share-button"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=https://www.databank.sautiafrica.org/data${socialMediaLink}`}
              >
                <Tooltip
                  title="Twitter"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7501 5.96023C21.033 6.2696 20.2525 6.49226 19.4486 6.57898C20.2832 6.08312 20.9082 5.29976 21.2064 4.37585C20.4232 4.84176 19.5652 5.16847 18.6705 5.34148C18.2965 4.9417 17.8442 4.62321 17.3418 4.40587C16.8394 4.18853 16.2976 4.07699 15.7501 4.0782C13.5353 4.0782 11.7541 5.87351 11.7541 8.07663C11.7541 8.38601 11.7916 8.69538 11.8525 8.99304C8.53608 8.8196 5.57827 7.23523 3.61187 4.80945C3.25357 5.42143 3.0658 6.11826 3.06811 6.82741C3.06811 8.21491 3.77358 9.43835 4.84936 10.1579C4.21539 10.1329 3.59626 9.95866 3.04233 9.64929V9.69851C3.04233 11.6415 4.41577 13.2516 6.24624 13.6219C5.90255 13.7112 5.54899 13.7569 5.1939 13.7579C4.93374 13.7579 4.68765 13.7321 4.43921 13.6969C4.94546 15.2813 6.41968 16.4321 8.17515 16.4696C6.80171 17.5454 5.0814 18.1782 3.21343 18.1782C2.87827 18.1782 2.5689 18.1665 2.2478 18.129C4.01968 19.2657 6.12202 19.9219 8.38608 19.9219C15.7361 19.9219 19.758 13.8329 19.758 8.54773C19.758 8.37429 19.758 8.20085 19.7462 8.02741C20.5244 7.45788 21.2064 6.75241 21.7501 5.96023Z"
                      fill="#9F1C0F"
                    />
                  </svg>
                </Tooltip>
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
                <Tooltip
                  title="Facebook"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.875 19.875H15.5602V14.1141H17.9977L18.3633 11.2852H15.5602V9.47812C15.5602 8.65781 15.7875 8.1 16.9617 8.1H18.4594V5.56875C18.1992 5.53359 17.3109 5.45625 16.275 5.45625C14.1141 5.45625 12.6352 6.77578 12.6352 9.19687V11.2828H10.193V14.1117H12.6375V19.875H4.125V4.125H19.875V19.875Z"
                      fill="#9F1C0F"
                    />
                  </svg>
                </Tooltip>
              </SocialMediaIconsFacebook>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <DownloadModal />
            </Grid>
            <Grid item>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4528 15.5951C13.4176 15.5602 13.37 15.5406 13.3204 15.5406C13.2708 15.5406 13.2232 15.5602 13.188 15.5951L10.4646 18.3185C9.20361 19.5795 7.07549 19.7131 5.6833 18.3185C4.28877 16.924 4.42236 14.7982 5.6833 13.5373L8.40674 10.8139C8.47939 10.7412 8.47939 10.6217 8.40674 10.549L7.47393 9.61621C7.43869 9.58131 7.3911 9.56174 7.3415 9.56174C7.29191 9.56174 7.24432 9.58131 7.20908 9.61621L4.48564 12.3396C2.50283 14.3225 2.50283 17.531 4.48564 19.5115C6.46846 21.492 9.67705 21.4943 11.6575 19.5115L14.381 16.7881C14.4536 16.7154 14.4536 16.5959 14.381 16.5232L13.4528 15.5951ZM19.5138 4.48574C17.531 2.50292 14.3224 2.50292 12.3419 4.48574L9.61611 7.20917C9.58122 7.24441 9.56164 7.292 9.56164 7.3416C9.56164 7.39119 9.58122 7.43878 9.61611 7.47402L10.5466 8.40449C10.6192 8.47714 10.7388 8.47714 10.8114 8.40449L13.5349 5.68105C14.7958 4.42011 16.9239 4.28652 18.3161 5.68105C19.7106 7.07558 19.5771 9.20136 18.3161 10.4623L15.5927 13.1857C15.5578 13.221 15.5382 13.2686 15.5382 13.3182C15.5382 13.3678 15.5578 13.4153 15.5927 13.4506L16.5255 14.3834C16.5981 14.456 16.7177 14.456 16.7903 14.3834L19.5138 11.66C21.4942 9.67714 21.4942 6.46855 19.5138 4.48574ZM14.2989 8.72558C14.2637 8.69069 14.2161 8.67111 14.1665 8.67111C14.1169 8.67111 14.0693 8.69069 14.0341 8.72558L8.72549 14.0318C8.69059 14.0671 8.67102 14.1147 8.67102 14.1643C8.67102 14.2138 8.69059 14.2614 8.72549 14.2967L9.65361 15.2248C9.72627 15.2975 9.8458 15.2975 9.91846 15.2248L15.2247 9.91855C15.2974 9.84589 15.2974 9.72636 15.2247 9.65371L14.2989 8.72558Z"
                  fill="#9F1C0F"
                />
              </svg>
            </Grid>
            <Grid item>
              <SocialMediaIconsTwitter
                // className="twitter-share-button"
                target="_blank"
                href="https://twitter.com/intent/tweet?text=This%20website%20is%20awesome!"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.7501 5.96023C21.033 6.2696 20.2525 6.49226 19.4486 6.57898C20.2832 6.08312 20.9082 5.29976 21.2064 4.37585C20.4232 4.84176 19.5652 5.16847 18.6705 5.34148C18.2965 4.9417 17.8442 4.62321 17.3418 4.40587C16.8394 4.18853 16.2976 4.07699 15.7501 4.0782C13.5353 4.0782 11.7541 5.87351 11.7541 8.07663C11.7541 8.38601 11.7916 8.69538 11.8525 8.99304C8.53608 8.8196 5.57827 7.23523 3.61187 4.80945C3.25357 5.42143 3.0658 6.11826 3.06811 6.82741C3.06811 8.21491 3.77358 9.43835 4.84936 10.1579C4.21539 10.1329 3.59626 9.95866 3.04233 9.64929V9.69851C3.04233 11.6415 4.41577 13.2516 6.24624 13.6219C5.90255 13.7112 5.54899 13.7569 5.1939 13.7579C4.93374 13.7579 4.68765 13.7321 4.43921 13.6969C4.94546 15.2813 6.41968 16.4321 8.17515 16.4696C6.80171 17.5454 5.0814 18.1782 3.21343 18.1782C2.87827 18.1782 2.5689 18.1665 2.2478 18.129C4.01968 19.2657 6.12202 19.9219 8.38608 19.9219C15.7361 19.9219 19.758 13.8329 19.758 8.54773C19.758 8.37429 19.758 8.20085 19.7462 8.02741C20.5244 7.45788 21.2064 6.75241 21.7501 5.96023Z"
                    fill="#9F1C0F"
                  />
                </svg>
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.875 19.875H15.5602V14.1141H17.9977L18.3633 11.2852H15.5602V9.47812C15.5602 8.65781 15.7875 8.1 16.9617 8.1H18.4594V5.56875C18.1992 5.53359 17.3109 5.45625 16.275 5.45625C14.1141 5.45625 12.6352 6.77578 12.6352 9.19687V11.2828H10.193V14.1117H12.6375V19.875H4.125V4.125H19.875V19.875Z"
                    fill="#9F1C0F"
                  />
                </svg>
              </SocialMediaIconsFacebook>
            </Grid>
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
export default SocialMedia;

const useStyles = makeStyles(theme => ({
  download: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "20px"
  },
  customWidth: {
    maxWidth: 500,
    fontSize: "12px"
  }
}));

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

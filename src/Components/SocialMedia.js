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
import GetAppIcon from "@material-ui/icons/GetApp";
import LinkIcon from "@material-ui/icons/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
//import downloadBtn  from '../assets/images/downloadBtn'

//need to bring in data, for 109
const SocialMedia = () => {
  const token = getToken();
  const tier = useSelector(state => state.tierReducer.tier.tier);

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
                  <GetAppIcon className={classes.socialMediaLink}></GetAppIcon>
                </Tooltip>
                {/* <DownloadText className="csv-download">Download</DownloadText> */}
              </CsvDownloader>
            </Grid>

            <Grid item>
              <Tooltip
                title="Copy URL"
                arrow
                classes={{ tooltip: classes.customWidth }}
              >
                <LinkIcon className={classes.socialMediaLink}></LinkIcon>
              </Tooltip>
            </Grid>
            <Grid item>
              <a
                // className="twitter-share-button"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=https://www.databank.sautiafrica.org/data${socialMediaLink}`}
              >
                <Tooltip
                  title="Twitter"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <TwitterIcon
                    className={classes.socialMediaLink}
                  ></TwitterIcon>
                </Tooltip>
              </a>
            </Grid>

            <Grid item>
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://www.databank.sautiafrica.org/data${socialMediaLink}&amp;src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
              >
                <Tooltip
                  title="Facebook"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <FacebookIcon
                    className={classes.socialMediaLink}
                  ></FacebookIcon>
                </Tooltip>
              </a>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Tooltip
                title="Download"
                arrow
                classes={{ tooltip: classes.customWidth }}
              >
                <DownloadModal />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip
                title="Copy URL"
                arrow
                classes={{ tooltip: classes.customWidth }}
              >
                <LinkIcon className={classes.socialMediaLink}></LinkIcon>
              </Tooltip>
            </Grid>
            <Grid item>
              <a
                // className="twitter-share-button"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=https://www.databank.sautiafrica.org/data${socialMediaLink}`}
              >
                <Tooltip
                  title="Twitter"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <TwitterIcon
                    className={classes.socialMediaLink}
                  ></TwitterIcon>
                </Tooltip>
              </a>
            </Grid>
            <Grid item>
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://www.databank.sautiafrica.org/data${socialMediaLink}&amp;src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
              >
                <Tooltip
                  title="Facebook"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <FacebookIcon
                    className={classes.socialMediaLink}
                  ></FacebookIcon>
                </Tooltip>
              </a>
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
    fontSize: "12px"
  },
  socialMediaLink: {
    fontSize: "2.5rem",
    color: "rgb(159, 28, 15)",
    cursor: "pointer",
    opacity: "0.75",
    "&:hover": {
      opacity: 1
    }
  }
}));

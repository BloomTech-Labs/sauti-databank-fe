import React from "react";
import { useHistory } from "react-router-dom";

import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";

import { SignedInDiv, UserHeader } from "./styledComponents/Index";
import { FilterBoxOptions } from "../Components/FilterBoxOptions";
import { flavourOptions } from "../Components/docs/data";
import graphLabels from "../Components/graphLabels";

const filterTemplate = {
  0: {
    nameOfFilter: "Data Series",
    selectedCategory: "",
    selectableOptions: {},
    selectedTable: "",
    selectedTableColumnName: "",
    showOptions: false
  },

  1: {
    nameOfFilter: "Compare SubSamples",
    selectedCategory: "",
    selectableOptions: {},
    selectedTable: "",
    selectedTableColumnName: "",
    showOptions: false
  },
  2: {
    nameOfFilter: "Data Filter",
    selectedCategory: "",
    selectableOptions: {},
    selectedTable: "",
    selectedTableColumnName: "",
    showOptions: true
  }
};

function DashHome() {
  const signedIn = getToken();
  const token = getToken();
  let userEmail;
  if (token) {
    userEmail = decodeToken(token);
    userEmail = userEmail.email;
  }
  const history = useHistory();

  // convert the english word url to option labels the user will see
  const convertOptionUrl = option => {
    // -1 means the search failed
    if (option.search(/forwardslash/) > -1) {
      return option.replace(/forwardslash/g, "/");
    } else if (option.search(/whitespace/) > -1) {
      return option.replace(/whitespace/g, " ");
    } else {
      return option;
    }
  };
  const setupFilter = history => {
    // search: "?filter0equalsgendercommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalsundefinedcommaundefined"
    // http://databank.sautiafrica.org/data?filter0equalsgendercommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalsagecomma10-20zazfilter3equalscrossing_freqcommaWeekly
    // https://t.co/ZBQKNv3gRA?amp=1

    // copy url:
    // https://www.databank.sautiafrica.org/data?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeekly
    // tweet
    // http://databank.sautiafrica.org/data?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeekly
    console.log("history", history);
    console.log(history.location.search.length);
    if (history.location.search.length === 0) {
      // console.log("got here");
      let defaultFilter = {};
      Object.keys(filterTemplate).forEach(filterId => {
        console.log(typeof filterId);
        defaultFilter = {
          ...defaultFilter,
          [filterId]: {
            ...filterTemplate[filterId],
            selectedCategory: filterId === "0" ? "Gender" : "",

            selectableOptions:
              filterId === "0" ? { Female: false, Male: false } : {},

            selectedTable: filterId === "0" || filterId === "1" ? "Users" : "",

            selectedTableColumnName: filterId === "0" ? "gender" : ""
          }
        };
      });
      return defaultFilter;
    } else {
      // https://www.databank.sautiafrica.org/data?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeeklyzazfilter3equalseducationcommaNowhitespaceformalwhitespaceeducation&fbclid=IwAR3ywHMhE7RFDpQEQc7jUCMbRWe8_EoQjlVKHLOaGJGUR2ZGN6EhBDPgHlU
      // http://localhost:3000/data?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeeklyzazfilter3equalseducationcommaNowhitespaceformalwhitespaceeducatio
      // get rid of the "?" at the start of history.location.search
      let searchString = history.location.search.slice(
        1,
        history.location.search.length
      );
      console.log("searching", searchString.search("&fbclid"));

      // facebook case
      // prove &fbclid is in the url
      if (searchString.search("&fbclid") > -1) {
        let locationOfSplit = searchString.search("&fbclid");
        searchString = searchString.slice(0, locationOfSplit);
        console.log(searchString);
      }
      // can't use (_, -, &, ^, z) to separate the filter sections
      // _ is in cross_freq
      // - is in 10-20
      // &, ^ aren't accepted by twitter
      // z is in maize
      // zaz works

      let split1 = searchString.split("zaz");

      // making a new set of filters from the url
      let newFilterObject = {};

      for (var i in split1) {
        let split2 = split1[i].split("equals");
        let split3 = split2[1].split("comma");
        console.log(
          "filter name",
          split2[0],
          "search",
          "table name",
          split3[0],
          "option",
          convertOptionUrl(split3[1])
        );
        if (split3[0] !== "undefined") {
          let optionFlags = {};

          graphLabels[`${split3[0]}`].labels.forEach(option => {
            optionFlags = {
              ...optionFlags,
              [option]: false
            };
          });

          // includes first data filter
          newFilterObject = {
            ...newFilterObject,
            [i]: {
              ...filterTemplate[i],
              selectedCategory:
                // The selectedCategory was cleverly calculated.  This could be done better.
                FilterBoxOptions.tableNamesToCategoryName[split3[0]],
              selectedTableColumnName: split3[0],
              selectableOptions:
                split3[1] === "undefined"
                  ? { ...optionFlags }
                  : // only need to alter split3[1] if we are using it
                    { ...optionFlags, [convertOptionUrl(split3[1])]: true },
              selectedTable:
                // The selectedTable was really cleverly calculated.  This could also be done better.
                FilterBoxOptions.default[
                  FilterBoxOptions.tableNamesToCategoryName[split3[0]]
                ].value.query,

              showOptions: i <= 1 ? filterTemplate[i].showOptions : false
            }
          };
        } else {
          newFilterObject = {
            ...newFilterObject,
            [i]: {
              ...filterTemplate[i],
              // we want the first additional filter to use the filterTemplate show options
              showOptions: i <= 2 ? filterTemplate[i].showOptions : false
            }
          };
        }
      }

      return newFilterObject;
    }
  };
  return (
    <>
      {/* <SignedInDiv>
        <UserHeader></UserHeader>
      </SignedInDiv> */}
      <GraphContainer filters={setupFilter(history)} />
    </>
  );
}

export default DashHome;

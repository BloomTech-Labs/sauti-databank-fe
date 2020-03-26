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
  const isAValidSearchURL = url => {
    let searchString = history.location.search.slice(
      1,
      history.location.search.length
    );
    let split1 = searchString.split("&");
    let newFilterObject = {};

    for (var i in split1) {
      let split2 = split1[i].split("=");
      let split3 = split2[1].split("%2C");
      console.log(
        "filter name",
        split2[0],
        "search",
        "table name",
        split3[0],
        "option",
        split3[1]
      );
    }
  };
  const setupFilter = history => {
    console.log(history.location.search.length);
    if (history.location.search.length === 0) {
      console.log("got here");
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
      let searchString = history.location.search.slice(
        1,
        history.location.search.length
      );

      let split1 = searchString.split("&");
      let newFilterObject = {};

      for (var i in split1) {
        let split2 = split1[i].split("=");
        let split3 = split2[1].split("%2C");
        console.log(
          "filter name",
          split2[0],
          "search",
          "table name",
          split3[0],
          "option",
          split3[1]
        );
        if (split3[0] !== "undefined") {
          let optionFlags = {};
          graphLabels[`${split3[0]}`].labels.forEach(option => {
            optionFlags = {
              ...optionFlags,
              [option]: false
            };
          });

          newFilterObject = {
            ...newFilterObject,
            [i]: {
              ...filterTemplate[i],
              selectedCategory:
                FilterBoxOptions.tableNamesToCategoryName[split3[0]],
              selectedTableColumnName: split3[0],
              selectableOptions:
                split3[1] === "undefined"
                  ? { ...optionFlags }
                  : { ...optionFlags, [split3[1]]: true },
              selectedTable:
                FilterBoxOptions.default[
                  FilterBoxOptions.tableNamesToCategoryName[split3[0]]
                ].value.query,

              showOptions: i <= 2 ? filterTemplate[i].showOptions : true
            }
          };
        } else {
          newFilterObject = {
            ...newFilterObject,
            [i]: {
              ...filterTemplate[i],
              showOptions: i <= 2 ? filterTemplate[i].showOptions : true
            }
          };
        }
      }
      return newFilterObject;
    }
  };
  return (
    <>
      <SignedInDiv>
        <UserHeader></UserHeader>
      </SignedInDiv>
      <GraphContainer filters={setupFilter(history)} />
    </>
  );
}

export default DashHome;

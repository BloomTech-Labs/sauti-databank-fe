// display user information for the admin and other basic info for quick access
import React, { useHistory } from "react";
import GraphContainer from "../GraphContainer";
import { getToken, decodeToken } from "./auth/Auth";

import { SignedInDiv, UserHeader } from "./styledComponents/Index";
import { FilterBoxOptions } from "../Components/FilterBoxOptions";

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

  // const setupFilter = () => {

  //   // no media link
  //   if(useHistory().location.search === 0) {

  //     // initial default
  //     return {
  //       // old plan
  //       // default query setup
  //       // show or hide is only for the first one
  //       // check with russ about changes
  //       // first one: show or hide
  //       // second one: always hide
  //       // all rest: always show
  //       0: {
  //         nameOfFilter: "Data Series",
  //         selectedCategory: "Gender", // label
  //         // selectedOption: undefined,
  //         // avaliableOptions: [],
  //         selectableOptions: {
  //           Female: false,
  //           male: false
  //         },
  //         selectedTable: "Users", // value.query
  //         selectedTableColumnName: "gender", // value.type
  //         showOptions: false
  //       },

  //       1: {
  //         nameOfFilter: "Compare SubSamples",
  //         selectedCategory: "",
  //         // selectedOption: undefined,
  //         // avaliableOptions: [],
  //         selectableOptions: {},
  //         selectedTable: "Users",
  //         selectedTableColumnName: "",
  //         showOptions: false
  //       },
  //       2: {
  //         nameOfFilter: "Data Filter",
  //         selectedCategory: "",
  //         // selectedOption: undefined,
  //         // avaliableOptions: [],
  //         selectableOptions: {},
  //         selectedTable: "",
  //         selectedTableColumnName: "",
  //         showOptions: true
  //       }
  //     }

  //   } else {
  //     // user came to site from twitter, fb, or copy paste link
  //     // create url based object here
  //     let searchString = useHistory().location.search.slice(
  //       1,
  //       useHistory().location.search.length
  //     );
  //     // "?filter0=gender%2CFemale&filter1=age%2Cundefined&filter2=crossing_freq%2CMonthly&filter3=education%2CSecondary"

  //     let split1 = searchString.split("&");
  //     // console.log(split1)
  //     let newFilterObject = {};
  //     for (var i in split1) {
  //       let split2 = split1[i].split("=");
  //       let split3 = split2[1].split("%2C");
  //       console.log(
  //         "filter name",
  //         split2[0],
  //         "search",
  //         "table name",
  //         split3[0],
  //         "option",
  //         split3[1]
  //       );
  //       let optionFlags = {};
  //       console.log();
  //       // get graphLabels[tableName].labels
  //       graphLabels[`${split3[0]}`].labels.forEach(option => {
  //         optionFlags = {
  //           ...optionFlags,
  //           [option]: false
  //         };
  //       });

  //       // the newFilterObject from the previous round is not
  //       // being used to make this one

  //       // wary of spreading using multiple sources inside the object
  //       newFilterObject = {
  //         ...newFilterObject,
  //         [i]: {
  //           // get rid of the "udefined" key
  //           // get already setup categories from the default
  //           // ...filters[i],
  //           // attributes that arent set from the url
  //           nameOfFilter: "Data Series",
  //           selectedCategory: "Gender",

  //           selectedTable: "Users",

  //           selectedTableColumnName: split3[0],
  //           // may permit more than 1 to be true
  //           // get the original set
  //           selectableOptions: {
  //             ...optionFlags,
  //             [split3[1]]: true
  //           },
  //           showOptions: false

  //         }
  //         // maybe the original filter could be reconstructed using the url data(filter is read only)
  //         // Redux?
  //       };
  //     return newFilterObject//{}//the urls search object

  //   }

  // }
  return (
    <>
      <SignedInDiv>
        <UserHeader></UserHeader>
      </SignedInDiv>
      <GraphContainer
      // filters={setupFilter()}
      />
    </>
  );
}

export default DashHome;

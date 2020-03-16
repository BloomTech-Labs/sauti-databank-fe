import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Graph from "./Graph";
import Loader from "react-loader-spinner";
import dataParse from "./dataParse";
import getIndex from "../DataParseHelpers/getIndex";
import graphLabels from "./graphLabels";
import removeMultiple from "../DataParseHelpers/removeMultiple";
/*
graph shows nothing from this, and the sample size is wrong
0:
nameOfFilter: "Data Series"
selectedCategory: "Most Requested Procedure Commodities"
selectedOption: undefined
avaliableOptions: (88) ["Arrow Roots (nduma)", "Avocado", "Avocados", "Bananas", "Bananas - Matoke", "Bananas Cooking", "Bananas Ripe", "Beans", "Brinjals/Eggplant", "Bulls & Cows", "Bulls/Cows", "Cabbage", "Capsicums/pepper", "Carrots", "Cashew Nuts", "Cauliflower", "Chicken (Broiler)", "Chicken (Local)", "Chickens (Local)", "Chillies", "Clothes  & Shoes (New)", "Clothes (New)", "Clothes (Used)", "Clothes and Shoes (New)", "Clothes and Shoes (Used)", "Clothing and Shoes (Used)", "Cosmetics", "Cowpeas", "Cucumber", "Dolichos (Njahi)", "Duck", "Eggs", "Flowers", "Fresh Cassava", "Fresh Nile Perch", "Fresh peas", "Geese", "Goat", "Goats", "Greengrams", "Groundnuts", "Guavas", "Guinea Fowl", "Hides & Skins", "Honey", "Honey (Natural)", "Irish Potatoes", "Kales", "Lemons", "Lime", "Maize", "Maize Cereal", "Maize Flour", "Mangoes", "Meat of bulls/cows/Goats/Sheep", "Milk", "Millet", "Millet Flour", "Mwezi Moja", "New Clothes", "New Clothing and Shoes", "Nile Perch", "Nile Perch Dried or Preserved ", "Omena", "Onions", "Oranges", "Passion fruits", "Pawpaws (papaya)", "Pineapples", "Plastics", "Rice - Husked", "Rice - Processed", "Sheep", "Shoes (New)", "Sorghum", "Sorghum Cereal", "Sorghum Flour", "Sorghum Grains", "Spinach", "Sweet Potatoes", "Tilapia", "Tilapia Dried or Preserved", "Tilapia Fresh", "Timber", "Tomatoes", "Watermelon", "Wheat Flour", "Wheat Grain"]
selectedTable: "Sessions"
selectedTableColumnName: "procedurecommodity"
showOptions: false
__proto__: Object
1:
nameOfFilter: "Compare SubSamples"
selectedCategory: "Education Level"
selectedOption: undefined
avaliableOptions: (4) ["University/College", "Secondary", "Primary", "No formal education"]
selectedTable: "Users"
selectedTableColumnName: "education"
showOptions: false
__proto__: Object
2:
nameOfFilter: "Data Filter"
selectedCategory: ""
selectedOption: undefined
avaliableOptions: []
selectedTable: ""
selectedTableColumnName: ""
showOptions: false
*/
const GetData = props => {
  let queryType = "tradersUsers";
  let QUERY;
  let thisQuery = {};

  const {
    // firstSelectedCheckbox,
    filters,
    // secondSelectedCheckbox,
    // selectedCheckbox,
    // index,
    // crossFilter
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = props;

  console.log("filter 0", filters[0]);
  console.log("filter 1", filters[1]);
  console.log("filter 2", filters[2]);

  // setup the filters part first
  //  setup the queries second
  // type: "gender" column name from the sql table
  // query: "Users" table name

  if (
    filters[0].selectedTable === "Users" &&
    filters[1].selectedTable === "Users" &&
    filters[2].selectedTable === ""
  ) {
    queryType = "tradersUsers";
    console.log("just users");
    console.log(filters[0].selectedTable);
    console.log(filters[1].selectedTable);
    console.log(filters[2].selectedTable);
    // console.log("crossFilter type", "|" + props.crossFilter.type + "|")

    // thisQuery = firstSelectedCheckbox;
    thisQuery = {
      [filters[0].selectedTableColumnName]: filters[0].selectedOption
    };
    QUERY = gql`
      query getUsers($queryTraders: newTraderInput){
        tradersUsers (input: $queryTraders) {
          ${filters[0].selectedTableColumnName}
          ${filters[1].selectedTableColumnName}

        }
      }
      
      `;
  } else {
    // props.index.type = selectedCategory
    // const firstQuery = firstSelectedCheckbox[props.index.type];
    // const firstQuery = filters[0].selectedOption
    /*
notes inside the first printout
first query Male gender firstSelectedCheckbox = {gender: "Male"} filters[0] = {selectedCategory: "gender", selectedOption: "Male"}
first query Male gender {gender: "Male"} {selectedCategory: "gender", selectedOption: "Male"}

*/
    // console.log(
    //   "first query",
    //   // /*firstQuery,*/ props.index.type,
    //   // firstSelectedCheckbox,
    //   filters[0]
    // );
    // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];

    // console.log(
    //   "second query",
    //   // secondQuery,
    //   // props.crossFilter.type,
    //   // secondSelectedCheckbox,
    //   filters[1]
    // );

    // 6 or 7 key, value pairs?
    thisQuery = {
      // [props.index.type]: firstQuery,
      // [filters[0].selectedTableColumnName]: filters[0].selectedOption, //firstQuery,
      // [props.crossFilter.type]: secondQuery
      // [filters[1].selectedTableColumnName]: filters[1].selectedOption
    };
    Object.keys(filters).forEach(filterId => {
      thisQuery = {
        ...thisQuery,
        [filters[filterId].selectedTableColumnName]:
          filters[filterId].selectedOption
      };
    });

    // console.log("the total queries", thisQuery);
    queryType = "sessionsData";
    // QUERY = gql`
    //   query getUsers($queryTraders: newTraderInput){
    //     tradersUsers (input: $queryTraders) {
    //       ${filters[0].selectedTableColumnName}
    //       ${filters[1].selectedTableColumnName}

    //     }
    //   }
    //   `;
    QUERY = gql`
       query getData($queryTraders: newTraderSessionInput){
           sessionsData (input: $queryTraders){
           ${filters[0].selectedTableColumnName}
           ${filters[1].selectedTableColumnName}
           created_date
         }
       }
       `;
  }
  // else if (
  //   filters[0].selectedTable === "Sessions" &&
  //   filters[1].selectedTable === "Users" &&
  //   !filters[2].selectedTableColumnName
  // ) {
  //   queryType = "sessionsData";
  //   console.log("Sessions Users query");
  //   // console.log(firstSelectedCheckbox);
  //   console.log(filters[0]);
  //   console.log(filters[1]);

  //   // const firstQuery = firstSelectedCheckbox[props.index.type];
  //   // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
  //   thisQuery = {
  //     // [props.index.type]: firstQuery,
  //     [filters[0].selectedTableColumnName]: filters[0].selectedOption,
  //     // [props.crossFilter.type]: secondQuery
  //     [filters[1].selectedTableColumnName]: filters[1].selectedOption
  //   };
  //   QUERY = gql`
  //     query getData($queryTraders: newTraderSessionInput){
  //         sessionsData (input: $queryTraders){
  //         ${filters[0].selectedTableColumnName}
  //         ${filters[1].selectedTableColumnName}
  //         created_date
  //       }
  //     }
  //     `;
  // } else if (
  //   filters[0].selectedTable === "Users" &&
  //   filters[1].selectedTable === "Sessions" &&
  //   !filters[2].selectedTableColumnName
  // ) {
  //   queryType = "sessionsData";
  //   console.log("correct query???????????????????????");
  //   console.log(filters[0]);
  //   console.log(filters[1]);
  //   // const firstQuery = firstSelectedCheckbox[props.index.type];
  //   // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
  //   thisQuery = {
  //     // [props.index.type]: firstQuery,
  //     [filters[0].selectedTableColumnName]: filters[0].selectedOption,
  //     // [props.crossFilter.type]: secondQuery
  //     [filters[1].selectedTableColumnName]: filters[1].selectedOption
  //   };
  //   QUERY = gql`
  //     query getData($queryTraders: newTraderSessionInput){
  //       sessionsData(input: $queryTraders){
  //         ${filters[0].selectedTableColumnName}
  //         ${filters[1].selectedTableColumnName}

  //         created_date
  //       }
  //     }`;
  // } else if (
  //   filters[0].selectedTable === "Sessions" &&
  //   filters[1].selectedTable === "Sessions" &&
  //   !filters[2].selectedTableColumnName
  // ) {
  //   queryType = "sessionsData";
  //   console.log("breaking!!!!!!!!!!!!!!!");
  //   thisQuery = undefined;
  //   QUERY = gql`
  //     query getData($queryTraders: newTraderSessionInput){
  //       sessionsData (input: $queryTraders) {
  //         ${filters[0].selectedTableColumnName}
  //         ${filters[1].selectedTableColumnName}

  //         created_date
  //       }
  //     }
  //     `;
  // } else if (
  //   filters[0].selectedTable === "Users" &&
  //   filters[1].selectedTable === "Users" &&
  //   filters[2].selectedTable === "Users"
  // ) {
  //   // const firstQuery = firstSelectedCheckbox[props.index.type];
  //   // const secondQuery = secondSelectedCheckbox[props.crossFilter.type];
  //   // const thirdQuery = selectedCheckbox[props.additionalFilter.type];
  //   thisQuery = {
  //     // [props.index.type]: firstQuery,
  //     [filters[0].selectedTableColumnName]: filters[0].selectedOption,

  //     // [props.crossFilter.type]: secondQuery,
  //     // [props.additionalFilter.type]: thirdQuery
  //     [filters[1].selectedTableColumnName]: filters[1].selectedOption,
  //     [filters[2].selectedTableColumnName]: filters[2].selectedOption
  //   };
  //   queryType = "tradersUsers";
  //   // # ${props.index.type}
  //   // # ${props.crossFilter.type}
  //   // # ${props.additionalFilter.type}

  //   QUERY = gql`
  //       query getUsers($queryTraders: newTraderInput){
  //         tradersUsers(input: $queryTraders) {
  //           ${filters[0].selectedTableColumnName}
  //           ${filters[1].selectedTableColumnName}

  //         }
  //         additionalFilterData: tradersUsers {
  //           ${filters[2].selectedTableColumnName}

  //         }
  //       }
  //       `;
  // } else {
  //   console.log("all remaining combinations");
  //   console.log(filters);
  //   // some combinations break the program
  //   // it appears thet if there is a query with nothing asked to return then the query fails
  //   queryType = "sessionsData";
  //   QUERY = gql`
  //     query getData($queryTraders: newTraderSessionInput){
  //       sessionsData(input: $queryTraders){
  //         ${filters[0].selectedTableColumnName}
  //         ${filters[1].selectedTableColumnName}

  //         created_date
  //       }
  //       additionalFilterData: sessionsData{
  //           id
  //           ${filters[2].selectedTableColumnName}

  //       }
  //     }
  //     `;
  // }

  console.log("FINAL QUERY", thisQuery, /*firstSelectedCheckbox*/ filters);
  console.log("dates", filterBoxStartDate, filterBoxEndDate);
  console.log("search kind", queryType);

  // it would be nice for this to run in a way that doesn't return any data untill the user actually sets up a query

  let { loading, data } = useQuery(QUERY, {
    variables: { queryTraders: thisQuery }
  });
  // [thisQuery]
  //queryType: props.selectedCheckbox
  if (data) {
    console.log(`returned data2`, data[queryType]);
    // console.log(firstSelectedCheckbox);
    // let filteredByDate = dataParse.filterByDate(data[queryType], filterBoxStartDate, filterBoxEndDate)
    // console.log("filtered by date", filteredByDate)
    // console.log(filters);
  }

  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={100000}
        />
      </div>
    );
  }
  // data = [...data.tradersUsers, ...data.tradersData] // This is for when we are supporting multiple queries of same type

  // This is how we nab checkbox options.

  // let filteredData;
  // if (
  //   props.additionalFilter.type &&
  //   !graphLabels[`${props.additionalFilter.type}`]) {
  //   removeMultiple(data.additionalFilterData);
  //   filteredData = getIndex(
  //     data.additionalFilterData,
  //     `${props.additionalFilter.type}`
  //   ).map(obj => obj[`${props.additionalFilter.type}`]);
  //   filteredData = filteredData.filter(item => item !== null);
  // }

  // if (props.crossFilter.type &&
  //   !graphLabels[`${props.crossFilter.type}`]) {
  //   removeMultiple(data.sessionsData)
  //   filteredData = getIndex(
  //     data.sessionsData,
  //     `${props.crossFilter.type}`
  //   ).map(obj => obj[`${props.crossFilter.type}`]);
  //   filteredData = filteredData.filter(item => item !== null);
  // }

  // const filterByDate = (data, startDate, endDate) => {
  //   startDate = startDate.replace(/-/g, "");
  //   endDate = endDate.replace(/-/g, "");
  //   // console.log("about to filter data", data)
  //   const filteredData = data.filter(obj => {
  //     const objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
  //     return objectDate > startDate && objectDate < endDate;
  //   });

  //   return filteredData;
  // };

  // breaks if there is no data
  // works
  // if (Object.keys(data[`${queryType}`][0]).includes("created_date")) {
  //   console.log("ready to filter by date");
  //   // before filtering (most requested procedure commodities(Sessions case)) count = 19990
  //   // after filtering by Augist 9th 2017 count = 19215
  //   // before filtering first item date = 2017-06-20T00:16:28.0
  //   // after filtering first item date = 2017-08-10T15:06:33.00
  //   const filteredData = filterByDate(
  //     data[`${queryType}`],
  //     filterBoxStartDate,
  //     filterBoxEndDate
  //   );
  //   console.log("filtered by date", filteredData);
  // }
  // console.log("right before data parse",
  //           filters[0].selectedTableColumnName,
  //           data[`${queryType}`],
  //           filters[1].selectedTableColumnName,
  //           filterBoxStartDate,
  //           filterBoxEndDate,
  //           filters[2].selectedTableColumnName,
  //           filters[0].selectedTable)
  const chartData = dataParse(
    // props.index.type,
    filters[0].selectedTableColumnName,
    data[`${queryType}`],
    filters[1].selectedTableColumnName,
    // props.crossFilter.type,
    // props.startDate,
    filterBoxStartDate,
    // props.endDate,
    filterBoxEndDate,
    filters[2].selectedTableColumnName,
    // props.additionalFilter.type,
    // props.index.query
    filters[0].selectedTable,
    filters[1].selectedTable
  ); /// first arg is what we are indexing by, second is data, third is what we are cross-filtering by. Will get changed to dynamic inputs
  // console.log("csvData", chartData.dataStructure);
  // console.log(`cross filter type`, props.crossFilter.type);

  console.log("chartdata_____-----", chartData);

  // if (props.crossFilter.type !== "") {
  if (filters[1].selectedTableColumnName !== "") {
    return (
      <div>
        <h1 className="graph-title">
          {/*props.label*/ filters[0].selectedCategory} by{" "}
          {/*props.crossLabel*/ filters[1].selectedCategory}
        </h1>
        {/*props.additionalFilter.type*/ filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter:{" "}
            {/*props.additionalFilter.label*/ filters[1].selectedCategory} -{" "}
            {/* selectedCheckbox: {categoryName: optionName }*/}
            {Object.values(
              /*props.selectedCheckbox*/ {
                [filters[2].selectedCategory]: filters[2].selectedOption
              }
            ).length === 0
              ? "none"
              : Object.values(
                  /*props.selectedCheckbox*/ {
                    [filters[2].selectedCategory]: filters[2].selectedOption
                  }
                )[0]}
          </h3>
        )}

        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          // crossFilter={props.crossFilter.type}
          crossFilter={filters[1].selectedCategory}
          // additionalFilter={props.additionalFilter.type}
          additionalFilter={filters[2].selectedCategory}
          // selectedCheckbox={props.selectedCheckbox}
          selectedCheckbox={{
            [filters[2].selectedCategory]: filters[2].selectedOption // probably undefined
          }}
          keys={chartData.crossFilterValues}
          // index={props.index.type}
          index={filters[0].selectedTableColumnName}
          // label={props.label}
          label={filters[0].selectedCategory}
          groupMode={"grouped"}
          // filteredData={filteredData}
          sampleSize={chartData.totalSampleSize}
          // what do these do?
          checkboxOptions={filters[2].avaliableOptions}

          // checkboxOptions={props.checkboxOptions}
          // setCheckboxOptions={props.setCheckboxOptions}
          // setSecondCheckboxOptions={props.setSecondCheckboxOptions}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="graph-title">
          {/*props.label*/ filters[0].selectedCategory}
        </h1>
        {/*props.additionalFilter.type*/ filters[2].selectedTableColumnName && (
          <h3 className="graph-title-small">
            Additional Filter:{" "}
            {/*props.additionalFilter.label*/ filters[2].selectedCategory} -{" "}
            {Object.values(
              /*props.selectedCheckbox*/ {
                [filters[2].selectedCategory]: filters[2].selectedOption
              }
            ).length === 0
              ? "none"
              : Object.values(
                  /*props.selectedCheckbox*/ {
                    [filters[2].selectedCategory]: filters[2].selectedOption
                  }
                )[0]}
          </h3>
        )}
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          // additionalFilter={props.additionalFilter.type}
          additionalFilter={filters[2].selectedCategory}
          // selectedCheckbox={props.selectedCheckbox}
          selectedCheckbox={{
            [filters[2].selectedCategory]: filters[2].selectedOption
          }}
          // crossFilter={props.crossFilter.type}
          crossFilter={filters[1].selectedCategory}
          keys={chartData.keys || chartData.csvKeys}
          // index={props.index.type}
          index={filters[0].selectedTableColumnName}
          // label={props.label}
          label={filters[0].selectedCategory}
          groupMode={"stacked"}
          // filteredData={filteredData}
          sampleSize={chartData.sampleSize}
          // what do these do?
          // these appear to hold the options the user can select
          // the checkboxOptions is for the third category of options the user can select
          // the secondCheckboxOptions is for the second category of options the user can select
          // general formula for getting the options
          // graphLabels[`${filters[i].selectedTableColumnName}`].labels
          // checkboxOptions={props.checkboxOptions}
          // must have a list of something
          checkboxOptions={filters[2].avaliableOptions}
          // setCheckboxOptions={props.setCheckboxOptions}
          // doesn't appear to be used in the graph
          // setSecondCheckboxOptions={props.setSecondCheckboxOptions}
        />
      </div>
    );
  }
};

export default GetData;

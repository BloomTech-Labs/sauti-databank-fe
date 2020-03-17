import abbreviateLabels from "./abbreviateLabels";
import graphLabels from "../Components/graphLabels";
import getIndex from "./getIndex";
/* 



*/
// tomorrow start looking in here
const setCrossedItems = (
  data,
  dataStructure,
  crossFilter,
  indexBy,
  additionalFilter,
  queryType,
  crossFilterQuery
) => {
  console.log(
    "SET_CROSSED_ITEMS",
    data,
    dataStructure,
    crossFilter,
    indexBy,
    additionalFilter,
    queryType
  );
  //will be used to store all possible values for the index value, which is referring to a column in the database table
  let indexByValues = [];
  //will be used to store all possible values for the cross filter value, which is referring to a column in the database table
  let crossFilterValues = [];
  //will be used to store array of objects, where the key will be what is being cross filtered by / "crossFilter"
  // and the value is every possible value for that cross filter in the database
  let crossFilterKeys = [];

  // IF NOT A "MOST REQUESTED" GRAPH, SETS THE KEYS IN A PREDETERMINED ORDER BASED ON WHAT ORDER LANCE WANTS THEM IN
  // OTHERWISE IT IS GOING TO BE SORTED MOST TO LEAST REQUESTED AT A LATER TIME
  if (graphLabels[`${crossFilter}`]) {
    crossFilterKeys = graphLabels[`${crossFilter}`].structure;
    console.log(
      "IF THERE IS A GRAPHLABEL",
      crossFilter,
      graphLabels[`${crossFilter}`]
    );
  } else {
    crossFilterKeys = getIndex(data, crossFilter);
    console.log("NO GRAPHLABEL", crossFilter, graphLabels[`${crossFilter}`]);
  }

  // Puts each value from key:value pair into an array
  // ['Female', 'Male', null]
  dataStructure.forEach(obj => indexByValues.push(Object.values(obj)[0]));
  crossFilterKeys.forEach(
    obj =>
      Object.values(obj)[0] !== null &&
      crossFilterValues.push(Object.values(obj)[0])
  );
  // Building an array of objects where each object is formatted in this way
  // ex: if indexBy = "gender" and crossFilter = "age"
  // {"gender": "Male", "10-20": 167, "20-30": 237, "30-40": 642, "40-50": 210, "50-60": 123, "60-70": 1}
  // There will be an object like this for each value of the indexByValues ex: ["Male", "Female"]

  console.log("ONEEEEEE - crossfiltervalues");

  indexByValues.forEach((key, index) => {
    const crossFilteredData = [];
    const filtered = data.filter(trader => trader[`${indexBy}`] === key);
    crossFilterValues.forEach((key, index) => {
      const crossFiltered = filtered.filter(
        trader => trader[`${crossFilter}`] === key
      );
      crossFilteredData.push({ [`${key}`]: crossFiltered.length });
    });
    crossFilteredData.forEach(obj => {
      return (dataStructure[index] = {
        ...dataStructure[index],
        [`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0]
      });
    });
  });

  //If graph is "Most Requested" sort from Most to Least requested and provide top 7 objects
  let keyValueArrIndex = [];
  let keyValueArrCross = [];
  let newDataStructure = [];

  //if Index is "Most Requested" type, and CrossFilter is not:
  if (!graphLabels[`${indexBy}`] && graphLabels[`${crossFilter}`]) {
    console.log(
      "IF NO GRAPHLABELS FOR FIRST FILTER, CROSSFIILTER HAS GRAPHLABELS"
    );
    dataStructure.map(obj => {
      return keyValueArrIndex.push([
        obj[`${indexBy}`],
        Object.values(obj)
          .slice(1)
          .reduce((a, b) => a + b)
      ]);
    });
    keyValueArrIndex = keyValueArrIndex.sort((a, b) => b[1] - a[1]).slice(0, 7);
    keyValueArrIndex.forEach(arr => {
      for (let i = 0, len = dataStructure.length; i < len; i++) {
        if (arr[0] === dataStructure[i][`${indexBy}`]) {
          newDataStructure.push(dataStructure[i]);
        }
      }
    });
    dataStructure = newDataStructure;
  }
  // it starts being different here
  if (
    graphLabels[`${indexBy}`] &&
    graphLabels[`${crossFilter}`] &&
    queryType === "Sessions" &&
    crossFilterQuery === "Users"
  ) {
    console.log(
      "IF BOTH HAVE GRAPHLABELS AND FIRST FILTER IS SESSIONS AND 2ND FILTER IS USERS"
    );
    dataStructure.map(obj => {
      return keyValueArrIndex.push([
        obj[`${indexBy}`],
        Object.values(obj)
          .slice(1)
          .reduce((a, b) => a + b)
      ]);
    });
    keyValueArrIndex = keyValueArrIndex.sort((a, b) => b[1] - a[1]).slice(0, 7);
    keyValueArrIndex.forEach(arr => {
      for (let i = 0, len = dataStructure.length; i < len; i++) {
        if (arr[0] === dataStructure[i][`${indexBy}`]) {
          newDataStructure.push(dataStructure[i]);
        }
      }
    });
    dataStructure = newDataStructure;
  }

  // If CrossFilter is "Most Requested" type, and Index is not:
  if (!graphLabels[`${crossFilter}`] && graphLabels[`${indexBy}`]) {
    console.log(
      "IF CROSS FILTER HAS NO GRAPHLABELS, AND THE FIRST FILTER DOES"
    );
    dataStructure.forEach(obj => {
      let crossKeys = Object.keys(obj);
      let crossValues = Object.values(obj);
      let tempCrossArr = [];
      crossKeys.forEach((key, index) => {
        tempCrossArr.push([key, crossValues[index]]);
      });
      let slicedCrossArr = tempCrossArr.sort((a, b) => b[1] - a[1]).slice(0, 7);
      crossFilterValues = [];
      slicedCrossArr.slice(1).forEach(arr => {
        crossFilterValues.push(arr[0]);
      });
      let tempObj = {};
      slicedCrossArr.forEach(arr => {
        tempObj = { ...tempObj, [arr[0]]: arr[1] };
      });
      newDataStructure.push(tempObj);
    });
    dataStructure = newDataStructure;
  }
  console.log("CROSS FILTER CROSSED ITEMS", crossFilterQuery);
  if (
    graphLabels[`${crossFilter}`] &&
    graphLabels[`${indexBy}`] &&
    queryType === "Users"
  ) {
    console.log("NEW - BOTH GRAPHLABELS - FIRST FILTER IS USERS");
    dataStructure.forEach(obj => {
      let crossKeys = Object.keys(obj);
      let crossValues = Object.values(obj);
      let tempCrossArr = [];
      crossKeys.forEach((key, index) => {
        tempCrossArr.push([key, crossValues[index]]);
      });
      let slicedCrossArr = tempCrossArr.sort((a, b) => b[1] - a[1]).slice(0, 7);
      crossFilterValues = [];
      slicedCrossArr.slice(1).forEach(arr => {
        crossFilterValues.push(arr[0]);
      });
      let tempObj = {};
      slicedCrossArr.forEach(arr => {
        tempObj = { ...tempObj, [arr[0]]: arr[1] };
      });
      newDataStructure.push(tempObj);
    });
    dataStructure = newDataStructure;
  }

  if (
    graphLabels[`${crossFilter}`] &&
    graphLabels[`${indexBy}`] &&
    queryType === "Sessions" &&
    crossFilterQuery === "Sessions"
  ) {
    console.log("IF BOTH FILTERS HAVE GRAPHLABELS AND BOTH ARE SESSIONS");
    //commodityproduct: "Maize", "KEN": 123, "RWA": 200
    //commodityproduct: "Beans", "KEN": 152, "RWA": 478
    dataStructure.map(obj => {
      if (obj[`${indexBy}`] !== null && obj[`${indexBy}`] !== undefined) {
        return keyValueArrIndex.push([
          obj[`${indexBy}`],
          Object.values(obj)
            .slice(1)
            .reduce((a, b) => +a + +b)
        ]);
      }
    });
    //Sort Index values and take only the top 7
    keyValueArrIndex = keyValueArrIndex.sort((a, b) => b[1] - a[1]).slice(0, 7);
    console.log("keyvalArr", keyValueArrIndex);
    keyValueArrIndex.forEach(arr => {
      newDataStructure.push({ [indexBy]: arr[0] });
    });
    let topSeven = [];
    newDataStructure.forEach(item => {
      topSeven.push(item[`${indexBy}`]);
    });
    dataStructure = dataStructure.filter(obj =>
      topSeven.includes(obj[`${indexBy}`])
    );
    let keysToSort = Object.keys(dataStructure[0]).slice(1);
    let tempObj = {};
    keysToSort.forEach(item => {
      return (tempObj = { ...tempObj, [`${item}`]: 0 });
    });
    keysToSort = tempObj;
    dataStructure.forEach(obj => {
      for (var key in obj) {
        if (Number.isInteger(+obj[key])) keysToSort[key] += Number(obj[key]);
      }
    });

    //Sort CrossFilter values and take only the top 7 overall, then put them in the index array to be displayed
    let crossKeys = Object.keys(keysToSort).filter(
      item => item !== undefined && item !== "undefined"
    );
    let crossValues = Object.values(keysToSort);
    let tempCrossArr = [];
    crossKeys.forEach((key, index) => {
      tempCrossArr.push([key, crossValues[index]]);
    });
    let slicedCrossArr = tempCrossArr.sort((a, b) => b[1] - a[1]).slice(0, 7);
    crossFilterValues = [];
    slicedCrossArr.forEach(arr => {
      crossFilterValues.push(arr[0]);
    });
    let temp = {};
    slicedCrossArr.forEach(arr => {
      temp = { ...temp, [arr[0]]: arr[1] };
    });

    keysToSort = temp;

    let keysToKeep = Object.keys(keysToSort);

    //Build out datastructure to look as we want it
    dataStructure.forEach((obj, index) => {
      let tempObject = { [indexBy]: obj[indexBy] };
      for (var key in obj) {
        if (keysToKeep.includes(key)) {
          tempObject = { ...tempObject, [key]: obj[key] };
        }
      }
      dataStructure[index] = tempObject;
    });
  }

  //If both Index and CrossFilter are "Most Requested" type:

  if (!graphLabels[`${crossFilter}`] && !graphLabels[`${indexBy}`]) {
    console.log("IF BOTH FILTERS HAVE NO GRAPHLABELS");
    //commodityproduct: "Maize", "KEN": 123, "RWA": 200
    //commodityproduct: "Beans", "KEN": 152, "RWA": 478
    dataStructure.map(obj => {
      if (obj[`${indexBy}`] !== null && obj[`${indexBy}`] !== undefined) {
        return keyValueArrIndex.push([
          obj[`${indexBy}`],
          Object.values(obj)
            .slice(1)
            .reduce((a, b) => +a + +b)
        ]);
      }
    });
    //Sort Index values and take only the top 7
    keyValueArrIndex = keyValueArrIndex.sort((a, b) => b[1] - a[1]).slice(0, 7);
    console.log("keyvalArr", keyValueArrIndex);
    keyValueArrIndex.forEach(arr => {
      newDataStructure.push({ [indexBy]: arr[0] });
    });
    let topSeven = [];
    newDataStructure.forEach(item => {
      topSeven.push(item[`${indexBy}`]);
    });
    dataStructure = dataStructure.filter(obj =>
      topSeven.includes(obj[`${indexBy}`])
    );
    let keysToSort = Object.keys(dataStructure[0]).slice(1);
    let tempObj = {};
    keysToSort.forEach(item => {
      return (tempObj = { ...tempObj, [`${item}`]: 0 });
    });
    keysToSort = tempObj;
    dataStructure.forEach(obj => {
      for (var key in obj) {
        if (Number.isInteger(+obj[key])) keysToSort[key] += Number(obj[key]);
      }
    });

    //Sort CrossFilter values and take only the top 7 overall, then put them in the index array to be displayed
    let crossKeys = Object.keys(keysToSort).filter(
      item => item !== undefined && item !== "undefined"
    );
    let crossValues = Object.values(keysToSort);
    let tempCrossArr = [];
    crossKeys.forEach((key, index) => {
      tempCrossArr.push([key, crossValues[index]]);
    });
    let slicedCrossArr = tempCrossArr.sort((a, b) => b[1] - a[1]).slice(0, 7);
    crossFilterValues = [];
    slicedCrossArr.forEach(arr => {
      crossFilterValues.push(arr[0]);
    });
    let temp = {};
    slicedCrossArr.forEach(arr => {
      temp = { ...temp, [arr[0]]: arr[1] };
    });

    keysToSort = temp;

    let keysToKeep = Object.keys(keysToSort);

    //Build out datastructure to look as we want it
    dataStructure.forEach((obj, index) => {
      let tempObject = { [indexBy]: obj[indexBy] };
      for (var key in obj) {
        if (keysToKeep.includes(key)) {
          tempObject = { ...tempObject, [key]: obj[key] };
        }
      }
      dataStructure[index] = tempObject;
    });
  }

  console.log("done with graphlabels");

  //Remove any nulls incase there are any
  dataStructure = dataStructure.filter(obj => obj[`${indexBy}`] !== null);

  //////////////////////// THE CODE BELOW WILL GET SAMPLE SIZE, CALCULATE PERCENTAGES, ETC... ////////////////////
  // GET SAMPLE SIZE
  // For each object, want to add up numbers skipping first key value pair, which is the index and will not have a number as value
  //[{gender: "Male", "10-20": 200, "20-30": 150}, {gender: "Female", "10-20": 140, "20-30": 100}]
  // add values where not indexing by
  // {"Male": 350, "Female": 240}
  let sampleArr = {};
  dataStructure.map(item => {
    let sampleSize = 0;

    //["Male", "130", "100", "34"]
    let valuesArr = Object.values(item);
    valuesArr.forEach(value => {
      if (Number.isInteger(+value)) {
        return (sampleSize += Number(value));
      }
    });

    return (sampleArr = {
      ...sampleArr,
      [`${valuesArr[0]}`]: sampleSize
    });
  });

  //This is the sampleSize of all responses {"Male": 153, "Female": 124 => totalSampleSize: 277}
  let totalSampleSize = Object.values(sampleArr).reduce((a, b) => a + b);

  //CHANGE VALUES TO PERCENTAGE OF SAMPLE SIZE
  //[{gender: "Male", "10-20": 200, "20-30": 150},{gender: "Female", "10-20": 140, "20-30": 100}]

  // dataStructure becomes data set for a csv file, and percentageData is for nivo chart.
  let percentageData = dataStructure.map(obj => Object.assign({}, obj));

  percentageData.forEach(obj => {
    for (var property in obj) {
      if (Number.isInteger(+obj[property])) {
        obj[property] = +(
          (obj[property] / sampleArr[obj[`${indexBy}`]]) *
          100
        ).toFixed(1);
      }
    }
  });

  // ABBREVIATE LABELS IF THERE ARE ANY TO ABBREVIATE (SEE LINE 410 DOWN)
  abbreviateLabels(percentageData, indexBy);

  //GET ADDITIONAL FILTER OPTIONS TO DISPLAY ON SCREEN IF ADDITIONAL FILTER IS SELECTED
  const additionalFilterOptions = getIndex(data, additionalFilter)
    .map(obj => Object.values(obj)[0])
    .filter(str => str !== null);

  console.log("TWOOOOOO - crossfiltervalues");

  return {
    dataStructure,
    crossFilterValues,
    indexBy,
    totalSampleSize,
    additionalFilterOptions,
    percentageData
  };
};

export default setCrossedItems;

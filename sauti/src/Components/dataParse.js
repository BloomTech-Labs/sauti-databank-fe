import graphLabels from "./graphLabels";

const dataParse = (indexBy, data, crossFilter, argForQuery) => {
  let dataStructure;

  if (indexBy === "request_type") {
    dataStructure = getIndex(data, indexBy);
    return getMostRequested(data, dataStructure, indexBy, argForQuery);
  } else {
    dataStructure = graphLabels[`${indexBy}`].structure;

    if (crossFilter !== "") {
      return setCrossedItems(data, dataStructure, crossFilter, indexBy);
    } else {
      return setItem(data, dataStructure, indexBy);
    }
  }
};

// THESE NEED TO BE IN CORRECT ORDER OR FUNCTION WILL NOT WORK
const getIndex = (data, indexBy) => {
  // Shrinks objects to one single key:value pair specified by the indexBy
  const cleanedArr = data.map(
    item => (item = { [`request_value`]: item[`request_value`] })
  );

  // Reduces down to a set of the possible key:value pairs
  const reducedArr = [...new Set(cleanedArr.map(JSON.stringify))].map(
    JSON.parse
  );

  return reducedArr;
  // [{gender: male}, {gender: female}, {gender: null},]
};

const setCrossedItems = (data, dataStructure, crossFilter, indexBy) => {
  const keysArr = [];
  let crossFilterKeysArr = [];

  const crossFilterKeys = graphLabels[`${crossFilter}`].structure;

  // Puts each value from key:value pair into an array
  // ['Female', 'Male', null]
  dataStructure.forEach(obj => keysArr.push(Object.values(obj)[0]));
  crossFilterKeys.forEach(
    obj =>
      Object.values(obj)[0] !== null &&
      crossFilterKeysArr.push(Object.values(obj)[0])
  );

  // For each object in the array,
  keysArr.forEach((key, index) => {
    // Gets every trader at the index where it equals the value in the keysArr
    const filtered = data.filter(trader => trader[`${indexBy}`] === key);

    // Gets every trader at the crossFilter where it equals the value in the crossFilterKeysArr 
    // Then pushes into crossFilteredData
    const crossFilteredData = [];
    crossFilterKeysArr.forEach((key, index) => {
      const crossFiltered = filtered.filter(
        trader => trader[`${crossFilter}`] === key
      );
      crossFilteredData.push({ [`${key}`]: crossFiltered.length });
    });

    // Builds the object that will be sent to the graph component
    crossFilteredData.forEach(obj => {
      return (dataStructure[index] = {
        ...dataStructure[index],
        [`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0]
      });
    });
  });

  console.log('data structure', dataStructure)

  //TESTING PERCENTAGES
  // GET SAMPLE SIZE
  // For each object, want to add up numbers skipping first key value pair, which is the index and will not have a number as value
  //[{gender: "Male", "10-20": 200, "20-30": 150},
  // {gender: "Female", "10-20": 140, "20-30": 100}]
  let sampleArr = {} // {"Male": 153, "Female": 124}
  dataStructure.map(item => {
    // {gender: "Male", "10-20": 200, "20-30": 150}
    // add values where not indexing by
    console.log('object values', Object.values(item))
    let sampleSize = 0

    //["Male", "130", "100", "34"]
    let valuesArr = Object.values(item)
    valuesArr.map(value => {
      if(Number.isInteger(+value)){
        sampleSize += Number(value)
      }
    })

    sampleArr = {
      ...sampleArr,
      [`${valuesArr[0]}`]: sampleSize 
    }
  });

  let totalSampleSize = Object.values(sampleArr).reduce((a,b) => a + b)
  console.log('sampleArr', sampleArr)
  console.log('total Sample Size', totalSampleSize)
  
  console.log('data structure before 2nd loop', dataStructure)
  //CHANGE VALUES TO PERCENTAGE OF SAMPLE SIZE
  //[{gender: "Male", "10-20": 200, "20-30": 150},
  // {gender: "Female", "10-20": 140, "20-30": 100}]
  dataStructure.forEach(obj => {
  for(var property in obj){
    if(Number.isInteger(+obj[property])){
      obj[property] = ((obj[property] / sampleArr[`${obj[indexBy]}`]) * 100).toFixed(1)
    }
  }
  });

  const optionsForCheckbox = Object.keys(dataStructure[0]).slice(1)

  console.log('data structure before return', dataStructure)
  console.log('options', optionsForCheckbox)

  return { dataStructure, crossFilterKeysArr, indexBy, totalSampleSize, optionsForCheckbox};
};

const setItem = (data, dataStructure, indexBy) => {
  console.log("datastructure", dataStructure);
  console.log("data", data);
  let arr = [];

  // Puts each value from key:value pair into an array
  // ['Female', 'Male', null]
  dataStructure.forEach(obj => arr.push(Object.values(obj)[0]));

  // For each object in the array,
  arr.forEach((key, index) => {
    // Gets every trader at the index where it equals the value in the arr
    const filtered = data.filter(trader => trader[`${indexBy}`] === key).length;

    dataStructure[index] = {
      ...dataStructure[index],
      [`${arr[index]}`]: filtered
    };
  });

  // This block of code transforms from raw numbers to percentages
  let numberValues = [];

  let sampleSize = 0;

  dataStructure.map(item => {
    const keyValue = item[`${indexBy}`];
    numberValues.push(Number(item[keyValue]));
    sampleSize += Number(item[keyValue]);
  });

  dataStructure.forEach(obj => {
    const keyValue = obj[`${indexBy}`];
    obj[keyValue] = Math.round((obj[keyValue] / sampleSize) * 100);
  });

  return {
    dataStructure,
    keys: graphLabels[`${indexBy}`].labels,
    indexBy,
    sampleSize
  };
};

const getMostRequested = (data, dataStructure, indexBy, argForQuery) => {
  let arr = [];

  // Puts each value from key:value pair into an array
  // ['Female', 'Male', null]
  dataStructure.forEach(obj => arr.push(Object.values(obj)[0]));

  // For each object in the array,
  arr.forEach((key, index) => {
    // Gets every trader at the index where it equals the value in the arr
    const filtered = data.filter(value => value[`request_value`] === key)
      .length;

    dataStructure[index] = {
      ...dataStructure[index],
      [`${arr[index]}`]: filtered
    };
  });

  dataStructure = dataStructure
    .sort((a, b) => (Object.values(a)[1] > Object.values(b)[1] ? -1 : 1))
    .splice(0, 5);

  const keys = dataStructure.map(obj => obj.request_value);

  // This block of code transforms from raw numbers to percentages
  let numberValues = [];
  let sampleSize = 0;

  dataStructure.map(item => {
    const keyValue = item[`request_value`];
    numberValues.push(Number(item[keyValue]));
    sampleSize += Number(item[keyValue]);
  });

  dataStructure.forEach(obj => {
    const keyValue = obj[`request_value`];
    obj[keyValue] = Math.round((obj[keyValue] / sampleSize) * 100);
  });
  console.log(dataStructure);
  if (
    argForQuery === "procedurerelevantagency" ||
    argForQuery === "procedurerequireddocument" ||
    argForQuery === "procedurecommodity" ||
    argForQuery === "procedureorigin"
  ) {
    abbreviateLabels(dataStructure);
  }

  return { dataStructure, keys: keys.reverse(), indexBy, sampleSize };
};

const abbreviateLabels = dataStructure => {
  let replaceValues = {
    //Agencies
    "Ministry of Agriculture Animal Industry & Fisheries (MAAIF)": "MAAIF",
    "Kenya Revenue Authority (KRA)": "KRA",
    "COMESA Trade Information Desk Office (TIDO)": "TIDO",
    "Uganda National Bureau of Standards (UNBS)": "UNBS",
    "PORT Health": "PORT Health",
    "Kenya Plant Health Inspectorate Service (KEPHIS)": "KEPHIS",
    "Uganda Revenue Authority (URA)": "URA",
    "Kenya Bureau of Standards (KEBS)": "KEBS",
    "National Biosafety Authority (NBA)": "NBA",
    "Kenya National Chamber of Commerce & Industry (KNCCI)": "KNCCI",
    "Clearing Agent": "Clearing Agent",
    "Uganda Police Dpts": "UPD",
    //Documents
    "Import Permit": "Import Permit",
    "Valid Invoice": "Valid Invoice",
    "Simplified Certificate Of Origin (SCOO)": "SCOO",
    "National ID Card/Passport": "Passport/ID",
    "Yellow Fever Card": "YF Card",
    "Certificate of Origin": "Cert of Origin",
    "Phytosanitary Certificate": "Phyto Cert",
    "Import Entry Declaration Form (SAD)": "SAD",
    "Fumigation Certificate": "Fumigation Cert",
    "Bill of Lading": "Bill of Lading",
    //Procedure Commodity
    "Clothes and Shoes (New)": "Clothes/Shoes (New)",
    "Clothes and Shoes (Used)": "Clothes/Shoes (Used)",
    //
    OutsideEAC: "Outside EAC"
  };
  dataStructure.forEach(obj => {
    let longValue = obj["request_value"];
    if (replaceValues[`${longValue}`]) {
      obj["request_value"] = replaceValues[`${longValue}`];
    }
  });

  return dataStructure;
};

export default dataParse;

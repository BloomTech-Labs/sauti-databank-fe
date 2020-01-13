import graphLabels from "./graphLabels";


const dataParse = (indexBy, data, crossFilter, argForQuery) => {
  let dataStructure;

  console.log("index", indexBy, "cross", crossFilter)
  //when single filtering "Most Requested" graph
  if (indexBy === "request_type" && crossFilter === "") {
    dataStructure = getIndex(data, indexBy);
    return getMostRequested(data, dataStructure, indexBy, argForQuery);
  } 
  //when cross-filtering "Most Requested" as index
  else if(indexBy === "request_type" && crossFilter !== ""){
    dataStructure = getIndex(data, indexBy)
    return setCrossedItems(data, dataStructure, crossFilter, indexBy)
  } else {
    //telling function how to format data. See "graphLabels.js"
    dataStructure = graphLabels[`${indexBy}`].structure;
    
    //when cross-filtering and index is Not "Most Requested"
    if (crossFilter !== "") {
      return setCrossedItems(data, dataStructure, crossFilter, indexBy);
    } else {
      //when single filtering with index that is not "Most Requested"
      return setItem(data, dataStructure, indexBy);
    }
  }
};

//Gives an array of objects with a set of the Key: Value pairs
const getIndex = data => {
  // Shrinks objects to one single key:value pair specified by the indexBy
  const cleanedArr = data.map(
    item => (item = { [`request_value`]: item[`request_value`] })
  );

  // Reduces down to a set of the possible key:value pairs
  // [{gender: male}, {gender: female}, {gender: null}]
  return [...new Set(cleanedArr.map(JSON.stringify))].map(JSON.parse);
};

const setCrossedItems = (data, dataStructure, crossFilter, indexBy) => {
  //will be used to store all possible values for the index value, which is referring to a column in the database table
  let indexByValues = []; 
  //will be used to store all possible values for the cross filter value, which is referring to a column in the database table
  let crossFilterValues = []; 
  //will be used to store array of objects, where the key will be what is being cross filtered by / "crossFilter" 
  // and the value is every possible value for that cross filter in the database
  let crossFilterKeys = []; 

  console.log('data at beginning', dataStructure)
  // IF NOT A "MOST REQUESTED" GRAPH, SETS THE KEYS IN A PREDETERMINED ORDER BASED ON WHAT ORDER LANCE WANTS THEM IN
  // OTHERWISE IT IS GOING TO BE SORTED MOST TO LEAST REQUESTED AT A LATER TIME
  if (graphLabels[`${crossFilter}`]){
    crossFilterKeys = graphLabels[`${crossFilter}`].structure;
  } else {
    crossFilterKeys = getIndex(data, indexBy);
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
  indexByValues.forEach((key, index) => {
    const crossFilteredData = [];

    if (indexBy === 'request_type') {
      crossFilterValues.forEach((item, index) => {
        const filtered = data.filter(trader => trader[`${crossFilter}`] === item);
        const crossFiltered = filtered.filter(trader => 
          trader["request_value"] === key
        );
          crossFilteredData.push({ [`${item}`]: crossFiltered.length });
        });
        
    } else {
      const filtered = data.filter(trader => trader[`${indexBy}`] === key);
      crossFilterValues.forEach((key, index) => {
        const crossFiltered = filtered.filter(trader => 
          trader[`${crossFilter}`] === key
        );
          crossFilteredData.push({ [`${key}`]: crossFiltered.length });
        });
    }
    crossFilteredData.forEach(obj => {
      console.log({[`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0]})
      return (dataStructure[index] = {
        ...dataStructure[index],
        [`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0]
      });
    });
  });

  //If graph is "Most Requested" sort from Most to Least requested and provide top 7 objects
  if (indexBy === 'request_type'){
    let keyValueArr = [];
    dataStructure.map(obj => {
      keyValueArr.push([obj['request_value'], Object.values(obj).slice(1).reduce((a,b) => a +b)])
    })

    keyValueArr = keyValueArr.sort((a,b) => b[1] - a[1]).splice(0, 7)

    console.log('key value arr', keyValueArr)
    console.log('data structure after map', dataStructure)
    let newDataStructure = []
    keyValueArr.forEach(arr => {
      for(let i = 0, len=dataStructure.length; i<len; i++){
        if(arr[0] === dataStructure[i].request_value){
          newDataStructure.push(dataStructure[i])
        }
      }
    })
    console.log('new data structure', newDataStructure)
    dataStructure = newDataStructure
  }

 

  
  // GET SAMPLE SIZE
  // For each object, want to add up numbers skipping first key value pair, which is the index and will not have a number as value
  //[{gender: "Male", "10-20": 200, "20-30": 150}, {gender: "Female", "10-20": 140, "20-30": 100}]
  // add values where not indexing by
  // {"Male": 350, "Female": 240}
  let sampleArr = {} 
  dataStructure.map(item => {
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
  //This is the sampleSize of all responses {"Male": 153, "Female": 124 => totalSampleSize: 277}
  let totalSampleSize = Object.values(sampleArr).reduce((a,b) => a + b)

  //CHANGE VALUES TO PERCENTAGE OF SAMPLE SIZE
  //[{gender: "Male", "10-20": 200, "20-30": 150},{gender: "Female", "10-20": 140, "20-30": 100}]
  dataStructure.forEach(obj => {
  for(var property in obj){
    if(Number.isInteger(+obj[property])){
      obj[property] = ((obj[property] / sampleArr[obj[`${indexBy === 'request_type' ? 'request_value' : indexBy}`]]) * 100).toFixed(1)
    }
  }
  });

  // ABBREVIATE LABELS IF THERE ARE ANY TO ABBREVIATE (SEE BELOW)
  abbreviateLabels(dataStructure)
  
  return { dataStructure, crossFilterValues, indexBy, totalSampleSize};
};

// Sets single filter index
// Puts each value from key:value pair into an array
// ['Female', 'Male', null]
const setItem = (data, dataStructure, indexBy) => {
  console.log("data entering into setItem function", data);
  let arr = [];

  dataStructure.forEach(obj => arr.push(Object.values(obj)[0]));

  // For each object get every trader at the index where it equals the value in the arr
  arr.forEach((key, index) => {
    const filtered = data.filter(trader => trader[`${indexBy}`] === key).length;

    dataStructure[index] = {
      ...dataStructure[index],
      [`${arr[index]}`]: filtered
    };
  });

  // This block of code transforms from raw numbers to rounded percentages
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

  console.log('before return', dataStructure)

  return {
    dataStructure,
    keys: graphLabels[`${indexBy}`].labels,
    indexBy,
    sampleSize
  };
};

//Builds data for Nivo when single filtering by "Most Requested"
const getMostRequested = (data, dataStructure, indexBy, argForQuery) => {
  let arr = [];
  console.log("MOST REQUEST BEGIN", dataStructure)
  // Puts each value from key:value pair into an array
  // ['Maize', 'Clothes', 'Bananas']
  dataStructure.forEach(obj => arr.push(Object.values(obj)[0]));

  // For each object get every trader at the index where it equals the value in the arr
  arr.forEach((key, index) => {
    const filtered = data.filter(value => value[`request_value`] === key)
      .length;

    dataStructure[index] = {
      ...dataStructure[index],
      [`${arr[index]}`]: filtered
    };
  });

  // This block of code transforms from raw numbers to percentages
  let sampleSize = 0;

  dataStructure.map(item => {
    let keyValue = item[`request_value`];
    sampleSize += Number(item[keyValue]);
  });

  console.log("BEFORE LOOP TO DO STUFF", dataStructure)

  dataStructure.forEach(obj => {
    const keyValue = obj[`request_value`];
    obj[keyValue] = Math.round((obj[keyValue] / sampleSize) * 100);
  });

  dataStructure = dataStructure
    .sort((a, b) => (Object.values(a)[1] > Object.values(b)[1] ? -1 : 1))

  const keys = dataStructure.map(obj => obj.request_value);

  console.log('data structure before splice', dataStructure)

  dataStructure = dataStructure.slice(0, 7);

  console.log('data structure after', dataStructure)
  
  //Function abbreviates graph labels
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

//This function is invoked when filtering by certain categories where the keys may be too long for Nivo to display
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
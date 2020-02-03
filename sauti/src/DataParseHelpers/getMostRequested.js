import abbreviateLabels from './abbreviateLabels'

//Builds data for Nivo when single filtering by "Most Requested"
const getMostRequested = (data, dataStructure, indexBy) => {

    let arr = [];
  
    // Puts each value from key:value pair into an array
    // ['Maize', 'Clothes', 'Bananas']
    dataStructure.forEach(obj => arr.push(Object.values(obj)[0]));
  
    // For each object get every trader at the index where it equals the value in the arr
    arr.forEach((key, index) => {
      const filtered = data.filter(value => value[`${indexBy}`] === key)
        .length;
  
      dataStructure[index] = {
        ...dataStructure[index],
        [`${arr[index]}`]: filtered
      };
    });
  
    dataStructure = dataStructure.filter(obj =>
      obj[`${indexBy}`] !== null
    );
  
    // This block of code transforms from raw numbers to percentages
    let sampleSize = 0;
  
    dataStructure.map(item => {
      let keyValue = item[`${indexBy}`];
      return sampleSize += Number(item[keyValue]);
    });
  
    // MUST RETURN CSVKEYS AS DIFFERENT THAN KEYS, OR BUG WILL OCCUR, CSV KEYS ARE FOR DOWNLOADABLE DATA
    const csvKeys = dataStructure.map(obj => obj[`${indexBy}`]);
    let percentageData = dataStructure.map(obj => Object.assign({}, obj));
  
    percentageData.forEach(obj => {
      const keyValue = obj[`${indexBy}`];
      obj[keyValue] = ((obj[keyValue] / sampleSize) * 100)
    });
  
    // dataStructure used for csv, percentage for graph
    // sort data from 
    percentageData = percentageData.sort((a, b) => Object.values(a)[1] > Object.values(b)[1] ? -1 : 1);
    dataStructure = dataStructure.sort((a, b) => Object.values(a)[1] > Object.values(b)[1] ? -1 : 1);
  
  
    let combinedNondisplayedEntries = percentageData.slice(6, percentageData.length - 1);
    let count = 0;
  
    combinedNondisplayedEntries.forEach(obj => {
      let tempVar = obj[`${indexBy}`]
      count += +obj[tempVar]
    })
  
    percentageData = percentageData.slice(0, 6)
    
    percentageData.forEach(obj => {
      let tempVar = obj[`${indexBy}`]
      obj[tempVar] = obj[tempVar].toFixed(0)
    });
    
    percentageData.push({ [indexBy]: "Other", "Other": count.toFixed(0) })
  
    const keys = percentageData.map(obj => obj[`${indexBy}`]);
  
    //Function abbreviates graph labels
    if (
      indexBy === "procedurerelevantagency" ||
      indexBy === "procedurerequireddocument" ||
      indexBy === "procedurecommodity" ||
      indexBy === "procedureorigin"
    ) {
      abbreviateLabels(percentageData, indexBy);
    }
  
    return { dataStructure, keys: keys.reverse(), csvKeys, indexBy, sampleSize, percentageData };
};

export default getMostRequested
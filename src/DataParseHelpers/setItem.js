import graphLabels from "../Components/graphLabels";
// Sets single filter index
// Puts each value from key:value pair into an array
// ['Female', 'Male', null]
const setItem = (data, dataStructure, indexBy) => {
  let arr = [];
  dataStructure.forEach(obj => arr.push(Object.values(obj)[0]));
  //error when hit back button from login
  //console.log("data", data);
  // For each object get every trader at the index where it equals the value in the arr
  // Build dataStructure for displaying on graph, it's simpler than CrossFiltering, so it's shorter
  arr.forEach((key, index) => {
    const filtered = data.filter(trader => trader[`${indexBy}`] === key).length;
    dataStructure[index] = {
      ...dataStructure[index],
      [`${arr[index]}`]: filtered
    };
  });

  // GETTING SAMPLE SIZE, PERCENTAGES, ETC.
  // This block of code transforms from raw numbers to rounded percentages
  let numberValues = [];
  let sampleSize = 0;

  dataStructure.map(item => {
    const keyValue = item[`${indexBy}`];
    numberValues.push(Number(item[keyValue]));
    return (sampleSize += Number(item[keyValue]));
  });

  let percentageData = dataStructure.map(obj => Object.assign({}, obj));

  percentageData.forEach(obj => {
    const keyValue = obj[`${indexBy}`];
    obj[keyValue] = ((obj[keyValue] / sampleSize) * 100).toFixed(1);
  });

  return {
    dataStructure,
    percentageData,
    keys: graphLabels[`${indexBy}`].labels,
    indexBy,
    sampleSize
  };
};

export default setItem;

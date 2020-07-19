//Gives an array of objects with a set of the Key: Value pairs
const getIndex = (data, indexBy) => {
  console.log("data", data, "indexBy", indexBy);
  // Shrinks objects to one single key:value pair specified by the indexBy
  const cleanedArr = data.map(
    item => (item = { [`${indexBy}`]: item[`${indexBy}`] })
  );

  // Reduces down to a set of the possible key:value pairs
  // [{gender: male}, {gender: female}, {gender: null}]
  return [...new Set(cleanedArr.map(JSON.stringify))].map(JSON.parse);
};

export default getIndex;

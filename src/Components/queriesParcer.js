function seperateMultiples(data, queryType) {
  console.log(data);
  console.log(queryType);
  let newData = data[queryType];
  let keys = Object.keys(newData[0]);
  console.log(keys);
  let tempData = newData.map(item => item);
  console.log(tempData);
  keys.forEach(key => {
    tempData.map(obj => {
      if (obj[key] && obj[key].includes(",")) {
        console.log(obj[key]);
        console.log(obj);
        let split = obj[key].split(",");
        obj[key] = split[0];
        split.splice(1).forEach(value => {
          // console.log({[key]:value})
          newData.push({ [key]: value });
        });
      }
    });
  });
  console.log(tempData);
}
export { seperateMultiples };

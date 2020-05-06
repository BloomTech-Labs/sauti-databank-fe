function removeMultiple(data) {
  console.log(data);
  let keys = Object.keys(data[0]);
  // [gender, procedurecommodity]
  let tempData = data.map(item => item);
  keys.forEach(key => {
    tempData.map(obj => {
      if (obj[key] && obj[key].includes(",")) {
        console.log(obj[key]);
        let split = obj[key].split(",");
        obj[key] = split[0];
        split.splice(1).forEach(value => {
          console.log({ [key]: value });
          data.push({ [key]: value });
        });
      }
    });
  });
  return tempData;
}

export default removeMultiple;

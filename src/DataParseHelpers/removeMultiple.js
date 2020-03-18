function removeMultiple(data) {
  let keys = Object.keys(data[0]);
  // [gender, procedurecommodity]
  let tempData = data.map(item => item);
  keys.forEach(key => {
    tempData.map(obj => {
      if (obj[key] && obj[key].includes(",")) {
        let split = obj[key].split(",");
        obj[key] = split[0];
        split.splice(1).forEach(value => {
          data.push({ [key]: value });
        });
      }
    });
  });
  // console.log('removeMultiple Ran Bro', data)
  return tempData;
}

export default removeMultiple;

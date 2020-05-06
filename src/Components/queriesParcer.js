function seperateMultiples(data, queryType) {
  console.log(queryType);
  let allData = data[queryType];
  let finalData = data[queryType];
  // console.log(data);
  // console.log(allData);
  let keys = Object.keys(allData[0]);
  // console.log(Object.keys(allData));
  keys.forEach(key => {
    allData.map(obj => {
      //let datePair = {'created_date':obj['created_date']}
      //console.log(datePair)
      if (obj[key] && obj[key].includes(",")) {
        //console.log(obj[key]);
        //puts into an array
        let split = obj[key].split(",");
        // console.log(split);
        //remove first, because already included.
        split.shift();
        //keep unique items
        let unique = [...new Set(split)];
        // console.log(unique);
        // obj[key] = split[0];
        unique.forEach(value => {
          finalData.push({ created_date: obj["created_date"], [key]: value });
        });
      }
    });
  });
  // console.log(finalData);
}

export { seperateMultiples };

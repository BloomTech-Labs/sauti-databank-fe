function seperateMultiples(data) {
  let allData = data["sessionsData"];
  let finalData = data["sessionsData"];
  console.log(allData);
  let keys = Object.keys(allData[0]);
  console.log(keys);
  keys.forEach(key => {
    allData.map(obj => {
      //let datePair = {'created_date':obj['created_date']}
      //console.log(datePair)
      if (obj[key] && obj[key].includes(",")) {
        //console.log(obj[key]);
        //puts into an array
        let split = obj[key].split(",");
        // console.log(split);
        //remove first
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
  console.log(finalData);
}
export { seperateMultiples };

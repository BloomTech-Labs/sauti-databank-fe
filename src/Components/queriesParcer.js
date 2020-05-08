function separateMultiples(data, queryType) {
  console.log(queryType);
  console.log(data);
  //take data out of object
  let allData = Object.values(data)[0];
  let finalData = data[queryType];

  //get keys from the 0 item in the array
  let keys = Object.keys(allData[0]);
  let newData = [];
  keys.forEach(key => {
    allData.map(obj => {
      //let datePair = {'created_date':obj['created_date']}

      if (obj[key] && obj[key].includes(",")) {
        //puts into an array
        let split = obj[key].split(",");

        //remove first, because already included.
        split.shift();
        //keep unique items
        let unique = [...new Set(split)];

        // obj[key] = split[0];
        unique.forEach(value => {
          finalData.push({ created_date: obj["created_date"], [key]: value });
        });
      }
    });
  });
}

export { separateMultiples };

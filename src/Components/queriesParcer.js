//when new ones are add, mo, qtr, year are not on them
function separateMultiples(data, queryType) {
  console.log(queryType);
  console.log(data);
  const propName = Object.keys(data)[0];
  //let finalData = data[queryType];
  //take data out of object
  let allData = Object.values(data)[0];
  //let finalData = data[queryType];
  console.log(`allData`, allData);
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
          newData.push({
            created_date: obj["created_date"],
            created_mo: obj["created_mo"],
            created_qtr: obj["created_qtr"],
            created_year: obj["created_year"],
            [key]: value
          });
        });
      } else {
        newData.push(obj);
      }
    });
  });
  // console.log(`newData`, newData)
  // console.log(`propName`, propName)
  let objectNew = {};
  objectNew[propName] = newData;
  console.log(objectNew);
  return objectNew;
  //return newData
}

export { separateMultiples };

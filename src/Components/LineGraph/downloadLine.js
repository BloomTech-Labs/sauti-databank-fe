function downloadLine(time, filter0) {
  const rows = Object.keys(filter0.selectableOptions);
  rows.unshift("date");
  let completeObj = { date: [] };
  for (let i = 0; i < rows.length; i++) {
    completeObj[rows[i]] = [rows[i]];
  }

  for (let i = 0; i < time.length; i++) {
    let obj = time[i];
    let objKeys = Object.keys(obj);

    //check to see if there is a value for each row
    // if not assign it zero
    for (let i = 0; i < rows.length; i++) {
      if (!objKeys.includes(rows[i])) {
        obj[rows[i]] = "0";
      }
    }

    for (let j in obj) {
      if (rows.includes(j)) {
        completeObj[j].push(obj[j]);
      }
    }
  }

  let completeArray = [];
  for (let item in completeObj) {
    completeArray.push(completeObj[item]);
  }
  return completeArray;
}
export { downloadLine };

let allEntriesMo = [];
let allEntriesQtr = [];
let allEntriesYr = [];
let max;
function highestValue(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let values = Object.values(item);
    let entries = Object.entries(item);
    //put into month / qtr / year
    if (entries[0][1].includes("Q")) {
      allEntriesQtr.push(entries);
    } else if (entries[0][1].length === 7) {
      allEntriesMo.push(entries);
    } else if (entries[0][1].length === 4) {
      allEntriesYr.push(entries);
    }
    for (let i = 0; i < values.length; i++) {
      if (typeof values[i] !== "string") {
        newArray.push(values[i]);
      }
    }
  }
  console.log(newArray);
  max = Math.max(...newArray);
  return max;
}

function hundredScale(array, high) {
  console.log(`updated`, array);
  let highNumerical = [];
  for (let i = 0; i < array.length; i++) {
    //   console.log(array[i])
    //   newValues.push(array[i]);
    let item = array[i];
    for (let key in item) {
      if (key !== "date") {
        let keyValue = {};
        keyValue[key] = item[key];
        console.log(keyValue);
        highNumerical.push(keyValue);
        item[key] = (item[key] / high) * 100;
        //round to 2 decimal
        item[key] = item[key].toFixed(2);
      }
    }
  }
  return { array, highNumerical, high };
}

function checkedHigh(checkedItems) {
  console.log(allEntriesYr);
  console.log(allEntriesQtr);
  console.log(allEntriesMo);
  console.log(checkedItems);
  let selectedArray = [];
  let theHigh = [];
  let keyArray = [];
  for (let key in checkedItems) {
    if (checkedItems[key] === true) keyArray.push(key);
  }
  for (let i = 0; i < allEntriesMo.length; i++) {
    let set = allEntriesMo[i];
    console.log(set[1]);
    if (keyArray.includes(set[1][0])) {
      selectedArray.push(set[1]);
    }
  }
  for (let i = 0; i < selectedArray.length; i++) {
    let item = selectedArray[i][1];
    theHigh.push(item);
  }
  let newMax = Math.max(...theHigh);
  return newMax;
  //return hundredScale(newValues, newMax)
}
export { highestValue, hundredScale, checkedHigh };

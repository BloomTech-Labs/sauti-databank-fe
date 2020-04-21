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
  max = Math.max(...newArray);
  return max;
}

function addArray(item) {
  let numArray = [];
  let period;
  for (let key in item) {
    //console.log(item);

    if (key !== "date") {
      numArray.push(item[key]);
    } else {
      item["period"] = 0;
    }
  }
  //console.log(numArray);
  let total = numArray.reduce(function(a, b) {
    return a + b;
  }, 0);
  //console.log(period);

  item["period"] = total;
  console.log(item);
}

function hundredScale(array, high) {
  let highNumerical = [];
  //let numArray = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    //console.log(array[i])
    addArray(item);
  }

  //   for (let key in item) {
  //     if (key !== "date") {
  //       let keyValue = {};
  //       keyValue[key] = item[key];
  //       highNumerical.push(keyValue);
  //       item[key] = (item[key] / high) * 100;
  //       //round to 2 decimal
  //       item[key] = item[key].toFixed(2);
  //     }
  //   }
  //}
  return { array, highNumerical, high };
}

function checkedHigh(time, currentHighs, previousHigh, checkedItems, selected) {
  console.log(`time`, time);
  console.log(`currentHighs`, currentHighs);
  console.log(`previousHigh`, previousHigh);
  console.log(`checkItems`, checkedItems);
  console.log(`selected`, selected);
  for (let key in checkedItems) {
    if (key === selected) {
      let current = checkedItems[key];
      console.log(`current`, current);
      checkedItems[key] = !current;
    }
    console.log(checkedItems);
  }
  let keyArray = [];
  for (let key in checkedItems) {
    if (checkedItems[key] === true) keyArray.push(key);
  }
  console.log(keyArray);

  let selectedValues = [];
  for (let i = 0; i < currentHighs.length; i++) {
    let key = Object.keys(currentHighs[i]);
    //console.log(key)
    if (keyArray.includes(key[0])) {
      //console.log('it includes key')
      //console.log(currentHighs[i])
      let item = Object.values(currentHighs[i]);
      selectedValues.push(item[0]);
    }
  }
  //console.log(selectedValues)
  let max = Math.max(...selectedValues);
  console.log(time);
  for (let i = 0; i < time.length; i++) {
    let item = time[i];
    for (let key in item) {
      if (key !== "date") {
        let updateValue = item[key];
        //console.log(updateValue);
        let ogNum = Math.round((updateValue / 100) * previousHigh);
        //console.log(ogNum);
        let newPercent = Math.round((ogNum / max) * 100);
        //console.log(newPercent);
        item[key] = newPercent;
      }
    }
  }
  console.log(time);
  return time;
  //   for (let i = 0; i < selectedArray.length; i++) {
  //     let item = selectedArray[i][1];
  //     theHigh.push(item);
  //   }
  //   let newMax = Math.max(...theHigh);
  //   return newMax;
  //return hundredScale(newValues, newMax)
}
export { highestValue, hundredScale, checkedHigh };

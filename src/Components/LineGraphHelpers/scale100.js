// function highestValue(array) {
//   let newArray = [];
//   for (let i = 0; i < array.length; i++) {
//     let item = array[i];
//     let values = Object.values(item);
//     let entries = Object.entries(item);
//     //put into month / qtr / year
//     if (entries[0][1].includes("Q")) {
//       allEntriesQtr.push(entries);
//     } else if (entries[0][1].length === 7) {
//       allEntriesMo.push(entries);
//     } else if (entries[0][1].length === 4) {
//       allEntriesYr.push(entries);
//     }
//     for (let i = 0; i < values.length; i++) {
//       if (typeof values[i] !== "string") {
//         newArray.push(values[i]);
//       }
//     }
//   }
//   max = Math.max(...newArray);
//   return max;
// }

function addArray(item) {
  let numArray = [];
  //let period;
  for (let key in item) {
    if (key !== "date") {
      numArray.push(item[key]);
    } else {
      item["period"] = 0;
    }
  }

  let total = numArray.reduce(function(a, b) {
    return a + b;
  }, 0);

  for (let key in item) {
    if (key !== "date") {
      let newNum = (item[key] / total) * 100;
      newNum = newNum.toFixed(2);
      item[key] = newNum;
      // item[key] = (item[key] / total) * 100;
    }
  }
  item["period"] = total;
}

function hundredScale(array) {
  let highNumerical = [];

  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    addArray(item);
  }

  return { array, highNumerical };
}

export { hundredScale };

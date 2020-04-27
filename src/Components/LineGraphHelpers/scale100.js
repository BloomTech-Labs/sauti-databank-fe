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

export function highestValue(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    let values = Object.values(item);

    for (let i = 0; i < values.length; i++) {
      if (typeof values[i] !== "string") {
        newArray.push(values[i]);
      }
    }
  }
  console.log(newArray);
  return Math.max(...newArray);
}

export function hundredScale(array, high) {
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    for (let key in item) {
      if (key !== "date") {
        item[key] = (item[key] / high) * 100;
        item[key] = item[key].toFixed(2);
      }
    }
  }
  return array;
}

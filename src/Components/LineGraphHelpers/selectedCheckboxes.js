function getHighestSelected(time, display) {
  //console.log(`first 1`, display);
  let highestArray = [];
  for (let i = 0; i < time.length; i++) {
    let item = time[i];
    for (let key in item) {
      // console.log(`dsiplay 2`, display)
      if (display.includes(key)) {
        //  console.log(key)
        let value = item[key];
        value = parseFloat(value);
        highestArray.push(value);
      }
    }
  }
  //console.log(highestArray);
  let maxValue = Math.max(...highestArray);
  //console.log(maxValue);
  return maxValue;
}
export { getHighestSelected };

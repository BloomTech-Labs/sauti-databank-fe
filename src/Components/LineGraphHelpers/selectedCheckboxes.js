function getHighestSelected(time, display) {
  let highestArray = [];
  for (let i = 0; i < time.length; i++) {
    let item = time[i];
    for (let key in item) {
      if (display.includes(key)) {
        let value = item[key];
        value = parseFloat(value);
        highestArray.push(value);
      }
    }
  }

  let maxValue = Math.max(...highestArray);
  return maxValue;
}
export { getHighestSelected };

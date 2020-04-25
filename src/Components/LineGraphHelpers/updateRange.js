function updateRange(time, value) {
  let rangeTime = [];
  let newArray = Object.values(time);
  for (let i = 0; i < newArray.length; i++) {
    if (i >= value[0] && i <= value[1] + 1) {
      rangeTime.push(newArray[i]);
    }
  }
  return rangeTime;
}

export { updateRange };

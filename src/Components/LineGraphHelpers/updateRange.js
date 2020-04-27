//takes all available values from time period
//selects values inbetween that range
function updateRange(timeInUse, value) {
  let rangeTime = [];
  let newArray = Object.values(timeInUse);
  for (let i = 0; i < newArray.length; i++) {
    if (i >= value[0] && i <= value[1] + 1) {
      rangeTime.push(newArray[i]);
    }
  }
  return rangeTime;
}

function timeInUsePeriodsArray(timeInUse) {
  let allDates = [];
  for (let key in timeInUse) {
    allDates.push(timeInUse[key].date);
  }
  return allDates;
}

export { updateRange, timeInUsePeriodsArray };

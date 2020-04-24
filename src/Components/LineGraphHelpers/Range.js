//get the total periods in time and an array of all periods
function getTotalPeriods(time, allPeriodsArray) {
  let periodsAmount = time.length;
  for (let i = 0; i < time.length; i++) {
    let item = time[i];
    for (let key in item) {
      if (key === "date") {
        allPeriodsArray.push(item[key]);
      }
    }
  }
  return { allPeriodsArray, periodsAmount };
}
export { getTotalPeriods };

//get the total periods in time and an array of all periods
//adjusts the numbers displayed above the slider
function getRangePeriods(time, allPeriodsArray) {
  console.log(`time`, time);
  console.log(allPeriodsArray);
  let periodsAmount = time.length;
  for (let i = 0; i < time.length; i++) {
    let item = time[i];
    for (let key in item) {
      if (key === "date") {
        allPeriodsArray.push(item[key]);
      }
    }
  }
  console.log(`allPeriodsArray`, allPeriodsArray);
  console.log(`periodsAmount`, periodsAmount);
  return { allPeriodsArray, periodsAmount };
}

export { getRangePeriods };

//function get

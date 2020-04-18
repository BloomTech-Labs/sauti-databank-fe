//addup amounts for top 7
//  top 7 of selected filter
let sumAll = {};
function topChecked(lineNonNull, selectedTableColumnName, keysInOrder) {
  const totalAmounts = (objectArray, property) => {
    return objectArray.reduce(function(total, obj) {
      //cat type to make a new key
      let key = obj[property];
      //make a new object if the year-mo and category not existing
      if (!total[key]) {
        total[key] = [];
      }
      //if cat then push obj
      total[key].push(obj);
      return total;
    }, {});
  };

  sumAll = totalAmounts(lineNonNull, selectedTableColumnName);
  console.log(sumAll);
  //return key and length
  const totalArray = [];
  for (let key in sumAll) {
    //minimum required sessions 10
    let value = sumAll[key].length;
    if (value > 10) {
      let obj = {};
      obj[value] = key;
      totalArray.push(obj);
    }
  }
  console.log(totalArray);

  //sort array by amounts
  const sortedArray = totalArray.sort();
  console.log(sortedArray);
  //put categories in an array by top 7
  //const keysInOrder = [];
  for (let i = 0; i < sortedArray.length; i++) {
    if (i < 7) {
      let cat = Object.values(sortedArray[i]);
      console.log(cat);
      keysInOrder.push(cat[0]);
    }
  }
  return keysInOrder;
}
export { topChecked, sumAll };

//addup amounts for top 7
//  top 7 of selected filter
export function topChecked(lineNonNull, selectedTableColumnName, keysInOrder) {
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

  let sumAll = totalAmounts(lineNonNull, selectedTableColumnName);
  console.log(sumAll);
  //return key and length
  const totalArray = [];
  for (let key in sumAll) {
    let value = sumAll[key].length;
    let obj = {};
    obj[value] = key;
    totalArray.push(obj);
  }

  //sort array by amounts
  const sortedArray = totalArray.sort();

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

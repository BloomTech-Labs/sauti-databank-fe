function countryRank(dataTwo, property) {
  const countries = [];
  const arrayData = dataTwo.features;
  // console.log(property)
  for (let i = 0; i < arrayData.length; i++) {
    let item = arrayData[i]["properties"];
    let name = item["name"];
    let obj = {};
    obj[name] = item[property];
    if (Object.values(obj)[0] > 0) {
      countries.push(obj);
    }
  }
  console.log(countries);
  console.log(countries.sort(inOrder));
  return countries;
}
export { countryRank };

//puts object of counties and values in order
function inOrder(a, b) {
  let aNum = Object.values(a)[0];
  let bNum = Object.values(b)[0];

  return bNum - aNum;
}

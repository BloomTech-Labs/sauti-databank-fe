function countryRank(dataTwo, property) {
  let countries = [];
  const arrayData = dataTwo.features;
  for (let i = 0; i < arrayData.length; i++) {
    let item = arrayData[i]["properties"];
    let name = item["name"];
    let obj = {};
    obj[name] = item[property];
    if (Object.values(obj)[0] > 0) {
      countries.push(obj);
    }
  }
  countries = countries.sort(inOrder);
  //const countriesArray = Object.entries(countries)
  let final = arrayValues(countries);
  console.log(`final`, final);
  return countries;
}

//puts object of counties and values in order
function inOrder(a, b) {
  let aNum = Object.values(a)[0];
  let bNum = Object.values(b)[0];

  return bNum - aNum;
}

function arrayValues(results) {
  const newResults = results.map(e => Object.entries(e)[0]);
  return newResults;
}

function getValues(results, num) {
  let ct = Object.entries(results[num]);
  ct = ct[0];
  return ct;
}

export { countryRank, getValues, arrayValues };

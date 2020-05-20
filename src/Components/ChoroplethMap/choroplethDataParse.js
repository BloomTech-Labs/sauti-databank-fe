const choroplethDataParse = data => {
  return data.reduce(function(total, obj) {
    let key = obj["country_of_residence"];
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(obj);
    return total;
  }, {});
};
export { choroplethDataParse };

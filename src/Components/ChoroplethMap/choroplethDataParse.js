const choroplethDataParse = (data, category) => {
  return data.reduce(function(total, obj) {
    let key = obj[category];
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(obj);
    return total;
  }, {});
};
export { choroplethDataParse };

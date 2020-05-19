function choroplethDataParse(gqlData) {
  console.log(typeof gqlData);
  console.log(gqlData);
  return gqlData.reduce(function(total, obj) {
    let key = obj["Country of Residence"];
    console.log(key);
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(obj);
    return total;
    console.log(total);
  });
}
export { choroplethDataParse };

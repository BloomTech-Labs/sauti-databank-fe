function filterByDate(data, startDate, endDate) {
  // console.log(`filterByDate incoming data`, data, startDate, endDate);
  // console.log("keys", Object.keys(data)[0])
  // console.log("values", Object.values(data)[0])
  // console.log("entries", Object.entries(data)[0])
  let propName = Object.entries(data)[0];
  console.log("should be sessions data", data[`${propName}`]);
  console.log("propName", propName);
  data = Object.values(data)[0];
  // console.log("should be seesions table", Object.values(data)[0])
  startDate = startDate.replace(/-/g, "");
  endDate = endDate.replace(/-/g, "");
  // console.log(`filterByDate data`, data, startDate, endDate);
  const filteredData = data.filter(obj => {
    //  console.log(obj);
    let objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
    //  console.log(`objectDate`, objectDate);
    return objectDate > startDate && objectDate < endDate;
  });
  // console.log(`filteredData`, filteredData);

  return {
    propName: filteredData
  };
}
export { filterByDate };

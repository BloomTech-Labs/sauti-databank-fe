function filterByDate(data, startDate, endDate) {
  console.log(Object.values(data)[0]);
  data = Object.values(data)[0];
  console.log("data afater set to values", data);
  startDate = startDate.replace(/-/g, "");
  endDate = endDate.replace(/-/g, "");
  console.log("data in filterByDate", data);

  console.log(`filterByDate incoming data`, data, startDate, endDate);

  const originalObject = data => {
    let fixData = data.map(obj => {
      delete obj["created_qtr"];
      delete obj["created_year"];
      // console.log("keyword objects in fixData", obj)
      return obj;
    });
    console.log("keyword fixData", fixData);
    return fixData;
  };

  if (data && data[0].created_qtr) {
    console.log("keyword if created_qtr fired");
    data = originalObject(data);
  }

  const filteredData = data.filter(obj => {
    //  console.log("keyword object enters filter", obj);
    let objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
    // console.log("keyword startDate", startDate, "keyword endDate", endDate)
    //  console.log(`keyword objectDate`, objectDate);
    if (objectDate > startDate && objectDate < endDate) {
      // console.log("keyword object in filter loop",obj)
      return obj;
    }
  });

  console.log(`filteredData`, filteredData);

  return {
    sessionsData: filteredData
  };
}
export { filterByDate };

//what it needs to look like
// keyword startDate 20170101 keyword endDate 20200507
// filterByDate.js:31 keyword objectDate 20170620

//what it actually looks like
// keyword startDate 20170101 keyword endDate 20200507
// filterByDate.js:31 keyword objectDate 201706

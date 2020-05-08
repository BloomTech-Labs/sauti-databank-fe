function filterByDate(data, startDate, endDate) {
  data = Object.values(data)[0];
  startDate = startDate.replace(/-/g, "");
  endDate = endDate.replace(/-/g, "");
  const filteredData = data.filter(obj => {
    let objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
    if (objectDate > startDate && objectDate < endDate) {
      return obj;
    }
  });

  return {
    sessionsData: filteredData
  };
}
export { filterByDate };

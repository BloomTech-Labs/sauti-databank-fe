import graphLabels from "./graphLabels";
import getIndex from '../DataParseHelpers/getIndex'
import removeMultiple from '../DataParseHelpers/removeMultiple'
import getMostRequested from '../DataParseHelpers/getMostRequested'
import setCrossedItems from '../DataParseHelpers/setCrossedItems'
import setItem from '../DataParseHelpers/setItem'


const dataParse = (
  indexBy,
  data,
  crossFilter,
  startDate,
  endDate,
  additionalFilter,
  queryType
) => {
  // This is bad practice, but function wrapped in try catch incase unknown error occurs, to reload page
  try{
  let dataStructure = [];
  //when single filtering "Most Requested" graph
  if (queryType === "Sessions" && crossFilter === "") {
    data = filterByDate(data, startDate, endDate);
    data = removeMultiple(data)
    dataStructure = getIndex(data, indexBy);
    return getMostRequested(data, dataStructure, indexBy);
  }
  //when cross-filtering "Most Requested" as index
  else if (queryType === "Sessions" && crossFilter !== "") {
    data = filterByDate(data, startDate, endDate);
    data = removeMultiple(data)
    dataStructure = getIndex(data, indexBy);
    return setCrossedItems(data, dataStructure, crossFilter, indexBy, additionalFilter);
  } else {
    //telling function how to format data. See "graphLabels.js"
    dataStructure = graphLabels[`${indexBy}`].structure.map(item => item);
    //when cross-filtering and index is Not "Most Requested"
    if (crossFilter !== "") {
      data = removeMultiple(data)
      return setCrossedItems(data, dataStructure, crossFilter, indexBy, additionalFilter);
    } else {
      //when single filtering with index that is not "Most Requested"
      data = removeMultiple(data)
      return setItem(data, dataStructure, indexBy);
    }
  }
} catch (error) {
  alert("There was an error getting the data. This can happen if you select too many filters and there is no data for that subset. The page will automatically refresh.")
  window.location.reload()
}
};

const filterByDate = (data, startDate, endDate) => {
  startDate = startDate.replace(/-/g, "");
  endDate = endDate.replace(/-/g, "");


  const filteredData = data.filter(obj => {
    const objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
    return objectDate > startDate && objectDate < endDate;
  });

  return filteredData;
};

export default dataParse;

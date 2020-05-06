import graphLabels from "./graphLabels";
import getIndex from "../DataParseHelpers/getIndex";
import removeMultiple from "../DataParseHelpers/removeMultiple";
import getMostRequested from "../DataParseHelpers/getMostRequested";
import setCrossedItems from "../DataParseHelpers/setCrossedItems";
import setItem from "../DataParseHelpers/setItem";
import { filterByDate } from "../DataParseHelpers/filterByDate";

const dataParse = (
  indexBy,
  data,
  crossFilter,
  startDate,
  endDate,
  additionalFilter,
  queryType,
  crossFilterQuery
) => {
  console.log(
    "DataParse 7",
    indexBy,
    data,
    crossFilter,
    startDate,
    endDate,
    additionalFilter,
    queryType,
    crossFilterQuery
  );
  let dataStructure = [];
  //when single filtering "Most Requested" graph
  console.log(indexBy);
  //remove multiples should happen prior to filterByDate
  //multiples should also be given a date

  let newArray = [];
  if (queryType === "Sessions" && crossFilter === "") {
    data = data.filter(e => console.log(e.indexBy));

    data = filterByDate(data, startDate, endDate);
    console.log(`filterByDate`, data);
    data = removeMultiple(data);
    console.log(`removemultiple`, data);
    dataStructure = getIndex(data, indexBy);
    //console.log(`Data`, data, `dataStructure`,dataStructure, `indexBy`, indexBy)
    return getMostRequested(data, dataStructure, indexBy);
  }
  //when cross-filtering "Most Requested" as index
  else if (queryType === "Sessions" && crossFilter !== "") {
    data = filterByDate(data, startDate, endDate);

    data = removeMultiple(data);

    dataStructure = getIndex(data, indexBy);

    return setCrossedItems(
      data,
      dataStructure,
      crossFilter,
      indexBy,
      additionalFilter,
      queryType,
      crossFilterQuery
    );
  } else {
    if (queryType === "Users") {
      dataStructure = graphLabels[`${indexBy}`].structure.map(item => {
        return item;
      });
    }
    if (crossFilter !== "") {
      data = removeMultiple(data);

      return setCrossedItems(
        data,
        dataStructure,
        crossFilter,
        indexBy,
        additionalFilter,
        queryType,
        crossFilterQuery
      );
    } else {
      //when single filtering with index that is not "Most Requested"
      data = removeMultiple(data);

      // console.log(`dataparse after removeMultiple`, data);
      return setItem(data, dataStructure, indexBy);
    }
  }
};
// const filterByDate = (data, startDate, endDate) => {
//   //console.log(`filterByDate`, data, startDate, endDate)
//   startDate = startDate.replace(/-/g, "");
//   endDate = endDate.replace(/-/g, "");
//   console.log(`filterByDate data`, data, startDate, endDate)
//   const filteredData = data.filter(obj => {
//     const objectDate = +obj.created_date.split("T")[0].replace(/-/g, "");
//     //console.log(`objectDate`, objectDate)
//     return objectDate > startDate && objectDate < endDate;
//   });
//   console.log(`filteredData`, filteredData)
//   return filteredData;
// };

export default dataParse;

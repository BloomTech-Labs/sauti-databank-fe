import graphLabels from "./graphLabels";
import getIndex from "../DataParseHelpers/getIndex";
// import removeMultiple from "../DataParseHelpers/removeMultiple";
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
  //remove multiples should happen prior to filterByDate
  //multiples should also be given a date

  let newArray = [];
  if (queryType === "Sessions" && crossFilter === "") {
    //filter by date
    //data = filterByDate(data, startDate, endDate);
    // data = removeMultiple(data);

    dataStructure = getIndex(data, indexBy);

    return getMostRequested(data, dataStructure, indexBy);
  }
  //when cross-filtering "Most Requested" as index
  else if (queryType === "Sessions" && crossFilter !== "") {
    // data = filterByDate(data, startDate, endDate);

    // data = removeMultiple(data);

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
      // data = removeMultiple(data);

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
      // data = removeMultiple(data);

      return setItem(data, dataStructure, indexBy);
    }
  }
};

export default dataParse;

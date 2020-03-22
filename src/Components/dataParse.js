import graphLabels from "./graphLabels";
import getIndex from "../DataParseHelpers/getIndex";
import removeMultiple from "../DataParseHelpers/removeMultiple";
import getMostRequested from "../DataParseHelpers/getMostRequested";
import setCrossedItems from "../DataParseHelpers/setCrossedItems";
import setItem from "../DataParseHelpers/setItem";

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
  // This is bad practice, but function wrapped in try catch incase unknown error occurs, to reload page
  // console.log(`indexBy`, indexBy);
  // console.log(`dataparse`, data);
  // console.log(`crossFilter`, crossFilter);

  // console.log(`additionalFilter`, additionalFilter);
  // console.log(`queryType`, queryType);
  // console.log(`crossFilterQuery`, crossFilterQuery);
  try {
    let dataStructure = [];
    //when single filtering "Most Requested" graph
    if (queryType === "Sessions" && crossFilter === "") {
      data = filterByDate(data, startDate, endDate);
      data = removeMultiple(data);
      dataStructure = getIndex(data, indexBy);

      return getMostRequested(data, dataStructure, indexBy);
    }
    //when cross-filtering "Most Requested" as index
    else if (queryType === "Sessions" && crossFilter !== "") {
      data = filterByDate(data, startDate, endDate);

      data = removeMultiple(data);

      dataStructure = getIndex(data, indexBy);

      // console.log("before running setCrossedItems")
      // console.log("data", data)
      // console.log("dataStructure", dataStructure)
      // console.log("crossFilter", crossFilter)
      // console.log("indexBy", indexBy)
      // console.log("additionalFilter", additionalFilter)
      // console.log("queryType", queryType)
      // console.log("crossFilterQuery", crossFilterQuery)
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
      //telling function how to format data. See "graphLabels.js"
      if (queryType === "Users") {
        // console.log("FIRST QUERY = USERS - DATASTRUCTURE", dataStructure)
        // console.log("indexby", indexBy)
        dataStructure = graphLabels[`${indexBy}`].structure.map(item => {
          return item;
        });
        // console.log("FIRST QUERY = USERS - DATASTRUCTURE 222222", dataStructure)
      }

      // if (crossFilter) {
      //   console.log("CROSSSSSSSSSSSSSSSSSSSSSFILTER", dataStructure)
      //   dataStructure = graphLabels[crossFilter].structure.map(item => item);
      //   console.log("fuckkkers", dataStructure)
      // }
      // console.log(dataStructure);
      //when cross-filtering and index is Not "Most Requested"
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
  } catch (error) {
    alert(
      "There was an error getting the data. This can happen if you select too many filters and there is no data for that subset. The page will automatically refresh."
    );
    window.location.reload();
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

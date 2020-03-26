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
  } catch (error) {
    return 1;
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

import React from "react";
//import CategoryOptions from './CategoryOptions';

const RenderCheckContainer = ({
  i,
  item,
  filters,
  graphLabels,
  CategoryOptions,
  CheckboxContainer,
  setFilters,
  FilterBoxOptions
}) => {
  // do all conditional renderings using if statements for now
  // for (let item in )
  //console.log(filters[i])
  const showOptions = (i, filters, graphLabels, item) => {
    //  if (filters[i].showOptions) {
    return graphLabels[
      item
      // `${filters[i].selectedTableColumnName}`
    ].labels.map(option => (
      //not updating filter
      //does not have selected table column name
      <CategoryOptions
        i={i}
        filters={filters}
        graphLabels={graphLabels}
        option={option}
        item={item}
      />
    ));
    // } else {
    //   return graphLabels[`${filters[i].selectedTableColumnName}`].labels
    //     .filter(option => {
    //       return filters[i].selectableOptions[option];
    //     })
    //     .map(option => (
    //       <CategoryOptions
    //         i={i}
    //         filters={filters}
    //         graphLabels={graphLabels}
    //         option={option}
    //       />
    //     ));
    // }
  };
  //remove additional filtering options for 'Data Series',
  //console.log(filters)

  // if (graphLabels[`${filters[i].selectedTableColumnName}`]) {
  if (graphLabels[item]) {
    return (
      <CheckboxContainer>
        {/* <p>Please pick an option: </p>
          <button
            onClick={() => {
              setFilters({
                ...filters,
                [i]: {
                  ...filters[i],
                  showOptions: !filters[i].showOptions
                }
                // add all the options here
              });
            }}
          > */}
        {/* maybe set this one along with the selected option flag? */}
        {filters[i].showOptions ? "Hide" : "Show"}
        {/* </button> */}

        {showOptions(i, filters, graphLabels, item)}
      </CheckboxContainer>
    );
  } else {
    console.log("empty1");
    return <div></div>;
  }
};
export default RenderCheckContainer;

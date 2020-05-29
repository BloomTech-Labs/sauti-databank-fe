import React from "react";

const RenderCheckContainer = ({
  i,
  filters,
  graphLabels,
  CategoryOptions,
  CheckboxContainer,
  setFilters
}) => {
  // do all conditional renderings using if statements for now

  const showOptions = (i, filters, graphLabels) => {
    if (filters[i].showOptions) {
      return graphLabels[
        `${filters[i].selectedTableColumnName}`
      ].labels.map(option => (
        <CategoryOptions
          i={i}
          filters={filters}
          graphLabels={graphLabels}
          option={option}
        />
      ));
    } else {
      return graphLabels[`${filters[i].selectedTableColumnName}`].labels
        .filter(option => {
          return filters[i].selectableOptions[option];
        })
        .map(option => (
          <CategoryOptions
            i={i}
            filters={filters}
            graphLabels={graphLabels}
            option={option}
          />
        ));
    }
  };
  //remove additional filtering options for 'Data Series',
  if (i > 1) {
    if (graphLabels[`${filters[i].selectedTableColumnName}`]) {
      return (
        <CheckboxContainer>
          <p>Please pick an option: </p>
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
          >
            {/* maybe set this one along with the selected option flag? */}
            {filters[i].showOptions ? "Hide" : "Show"}
          </button>

          {showOptions(i, filters, graphLabels)}
        </CheckboxContainer>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};
export default RenderCheckContainer;

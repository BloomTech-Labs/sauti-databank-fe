export const getAvaliableOptions = (filters, filterId) => {
  return Object.keys(filters[filterId].selectableOptions);
};
export const getSelectedOption = (filters, filterId) => {
  // the selected options may be some of the avaliable options
  const selectedOptions = getAvaliableOptions(filters, filterId)
    .map(avaliableOption => {
      return filters[filterId].selectableOptions[avaliableOption] === true
        ? avaliableOption
        : null;
    })
    .filter(selectableOption => selectableOption !== null);
  return selectedOptions.length > 0 ? selectedOptions[0] : undefined;
};

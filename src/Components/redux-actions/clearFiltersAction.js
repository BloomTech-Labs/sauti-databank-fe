export const CLEARFILTERS = "CLEARFILTERS";

export const clearFiltersAction = values => dispatch => {
  dispatch({ type: CLEARFILTERS, payload: values });
};

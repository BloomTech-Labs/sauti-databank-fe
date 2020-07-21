export const QUERIES_SUCCESS = "QUERIES_SUCCESS";

export const queriesFilters = value => dispatch => {
  dispatch({ type: QUERIES_SUCCESS, payload: value });
};

export const QUERIES = "QUERIES";

export const getQuery = data => dispatch => {
  return dispatch({ type: QUERIES, payload: data });
};

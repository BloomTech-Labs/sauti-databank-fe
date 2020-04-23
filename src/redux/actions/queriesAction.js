export const QUERIES = "QUERIES";

export const getQuery = data => dispatch => {
  async function query(queryData) {
    try {
      return dispatch({ type: QUERIES, payload: queryData });
    } catch (err) {
      throw Error(err);
    }
  }
  query(data);
};

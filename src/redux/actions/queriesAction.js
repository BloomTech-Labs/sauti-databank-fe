export const QUERIES = "QUERIES";
export const LOADQUERY = "LOADQUERY";

export const getQuery = data => dispatch => {
  dispatch({ type: LOADQUERY });
  async function query(queryData) {
    try {
      return dispatch({ type: QUERIES, payload: queryData });
    } catch (err) {
      throw Error(err);
    }
  }
  query(data);
};

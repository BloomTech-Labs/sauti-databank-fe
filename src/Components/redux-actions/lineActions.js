export const LINEGRAPH = "LINEGRAPH";

export const lineAction = values => dispatch => {
  dispatch({ type: LINEGRAPH, payload: values });
};

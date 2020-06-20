export const COMPARE = "COMPARE";

export const compareSubSamples = values => dispatch => {
  console.log(typeof values);
  dispatch({ type: COMPARE, payload: values });
};

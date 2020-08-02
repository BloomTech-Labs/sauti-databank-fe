export const APPLY_SUCCESS = "APPLY_SUCCESS";

export const applyAction = () => dispatch => {
  console.log("apply fired action");
  dispatch({ type: APPLY_SUCCESS });
};

export const SCROLL_SUCCESS = "SCROLL_SUCCESS";

export const scrollPosition = value => dispatch => {
  dispatch({ type: SCROLL_SUCCESS, payload: value });
};

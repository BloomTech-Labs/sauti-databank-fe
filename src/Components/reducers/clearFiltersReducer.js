import * as types from "../redux-actions/clearFiltersAction";

const initialState = {
  clear: {}
};

const clearReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEARFILTERS:
      return {
        ...state,
        clear: action.payload
      };
    default:
      return state;
  }
};
export default clearReducer;

import { SCROLL_SUCCESS } from "../redux-actions/scrollAction";

const initialState = {
  scrollPos: {}
};

const scrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCROLL_SUCCESS:
      return {
        ...state,
        scrollPos: action.payload
      };
    default:
      return state;
  }
};
export default scrollReducer;

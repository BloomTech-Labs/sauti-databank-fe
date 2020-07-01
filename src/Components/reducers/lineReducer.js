import { LINEGRAPH } from "../redux-actions/lineActions";

const initialState = {
  lineBoxes: {}
};

const lineReducer = (state = initialState, action) => {
  switch (action.type) {
    case LINEGRAPH:
      return {
        ...state,
        lineBoxes: action.payload
      };
    default:
      return state;
  }
};
export default lineReducer;

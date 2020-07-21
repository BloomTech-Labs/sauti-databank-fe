import { QUERIES_SUCCESS } from "../redux-actions/queriesAction";

const initialState = {
  queriesFilters: {}
};

const queriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUERIES_SUCCESS:
      return {
        ...state,
        queriesFilters: action.payload
      };
    default:
      return state;
  }
};
export default queriesReducer;

import { QUERIES, LOADQUERY } from "../actions/queriesAction";

const initialState = {
  data: {},
  isLoading: false,
  error: ""
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADQUERY:
      return {
        ...state,
        data: {},
        isLoading: true
      };
    case QUERIES:
      console.log(action);
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
export default reducer;

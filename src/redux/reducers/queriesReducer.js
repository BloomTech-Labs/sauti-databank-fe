import { QUERIES, LOADQUERY, ERROR } from "../actions/queriesAction";

const initialState = {
  dataInfo: {},
  isLoading: false,
  error: ""
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADQUERY:
      return {
        ...state,
        dataInfo: {},
        isLoading: true,
        error: ""
      };
    case QUERIES:
      return {
        ...state,
        dataInfo: action,
        isLoading: false,
        error: ""
      };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export default reducer;

import { QUERIES, LOADQUERY, ERROR } from "../actions/queriesAction";

const initialState = {
  dataInfo: {},
  isLoading: false,
  error: ""
};
const reducer = (state = initialState, action) => {
  console.log("reducer State", state);
  switch (action.type) {
    case LOADQUERY:
      return {
        ...state,
        dataInfo: {},
        isLoading: true,
        error: ""
      };
    case QUERIES:
      console.log(action);
      return {
        ...state,
        dataInfo: action,
        isLoading: false,
        error: ""
      };
    case ERROR:
      console.log(action);
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

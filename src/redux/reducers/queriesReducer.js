import { QUERIES } from "../actions/queriesAction";

const initialState = {
  data: {}
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case QUERIES:
      console.log(action);
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
export default reducer;

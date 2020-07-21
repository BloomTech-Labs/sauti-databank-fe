import { TIER_DEFINED } from "../redux-actions/tierAction";

const initalState = {
  tier: {}
};

const tierReducer = (state = initalState, action) => {
  switch (action.type) {
    case TIER_DEFINED:
      return {
        ...state,
        tier: action.payload
      };
    default:
      return state;
  }
};
export default tierReducer;

import * as types from "../redux-actions/compareSubSamples";

const initialState = {
  compareSub: {}
};

const compareSubSamplesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.COMPARE:
      return {
        ...state,
        compareSub: action.payload
      };
    default:
      return state;
  }
};
export default compareSubSamplesReducer;

export const TIER_DEFINED = "TIER_DEFINED";

export const tierDefined = value => dispatch => {
  dispatch({ type: TIER_DEFINED, payload: value });
};

import * as types from "../redux-actions/calendarAction";

const initialState = {
  calendar: {}
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CALENDAR:
      return {
        ...state,
        calendar: action.payload
      };
    default:
      return state;
  }
};
export default calendarReducer;

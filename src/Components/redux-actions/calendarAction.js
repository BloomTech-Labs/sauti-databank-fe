export const CALENDAR = "CALENDAR";

export const calendarAction = values => dispatch => {
  dispatch({ type: CALENDAR, payload: values });
};

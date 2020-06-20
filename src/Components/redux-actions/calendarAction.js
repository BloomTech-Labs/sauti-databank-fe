export const CALENDAR = "CALENDAR";

export const calendarAction = values => dispatch => {
  console.log(values);
  dispatch({ type: CALENDAR, payload: values });
};

import React from "react";
import { combineReducers } from "redux";
import barDownloadReducer from "./barDownloadReducer";
import compareSubSamplesReducer from "./compareSubSamplesReducer";
import calendarReducer from "./calendarReducer";
import clearReducer from "./clearFiltersReducer";
import lineReducer from "./lineReducer";
import scrollReducer from "./scrollReducer";

const rootReducer = combineReducers({
  barDownloadReducer,
  compareSubSamplesReducer,
  calendarReducer,
  clearReducer,
  lineReducer,
  scrollReducer
});
export default rootReducer;

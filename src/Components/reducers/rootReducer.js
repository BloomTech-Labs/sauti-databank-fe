import React from "react";
import { combineReducers } from "redux";
import barDownloadReducer from "./barDownloadReducer";
import compareSubSamplesReducer from "./compareSubSamplesReducer";
import calendarReducer from "./calendarReducer";

const rootReducer = combineReducers({
  barDownloadReducer,
  compareSubSamplesReducer,
  calendarReducer
});
export default rootReducer;

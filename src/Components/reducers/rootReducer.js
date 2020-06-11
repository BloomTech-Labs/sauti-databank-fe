import React from "react";
import { combineReducers } from "redux";
import barDownloadReducer from "./barDownloadReducer";
import compareSubSamplesReducer from "./compareSubSamplesReducer";

const rootReducer = combineReducers({
  barDownloadReducer,
  compareSubSamplesReducer
});
export default rootReducer;

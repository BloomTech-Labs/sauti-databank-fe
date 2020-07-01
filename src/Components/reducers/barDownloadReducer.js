import * as types from "../redux-actions/barDownloadAction";

const initialState = {
  barDownload: {}
};

const barDownloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BARDOWNLOAD_SUCCESS:
      return {
        ...state,
        barDownload: action.payload
      };
    default:
      return state;
  }
};
export default barDownloadReducer;

export const BARDOWNLOAD_FETCH = "BARDOWNLOAD_FETCH";
export const BARDOWNLOAD_SUCCESS = "BARDOWNLOAD_SUCCESS";
export const BARDOWNLOAD_FAILURE = "BARDOWNLOAND_FAILURE";

export const barDownload = values => dispatch => {
  dispatch({ type: BARDOWNLOAD_SUCCESS, payload: values });
};

export const QUERIES = "QUERIES";
export const LOADQUERY = "LOADQUERY";
export const ERROR = "ERROR";

export const getQuery = data => dispatch => {
  dispatch({ type: LOADQUERY });
  async function query(queryData) {
    try {
      console.log(queryData, "its hitting the try");
      dispatch({ type: QUERIES, payload: queryData });
    } catch (err) {
      dispatch({ type: ERROR, payload: "error" });
    }
  }
  query(data);
};

// export const getQuery = (data)=>{
//   return dispatch =>{
//     dispatch({type:LOADQUERY});
//   async function query(queryData){
//   try{
//     dispatch({ type: QUERIES, payload: queryData });
//   }catch(error){
//    console.log(error);
//    return error ;
//   }}
//   query(data)
//   }}

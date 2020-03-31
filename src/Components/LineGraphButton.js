import React from "react";
import LineGraph from "./LineGraph";

const LineGraphButton = ({ data, filter0 }) => {
  console.log(data.sessionsData);
  if (data.sessionsData.length > 0) {
    console.log("first");
    return (
      <>
        <LineGraph data={data} filter0={filter0} />
      </>
    );
  } else {
    return <p>No Line Graph Available</p>;
  }
};

export default LineGraphButton;

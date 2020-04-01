import React, { useState } from "react";
import LineGraph from "./LineGraph";

const LineGraphButton = ({ data, filter0 }) => {
  const [open, setOpen] = useState(false);

  const buttonHandle = e => {
    setOpen(!open);
  };
  if (data.sessionsData) {
    return (
      <>
        <button onClick={buttonHandle}>
          Display Line Graph
          <LineGraph data={data} filter0={filter0} />
        </button>
      </>
    );
  } else {
    return <p>No Line Graph Available</p>;
  }
};

export default LineGraphButton;

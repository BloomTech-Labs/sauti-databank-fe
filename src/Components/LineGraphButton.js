import React, { useState } from "react";
import LineGraph from "./LineGraph";

const LineGraphButton = ({ sdata, filter0, buttonHandle }) => {
  const [open, setOpen] = useState(false);

  const renderUpdate = buttonHandle => {
    if (buttonHandle) {
      return (
        <LineGraph data={sdata} filter0={filter0} buttonHandle={buttonHandle} />
      );
    } else {
      return null;
    }
  };

  console.log(sdata.sessionsData);
  if (sdata.sessionsData) {
    return (
      <>
        <button onClick={buttonHandle}>
          Display Line Graph
          {renderUpdate()}
        </button>
      </>
    );
  } else {
    return <p>No Line Graph Available</p>;
  }
};

export default LineGraphButton;

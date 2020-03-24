import React from "react";

const CheckMarkSVG = ({
  style = { marginRight: "1rem" },
  fill = "#038C5A",
  width = "2.5rem",
  viewBox = "0 0 32 32"
}) => (
  <svg width={width} style={style} height={width} viewBox={viewBox}>
    <g>
      <path fill={fill} d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>{" "}
    </g>
  </svg>
);

export default CheckMarkSVG;

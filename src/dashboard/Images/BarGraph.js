import React from "react";

const BarGraph = ({
  style = {},
  fill = "#F5AF37",
  width = "5rem",
  viewBox = "0 0 20 20"
}) => (
  <svg width={width} style={style} height={width} viewBox={viewBox}>
    <g>
      <path
        fill={fill}
        d="M17 1h-2c-0.552 0-1 0.447-1 1v16.992h4v-16.992c0-0.553-0.447-1-1-1zM11 7h-2c-0.552 0-1 0.447-1 1v10.992h4v-10.992c0-0.553-0.447-1-1-1zM5 13h-2c-0.552 0-1 0.447-1 1v4.992h4v-4.992c0-0.553-0.447-1-1-1z"
      ></path>
    </g>
  </svg>
);

export default BarGraph;

import React from "react";

const DashboardSVG = ({
  style = {},
  fill = "#F5AF37",
  width = "5rem",
  viewBox = "0 0 24 24"
}) => (
  <svg width={width} style={style} height={width} viewBox={viewBox}>
    <g>
      <path
        fill={fill}
        d="M20.016 18v-9h-4.031v9h4.031zM15 12.984v-3.984h-11.016v3.984h11.016zM15 18v-3.984h-11.016v3.984h11.016zM20.016 3.984q0.797 0 1.383 0.609t0.586 1.406v12q0 0.797-0.586 1.406t-1.383 0.609h-16.031q-0.797 0-1.383-0.609t-0.586-1.406v-12q0-0.797 0.586-1.406t1.383-0.609h16.031z"
      ></path>
    </g>
  </svg>
);

export default DashboardSVG;

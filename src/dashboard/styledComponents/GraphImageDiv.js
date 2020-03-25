import React from "react";
import GraphImage from "../Images/GraphImage.png";
import styled from "styled-components";

const GraphImageDiv = () => {
  let MiddleImage = GraphImage;

  return <GraphImageStyles MiddleImage={MiddleImage}></GraphImageStyles>;
};

const GraphImageStyles = styled.div`
  height: 95%;
  width: 95%;
  background-image: ${props => `url(${props.MiddleImage})`};
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

export default GraphImageDiv;

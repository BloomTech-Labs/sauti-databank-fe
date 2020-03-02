import styled from "styled-components";
import { Link } from "react-router-dom";

export const DownloadModalDiv = styled.div`
  background-color: white;
  width: 35%;
  height: 30vh;
  font-size: 2rem;
  text-align: center;
  border-radius: 5px;
`;
export const DownloadModalTitle = styled.h3`
  padding: 2% 0% 2% 0%;
`;
export const DownloadModalText = styled.p`
  width: 85%;
  margin: 0 auto;
  padding: 2% 0% 2% 0%;
`;
export const DownloadModalButtons = styled.button`
  padding: 2%;
  width: 35%;
  background-color: transparent;
  border: 2px solid #212121;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #212121;
    color: white;
  }
`;
export const DownloadModalButtonsX = styled.button`
  background-color: transparent;
  color: #212121;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  text-align: right;
  margin-top: 1%;
  margin-left: 90%;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

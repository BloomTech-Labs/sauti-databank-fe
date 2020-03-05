import styled from "styled-components";
import { Link } from "react-router-dom";

export const DownloadModalDiv = styled.div`
  background-color: white;
  width: 35%;
  height: 30vh;
  font-size: 2rem;
  text-align: center;
  border-radius: 5px;
  border: none;
`;
export const DownloadModalTitle = styled.h3`
  margin: 2% 0% 2% 0%;
  font-weight: bold;
  font-size: 3rem;
`;
export const DownloadModalText = styled.p`
  width: 60%;
  margin: 0 auto;
  padding: 2% 0% 2% 0%;
  color: grey;
`;
export const DownloadModalTextContinue = styled.big`
  opacity: 1;
  color: black;
`;
export const DownloadModalButtons = styled.button`
  padding: 2%;
  width: 35%;
  background-color: transparent;
  border: 2px solid #eb5e52;
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

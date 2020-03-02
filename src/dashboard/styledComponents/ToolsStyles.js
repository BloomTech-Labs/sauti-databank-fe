import styled from "styled-components";

export const ToolsHeader = styled.div`
  background-color: lightgrey;
`;
export const ToolsInput = styled.input`
  border: 0;
  background: white;
  display: block;
  margin: 20px auto;
  padding: 14px 10px;
  width: 35%;
  outline: none;
  transition 0.25s;
`;
export const ToolsTitle = styled.h2`
  padding: 1% 0% 0% 2%;
  font-size: 2.5rem;
`;
export const UserDownloadButton = styled.button`
  background-color: lightgrey;
  width: 75px;
  height: 25px;
  border: 2px solid #212121;
  border-radius: 5px;
  &:hover {
    background-color: #eb5e52;
    cursor: pointer;
  }
`;
export const ToolsGrid = styled.div`
  height: 750px;
  margin: 0 auto;
`;

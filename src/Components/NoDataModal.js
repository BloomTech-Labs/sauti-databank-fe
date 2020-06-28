import React from "react";
import { ContentContainer } from "../dashboard/styledComponents/Index";
import styled from "styled-components";

export const Div = styled.div`
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  text-align: center;
  border-radius: 10px;
`;
export const FormTitle = styled.h1`
  font-weight: 500;
  font-size: 3rem;
`;

const BigX = styled.big`
  margin-left: 420px;
  font-size: 2.5rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

function NoDataModal({ setNoDataModal, setFilters, filters }) {
  function handleClose() {
    setNoDataModal(false);
    setFilters({
      0: {
        ...filters[0],
        nameOfFilter: "Data Series",
        selectableOptions: {}
      },
      1: {
        nameOfFilter: "Compare SubSamples",
        selectedCategory: "",
        selectableOptions: {},
        selectedTable: "Users",
        selectedTableColumnName: "",
        showOptions: false,
        optionHasBeenSelected: false
      },
      2: {
        nameOfFilter: "Data Filter",
        selectedCategory: "",
        selectableOptions: {},
        selectedTable: "",
        selectedTableColumnName: "",
        showOptions: true,
        optionHasBeenSelected: false
      }
    });
  }

  return (
    <ContentContainer>
      <div>
        <Div>
          <BigX onClick={() => handleClose()}>X</BigX>
          <FormTitle>
            Sorry no data is found for this search. Please try again.
          </FormTitle>
        </Div>
      </div>
    </ContentContainer>
  );
}

export default NoDataModal;

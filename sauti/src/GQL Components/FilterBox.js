import React, { useState } from 'react';
import '../App.scss'

import styled from 'styled-components';
import Dropdown from 'react-dropdown';

const FilterOption = styled.p`
  margin-left: .5rem;
  margin-top: .5rem;
  font-size: 1rem;
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
`

export default function FilterForm() {

    const [index, setIndex] = useState("");
    const [crossFilter, setCrossFilter] = useState("");
    

    const options = [
        "Gender",
        "Education Level",
        "Border Crossing Frequency",
        "Age",
        "Country of Residence",
        "Primary Income",
        "Language",
        "Produce",
        "Most Requested Procedures Commodities",
        "Most Requested Procedure Commodity Categories",
        "Requested Procedures for Destination (Imports to:)",
        "Most Requested Document Information for Procedures",
        "Most Requested Agency Information for Procedures",
        "Origin of Traders' Goods",
        "Final Destination Country",
        "Final Destination Market",
        "Top Commodity",
        "Top Commodity Categories",
        "Exchange Rate Direction"
      ];

      const handleCheck = label => label === crossFilter ? setCrossFilter("") : setCrossFilter(label);

      const createCheckBoxes = () => {
        options.forEach(option => {
          return (      
            <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name={option}
              value={option}
          /><FilterOption>{`${option}`}</FilterOption>
              </OptionContainer>
          )
        })
      }

    return (
        <div className="dropdown-container">
            <form>
              <Dropdown
                controlClassName="myControlClassName"
                arrowClassName="myArrowClassName"
                className="dropdown"
                options={options}
                onChange={setIndex}
                value={index}
                placeholder="Select an option"
              />

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Gender"
              value="Gender"
              /><FilterOption>Gender</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Education Level"
              value="Education Level"
              /><FilterOption>Education Level</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Border Crossing Frequency"
              value="Border Crossing Frequency"
              /><FilterOption>Border Crossing Frequency</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Age"
              value="Age"
              /><FilterOption>Age</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Country of Residence"
              value="Country of Residence"
              /><FilterOption>Country of Residence</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Primary Income"
              value="Primary Income"
              /><FilterOption>Primary Income</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Language"
              value="Language"
              /><FilterOption>Language</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Produce"
              value="Produce"
              /><FilterOption>Produce</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Most Requested Procedures Commodities"
              value="Most Requested Procedures Commodities"
              /><FilterOption>Most Requested Procedures Commodities</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Most Requested Procedure Commodity Categories"
              value="Most Requested Procedure Commodity Categories"
              /><FilterOption>Most Requested Procedure Commodity Categories</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Requested Procedures for Destination (Imports to:)"
              value="Requested Procedures for Destination (Imports to:)"
              /> <FilterOption>Requested Procedures for Destination (Imports to:)</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Most Requested Document Information for Procedures"
              value="Most Requested Document Information for Procedures"
              /> <FilterOption>Most Requested Document Information for Procedures</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Most Requested Agency Information for Procedures"
              value="Most Requested Agency Information for Procedures"
              /> <FilterOption>Most Requested Agency Information for Procedures</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Origin of Traders' Goods"
              value="Origin of Traders' Goods"
              /> <FilterOption>Origin of Traders' Goods</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Final Destination Country"
              value="Final Destination Country"
              /> <FilterOption>Final Destination Country</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Final Destination Market"
              value="Final Destination Market"
              /> <FilterOption>Final Destination Market</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Top Commodity"
              value="Top Commodity"
              /> <FilterOption>Top Commodity</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Top Commodity Categories"
              value="Top Commodity Categories"
              /> <FilterOption>Top Commodity Categories</FilterOption>
              </OptionContainer>

              <OptionContainer>
              <input
              onChange={handleCheck}
              type="checkbox"
              name="Exchange Rate Direction"
              value="Exchange Rate Direction"
              /> <FilterOption>Exchange Rate Direction</FilterOption>
              </OptionContainer>

            </form>
        </div>
    )

}
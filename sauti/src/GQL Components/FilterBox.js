import React, { useEffect } from 'react';
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

export default function FilterForm(props) {

  useEffect(() => {
    console.log(props.index)
  }, [props.index]);

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

      // const handleCheck = label => label === crossFilter ? setCrossFilter("") : setCrossFilter(label);

    return (
        <div className="dropdown-container">
            <form>
              <Dropdown
                controlClassName="myControlClassName"
                arrowClassName="myArrowClassName"
                className="dropdown"
                options={options}
                onChange={e => props.setIndex(e.target.value)}
                value={props.index}
                placeholder="Select an option"
              />


              {options.filter(option => option !== props.index).map(option => {
                  return (      
                    <OptionContainer>
                      <input
                      type="radio"
                      name="CrossFilter"
                      value={option}
                      /><FilterOption>{`${option}`}</FilterOption>
                    </OptionContainer>
                    )
                  })}
            </form>
        </div>
    )

}
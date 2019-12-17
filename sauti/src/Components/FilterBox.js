import React, { useEffect, useState } from 'react';
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
  console.log('this is props', props);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    props.setAllowNulls(isChecked)
  }, [isChecked]);

    const options = [
        {label: "Gender", value: "gender"},
        {label: "Education Level", value: "education"},
        {label: "Border Crossing Frequency", value: "crossing_freq"},
        {label: "Age", value: "age"},
        {label: "Country of Residence", value: "country_of_residence"},
        {label: "Primary Income", value: "primary_income"},
        {label: "Language", value: "language"},
        {label: "Produce", value: "produce"},
        {label: "Most Requested Procedures Commodities", value: ""},
        {label: "Most Requested Procedure Commodity Categories", value: ""},
        {label: "Requested Procedures for Destination (Imports to:)", value: ""},
        {label: "Most Requested Document Information for Procedures", value: ""},
        {label: "Most Requested Agency Information for Procedures", value: ""},
        {label: "Origin of Traders' Goods", value: ""},
        {label: "Final Destination Country", value: ""},
        {label: "Final Destination Market", value: ""},
        {label: "Top Commodity", value: ""},
        {label: "Top Commodity Categories", value: ""},
        {label: "Exchange Rate Direction", value: ""}
      ];

    return (
        <div className="dropdown-container">
            <form>
              <Dropdown
                controlClassName="myControlClassName"
                arrowClassName="myArrowClassName"
                className="dropdown"
                options={options}
                onChange={e => {
                  props.setIndex(e.value)
                  console.log('event', e.value)
                }}
                value={props.index}
                placeholder="Select an option"
              />

                <input 
                name="allowNulls"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                /> Allow Nulls

              {options.filter(option => option.value !== props.index).map(option => {
                console.log('label', option.label)
                  return (      
                    <OptionContainer>
                      <input
                      type="radio"
                      name="CrossFilter"
                      value={option.label}
                  /><FilterOption>{option.label}</FilterOption>
                    </OptionContainer>
                    )
                  })}
            </form>
        </div>
    )

}
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
        {label: "Gender", value: {
          index: "gender",
          query: "tradersUsers"
        }},
        {label: "Education Level", value: {
          index: "education",
          query: "tradersUsers"
        }},
        {label: "Border Crossing Frequency", value: {index: "crossing_freq", query: "tradersUsers"}},
        {label: "Age", value: {index: "age", query: "tradersUsers"}},
        {label: "Country of Residence", value: {index: "country_of_residence", query: "tradersUsers"}},
        {label: "Primary Income", value: {index: "primary_income", query: "tradersUsers"}},
        {label: "Language", value: {index: "language", query: "tradersUsers"}},
        {label: "Produce", value: {index: "produce", query: "tradersUsers"}},
        {label: "Most Requested Procedures Commodities", value: {index: "commodity", query: "tradersData"}},
        {label: "Most Requested Procedure Commodity Categories", value: {index: "", query: "tradersData"}},
        {label: "Requested Procedures for Destination (Imports to:)", value: {index: "", query: "tradersData"}},
        {label: "Most Requested Document Information for Procedures", value: {index: "", query: "tradersData"}},
        {label: "Most Requested Agency Information for Procedures", value: {index: "", query: "tradersData"}},
        {label: "Origin of Traders' Goods", value: {index: "", query: "tradersData"}},
        {label: "Final Destination Country", value: {index: "", query: "tradersData"}},
        {label: "Final Destination Market", value: {index: "", query: "tradersData"}},
        {label: "Top Commodity", value: {index: "", query: "tradersData"}},
        {label: "Top Commodity Categories", value: {index: "", query: "tradersData"}},
        {label: "Exchange Rate Direction", value: {index: "", query: "tradersData"}}
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
                  props.setIndex(e.value.index)
                  props.setQuery(e.value.query)
                  props.setLabel(e.label)
                  console.log('event', e.value.index)
                }}
                value={props.label}
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
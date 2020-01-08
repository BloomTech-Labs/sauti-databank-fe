import React from 'react';
import '../App.scss';
import ReactGa from 'react-ga';

import styled from 'styled-components';
import Dropdown from 'react-dropdown';

const FilterOption = styled.p`
  margin-left: .5rem;
  margin-top: .5rem;
  font-size: 1rem;
`

const Options = styled.div`
  display: flex;
  align-items: center;

`
const OptionContainer = styled.div`
  max-height: 40vh;
  overflow-x: scroll;
  margin: 10px 0;
`;

const Button = styled.div`
  background: #47837F;
  color: #fff;
  padding: 10px;
  margin: auto;
  text-align: center;
  align-self: center;
  font-size: 16px;
  :hover{cursor: pointer};
`;

export default function FilterBox(props) {

  const handleSubmit = (e, props) => {
    e.preventDefault();
  }

  const ClickTracker = (index) => {
    ReactGa.event({
      category: 'Option',
      action: `Clicked a Filter Option: ${index}`
    })
  }

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
      {label: "Most Requested Procedures Commodities", value: {index: "request_type", query: "tradersData", arg: 'procedurecommodity'}},
      {label: "Most Requested Procedure Commodity Categories", value: {index: "request_type", query: "tradersData", arg: 'procedurecommoditycat'}},
      {label: "Requested Procedures for Destination (Imports to:)", value: {index: "request_type", query: "tradersData", arg: 'proceduredest'}},
      {label: "Most Requested Document Information for Procedures", value: {index: "request_type", query: "tradersData", arg: 'procedurerequireddocument'}},
      {label: "Most Requested Agency Information for Procedures", value: {index: "request_type", query: "tradersData", arg: 'procedurerelevantagency'}},
      {label: "Origin of Traders' Goods", value: {index: "request_type", query: "tradersData", arg: 'procedureorigin'}},
      {label: "Final Destination Country", value: {index: "request_type", query: "tradersData", arg: 'commoditycountry'}},
      {label: "Final Destination Market", value: {index: "request_type", query: "tradersData", arg: 'commoditymarket'}},
      {label: "Top Commodity", value: {index: "request_type", query: "tradersData", arg: 'commodityproduct'}},
      {label: "Top Commodity Categories", value: {index: "request_type", query: "tradersData", arg: 'commoditycat'}},
      {label: "Exchange Rate Direction", value: {index: "request_type", query: "tradersData", arg: 'exchangedirection'}}
    ];

  return (
    <div className="dropdown-container">
      <form>
        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          options={options}
          value={props.label}
          onChange={e => {
            props.setIndex(e.value.index)
            props.setQuery(e.value.query)
            props.setLabel(e.label)
            ClickTracker(e.value.index)
            console.log('arg menu 1', props.arg)
            if(e.value.arg){
              props.setArgForQuery(e.value.arg)
            }
          }}
        />

        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          // Find way to render without the prev. set Index:
          options={options.filter(option=>option.label !== props.index)}
          value={props.label2}
          placeholder="Select second option"  
          onChange={e => {
            // props.setCrossFilter(e.value.crossFilter)
            props.setQuery(e.value.query)
            props.setLabel2(e.value.label2)
            props.setOptions(['Swahili', 'English', 'Luganda', 'Lukiga'])
            ClickTracker(e.value.crossFilter)
            if(e.value.arg){
              props.setCrossFilter(e.value.arg)
            }
          }}              
        />

          {props.label2 !== "" &&  ( 
          <div>
          <OptionContainer>
            {/* {(options.filter(option => option.value !== props.index).map(option => (    */}
            {(props.optionsForCheckbox.map(option => (   
              <Options>
                <input
                type="radio"
                name="CrossFilter"
                value={option.value}
                />
                  <FilterOption>{option}</FilterOption>
              </Options>
              ))
            )}
          </OptionContainer>
          <Button className='checkbox-submit-btn' onSubmit={handleSubmit}>SUBMIT</Button>
          </div>
          )}

              {/* Second Dropdown Menu */}
              {props.setIndex !== null && (
              <Dropdown
                controlClassName="myControlClassName"
                arrowClassName="myArrowClassName"
                className="dropdown"
                options={options.filter(option => option.label.index !== props.index)}
                onChange={e => {
                  props.setIndex2(e.value.index2)
                  props.setQuery(e.value.query)
                  props.setLabel2(e.label2)
                  ClickTracker(e.value.index2)
                  if(e.value.arg){
                    props.setArgForQuery(e.value.arg)
                  }
                }}
                value={props.label2}
                placeholder="Select second option"
              />)}
              
              {options.filter(option => option.value !== props.index).map(option => {
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
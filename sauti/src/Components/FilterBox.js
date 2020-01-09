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

const DateContainer = styled.div`
  max-height: 40vh;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  div{
    display: flex;
    flex-direction: column;
    input{
      font-family: 'Helvetica', 
      sans-serif; 
      margin: 0; 
      border-radius: 2px;
      border: 1px solid #ccc;
      padding: 8px 0;
      ::-webkit-inner-spin-button {display: none};
      ::-webkit-clear-button{display: none};
      ::-webkit-calendar-picker-indicator{ 
        background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) no-repeat; 
        opacity: 0.8; 
        cursor: pointer
      };
    };
  }
`;

const Button = styled.div`
  background: #47837F;
  color: #fff;
  padding: 10px;
  margin: auto;
  text-align: center;
  align-self: center;
  font-size: 1.5rem;
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
        query: "Users"
      }},
      {label: "Education Level", value: {
        index: "education",
        query: "Users"
      }},
      {label: "Border Crossing Frequency", value: {index: "crossing_freq", query: "Users"}},
      {label: "Age", value: {index: "age", query: "Users"}},
      {label: "Country of Residence", value: {index: "country_of_residence", query: "Users"}},
      {label: "Primary Income", value: {index: "primary_income", query: "Users"}},
      {label: "Language", value: {index: "language", query: "Users"}},
      {label: "Produce", value: {index: "produce", query: "Users"}},
      {label: "Most Requested Procedures Commodities", value: {index: "request_type", query: "Sessions", arg: 'procedurecommodity'}},
      {label: "Most Requested Procedure Commodity Categories", value: {index: "request_type", query: "Sessions", arg: 'procedurecommoditycat'}},
      {label: "Requested Procedures for Destination (Imports to:)", value: {index: "request_type", query: "Sessions", arg: 'proceduredest'}},
      {label: "Most Requested Document Information for Procedures", value: {index: "request_type", query: "Sessions", arg: 'procedurerequireddocument'}},
      {label: "Most Requested Agency Information for Procedures", value: {index: "request_type", query: "Sessions", arg: 'procedurerelevantagency'}},
      {label: "Origin of Traders' Goods", value: {index: "request_type", query: "Sessions", arg: 'procedureorigin'}},
      {label: "Final Destination Country", value: {index: "request_type", query: "Sessions", arg: 'commoditycountry'}},
      {label: "Final Destination Market", value: {index: "request_type", query: "Sessions", arg: 'commoditymarket'}},
      {label: "Top Commodity", value: {index: "request_type", query: "Sessions", arg: 'commodityproduct'}},
      {label: "Top Commodity Categories", value: {index: "request_type", query: "Sessions", arg: 'commoditycat'}},
      {label: "Exchange Rate Direction", value: {index: "request_type", query: "Sessions", arg: 'exchangedirection'}}
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
            <p>Language</p>
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

          <DateContainer>
            <div>
              <p>Start</p>
              <input
                name='startData'
                type='date'
                value='2012-01-01'
              />
            </div>
            <div>
              <p>End</p> 
              <input
                name='endData'
                type='date'
                value='2020-01-08'
                id='today'
              />
            </div>
          </DateContainer>


      </form>
    </div>
  )
}
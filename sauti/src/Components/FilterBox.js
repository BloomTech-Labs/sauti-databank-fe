import React, {useState, useEffect} from 'react';
import '../App.scss';
import ReactGa from 'react-ga';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import {FilterBoxOptions} from './FilterBoxOptions';


export default function FilterBox(props) {
  const [options, setOptions] = useState(FilterBoxOptions.default);
  const handleSubmit = e => {
    e.preventDefault();
  }

  const ClickTracker = (index) => {
    ReactGa.event({
      category: 'Option',
      action: `Clicked a Filter Option: ${index}`
    })
  }

  useEffect(()=> {
    if(props.index.query === 'Sessions'){
      setOptions(FilterBoxOptions.filtered)
    } else if(props.index.query === 'Users'){
      setOptions(FilterBoxOptions.default)
    }
  }, [])

  return (
    <DropdownContainer>
      <form>
        <p>Choose Index</p>
        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          options={FilterBoxOptions.default}
          value={props.indexLabel}
          onChange={e => {
            props.setIndex(e.value)
            props.setIndexLabel(e.label)
            ClickTracker(e.value.type)
            if(e.value.arg){
              props.setArgForQuery(e.value.arg)
            }
          }}
        />

        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          options={options}
          value={props.crossLabel} 
          placeholder='Select second option...'
          onChange={e => {
            props.setCrossLabel(e.label)
            props.setCheckboxOptions(['Swahili', 'English', 'Luganda', 'Lukiga'])
            props.setCrossFilter(e.value)
            if(e.value.arg){
              props.setArgForQuery(e.value.arg)
            }
          }}              
        />

          {props.crossLabel !== "" &&  ( 
          <div>
          <OptionContainer>
            <p>{props.crossLabel}</p>
            {(props.optionsForCheckbox.map(option => (   
              <Options>
                <input
                type="radio"
                name="CrossFilter"
                value={option.value}
                // value={crossFilter.value}
                />
                  <FilterOption>{option}</FilterOption>
              </Options>
              ))
            )}
          </OptionContainer>
          <Button className='checkbox-submit-btn' onSubmit={handleSubmit}>SUBMIT</Button>
          </div>
          )}

          {props.index.query === 'Sessions' && (
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
          
          )}

          <p className='reset-btn' onClick={e=> {
            props.setCrossLabel('')
            props.setCrossFilter({type: '', query: 'Users'})
          }}>Reset</p>

      </form>
    </DropdownContainer>
  )
}


const FilterOption = styled.p`
  margin-left: .5rem;
  margin-top: .5rem;
  font-size: 1rem;
`

const Options = styled.div`
  display: flex;
  align-items: center;
  input [type='radio']{
    background-color: red;
    font-size: 16px;
    background-image: none;
  }
`
const OptionContainer = styled.div`
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const DateContainer = styled.div`
  margin: 20px 0;
  display: flex;  
  div{
    display: flex;
    flex-direction: column;
    max-width: 50%;
    input{
      font-family: 'Helvetica', sans-serif;  
      font-size: 16px;
      margin: 0; 
      border-radius: 2px;
      border: 1px solid #ccc;
      padding: 8px 0 8px 4px;
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
  max-width: 40%;
  color: #fff;
  font-weight: 400;
  padding: 10px;
  margin: auto;
  text-align: center;
  align-self: center;
  font-size: 1.5rem;
  :hover{cursor: pointer};
`;

const DropdownContainer = styled.div`
font-family: Helvetica, sans-serif;
        color: $greyColor;
        font-weight: bold;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 26.9rem;

        p {
          font-size: 1.3rem;
          margin-bottom: 10px;
          
        }
        .reset-btn{
            text-decoration: underline;
            opacity: .7;
            cursor: pointer
        }
        .dropdown {
          color: $greyColor;
          font-size: 1.6rem;
          font-weight: normal;
          display: flex;
          align-items: center;
        }
        .myControlClassName {
          width: 100%;

          padding-top: 15px;
          padding-bottom: 15px;
          display: flex;
          align-items: center;
        }
        .Dropdown-arrow {
          position: absolute;
          top: 21px;
          right: 15px;`;
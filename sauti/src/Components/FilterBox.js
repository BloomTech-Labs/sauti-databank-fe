import React, {useState, useEffect} from 'react';
import '../App.scss';
import ReactGa from 'react-ga';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import {FilterBoxOptions} from './FilterBoxOptions';
import graphLabels from './graphLabels';


export default function FilterBox(props) {
  const [options, setOptions] = useState(FilterBoxOptions.default);
  const [filterBoxIndex, setFilterBoxIndex] = useState({type: "gender", query: "Users"});
  const [filterBoxCrossFilter, setFilterBoxCrossFilter] = useState({type: "", query: "Users"});
  const [filterBoxIndexLabel, setFilterBoxIndexLabel] = useState("Most Requested Procedures Commodities");
  const [filterBoxArgForQuery, setFilterBoxArgForQuery] = useState("procedurecommodity");
  const [filterBoxCrossLabel, setFilterBoxCrossLabel] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.setIndex(filterBoxIndex)
    props.setIndexLabel(filterBoxIndexLabel)
    props.setCrossLabel(filterBoxCrossLabel)
    props.setCrossFilter(filterBoxCrossFilter)
    if(filterBoxArgForQuery){
      props.setArgForQuery(filterBoxArgForQuery)
    }
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
          value={filterBoxIndexLabel}
          onChange={e => {
            setFilterBoxIndex(e.value)
            setFilterBoxIndexLabel(e.label)
            ClickTracker(e.value.type)
            if(e.value.arg){
              setFilterBoxArgForQuery(e.value.arg)
            }
          }}
        />

        <p>Choose Crossfilter</p>
        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          options={options}
          value={filterBoxCrossLabel} 
          placeholder='Select second option...'
          onChange={e => {
            setFilterBoxCrossLabel(e.label)
            setFilterBoxCrossFilter(e.value)
          }}              
        />

        {filterBoxCrossFilter.type !== "" &&  ( 
        <CheckboxContainer>
          <p>{props.crossLabel}</p>
          {(graphLabels[`${filterBoxCrossFilter.type}`].labels.map(option => (   
            <Options>
              <input
              type="radio"
              name="CrossFilter"
              value={option}
              onChange={e=> (
                props.setSelectedCheckbox( { [`${filterBoxCrossFilter.type}`]: option } )
              )}
              />
                <FilterOption>{option}</FilterOption>
            </Options>
            ))
          )}
        </CheckboxContainer>
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

        <div className='btn-container'>
          <Button className='checkbox-submit-btn' type="submit" onClick={handleSubmit}>Submit</Button>
          <Button className='download-btn' onClick={()=> console.log('Download CSV')}>Download</Button>
        </div>
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
  font-weight: 400;
`
const CheckboxContainer = styled.div`
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
      padding: 10px;
      ::-webkit-inner-spin-button {display: none};
      ::-webkit-clear-button{display: none};
      ::-webkit-calendar-picker-indicator{opacity: 0.8; cursor: pointer; color: #999};
    };
  }
`;

const Button = styled.div`
  background: #47837F;
  width: 40%;
  color: #fff;
  font-weight: 400;
  padding: 10px;
  border-radius: 2px;
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
    margin: 10px 0;
  }
  .reset-btn{
    text-decoration: underline;
    opacity: .7;
    cursor: pointer;
    margin-top: 8px;
  }
  .dropdown {
    color: $greyColor;
    font-size: 1.6rem;
    font-weight: normal;
    display: flex;
    align-items: center;
    margin-bottom: 8px;    
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
    right: 15px;
  }      
  .btn-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
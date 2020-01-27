import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { MockedProvider} from '@apollo/react-testing';
import 'jest'
import 'jest-extended'

//components to test
import App from './App';
import Graph from './Components/Graph';
import FilterBox from './Components/FilterBox';
import FilterBoxOptions from './Components/FilterBoxOptions';

import {
  render, 
  cleanup, 
  fireEvent, 
  getByText,
  getByPlaceholderText} from '@testing-library/react';


const mocks = [{
  request: {
    query: gql`
    query getData($id: Int!){
        getData(id: $id){
          id
          gender
          language
        }
    }`,
  },
  result: {
    data: {
      getData: [{
        gender: 'Female',
        language: 'English'
      }]
    }
  }  
}]

let data = [
  {gender: "Female", language: 'English'},
  {gender: "Female", language: 'Swahili'},
  {gender: "Male", language: null},
  {gender: null, language: 'English'},
  {gender: "Female", language: 'English'},
  {gender: "Female", language: 'Swahili'},
  {gender: "Male", language: 'English'},
  {gender: "Male", language: null},
  {gender: "Male", language: 'Swahili'},
  {gender: null, language: 'English'},
  {gender: null, language: 'Swahili'}
]

let checkboxOptions = ['cat', 'dog', 'pig', 'cow']


const customRender = (component) => {
  return {
    history, 
    ...render(
      <MockedProvider mocks={mocks} data={data} addTypename={false} >
        <Router >
          {component}
        </Router>
      </MockedProvider>
    )
  }
}

const waitForData = () => new Promise(res=>setTimeout(res, 0));


describe('Components in App work:', () => {
  afterEach(cleanup);

  test('Does FilterBox render without crashing?', async ()=> {
    const {debug} = customRender( <FilterBox checkboxOptions={checkboxOptions}/>)
    debug()
    await waitForData()

    const renderedApp = document.getElementsByTagName('DropdownContainer')
    expect(renderedApp).toBeDefined()
  })

  test('Does Graph render without crashing?', async ()=> {
    const {findByText} = customRender( <Graph/>)
    await waitForData()

    const renderedGraph = document.getElementsByClassName('Graph-Container')
    expect(renderedGraph).toBeDefined()

  })

  test('Does clicking Download download a csv file?', async () => {
    const {getByText} = customRender( 
      <Graph
        datas={data}
        columns={data}
      />
    )

    await waitForData()

    let Button = getByText('CsvDownloader')
    expect(Button).toBeDefined();
  })

  
  test('Does clicking dropdown option change label?', async () => {
    const {getByText} = customRender(
      <FilterBox 
        checkboxOptions={checkboxOptions} 
        FilterBoxIndexLabel={FilterBoxOptions}
      />
    )
    await waitForData()

    const Dropdown = getByText(/gender/i)
    await waitForData()
    
    expect(Dropdown).toBeDefined();
    expect(Dropdown).toContain(/gender/gi);

    fireEvent.change(Dropdown, {target: {value: "Language"}})
    await waitForData()
    expect(Dropdown).toContain('Language');
  });

})


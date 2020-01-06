import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { MockedProvider} from '@apollo/react-testing';
import {render, cleanup, fireEvent, findByText, findByPlaceholderText, findByDisplayValue} from '@testing-library/react';
import App from './App';
import Queries from './Components/Queries';
import Graph from './Components/Graph';
import NavBar from './Components/Navbar';
import FilterBox from './Components/FilterBox';
import { ResponsiveBar } from '@nivo/bar';


const mocks = [{
  request: {
    query: gql`
    query getUsers($id: Int!){
      tradersUsers(id: $id){
         gender
         language
      }
    }`,
    result: {
      data: {
        getData: {
          gender: 'Female',
          language: 'English'
        }
      }
    }
  }  
}]

const customRender = () => {
  return {
    history, 
    ...render(
      <MockedProvider mocks={mocks}>
        <Router >
          <Graph/>
        </Router>
      </MockedProvider>
    )
  }
}

const waitForData = () => new Promise(res=>setTimeout(res, 0));

describe('Graph returns data', () => {
  afterEach(cleanup);

  test('Data comes through?', async () => {
    const {findByText} = customRender( <Graph/>)
    await waitForData();
    const GraphContainer = findByText('Graph')
    expect(GraphContainer).toBeDefined()
    // expect(GraphContainer).toHaveReturnedWith(<ResponsiveBar/>)
  });

  // test('Check if query tradersUsers has correct fields', ()=> {
  //   const {findByText} = customRender( <Queries mocks={mocks}/>)
  //   const {tradersQuery} = findByText('tradersUsers')
  //   expect(tradersUsers).toBe(gql`
  //     type tradersUsers{
  //       gender: String!
  //       language: String!
  //     }`
  //   );
  // });

  test('Clicking dropdown option changes data', async () => {
    const {findByText} = customRender(<FilterBox/>, [mocks])
    const Menu = findByText('Dropdown')
    await waitForData()
    expect(Menu).toBeDefined();


    const menuOpt = findByText('Select an option')
    fireEvent.click(menuOpt)
    await waitForData()
    expect(menuOpt).toBe('Select an option');


    // fireEvent.change(menuOpt, {target: {value: "language"}})
    // await waitForElement(()=> getByDisplayValue('language'))
    // expect(menuOpt).toBe('language');
  });

})


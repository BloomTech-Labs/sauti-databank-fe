import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { MockedProvider} from '@apollo/react-testing';
import {render, cleanup, fireEvent, findByText, findByType, findByPlaceholderText, findByDisplayValue} from '@testing-library/react';
import App from './App';
import Queries from './Components/Queries';
import Graph from './Components/Graph';
import FilterBox from './Components/FilterBox';


const mocks = [{
  request: {
    query: gql`
    query getUsers($id: Int!){
      getUsers(id: $id){
        gender
        language
      }
    }`
  },
  result: {
    data: {
      gender: 'Female',
      language: 'English'
    }
  }  
}]

const customRender = () => {
  return {
    history, 
    ...render(
      <MockedProvider mocks={[]}>
        <Router >
          <Queries/>
        </Router>
      </MockedProvider>
    )
  }
}

const waitForData = () => new Promise(res=>setTimeout(res, 0));

describe('Queries Module:', () => {
  afterEach(cleanup);

  test('Does Graph render?', async () => {
    const {findByText} = customRender( <Graph/>)
    await waitForData();
    const GraphContainer = findByText('Graph')
    expect(GraphContainer).toBeDefined()
    // expect(GraphContainer).toHaveReturnedWith('<ResponsiveBar/>')
  });

  // test('Is Loading state initialized when loading?', async () => {
  //   const {findByText} = customRender( <Queries/>)
  //   await waitForData();

  //   const GetDataTest = findByText('GetData')
  //   expect(GetDataTest).toBeDefined()

    // const isLoading = findByText('loader-container')
    // expect(GetDataTest).toContain(isLoading)
  // })

  // test('Check if query tradersUsers has correct fields', ()=> {
  //   const {findByText} = customRender( <Queries mocks={mocks}/>)
  //  await waitForData();
  //   const {tradersQuery} = findByText('tradersUsers')
  //   expect(tradersUsers).toBe(gql`
  //     type tradersUsers{
  //       gender: String!
  //       language: String!
  //     }`
  //   );
  // });

  test('Does clicking dropdown option change data?', async () => {
    const {findByText} = customRender(<FilterBox/>)
    await waitForData()

    const Menu = findByText('form')
    await waitForData()
    expect(Menu).toBeDefined();

    // const menuOpt = findByText('Select an option')
    // fireEvent.click(menuOpt)
    // await waitForData()
    // expect(menuOpt).toBe('Select an option');

    // fireEvent.change(menuOpt, {target: {value: "language"}})
    // await waitForElement(()=> getByDisplayValue('language'))
    // expect(menuOpt).toBe('language');
  });

})


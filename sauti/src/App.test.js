import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { MockedProvider} from '@apollo/react-testing';

//components to test
import App from './App';
import Queries from './Components/Queries';
import Graph from './Components/Graph'
import dataParse from './Components/dataParse';
import FilterBox from './Components/FilterBox';

import {
  render, 
  cleanup, 
  fireEvent, 
  findByText, 
  findByType, 
  findByPlaceholderText, 
  findByDisplayValue} from '@testing-library/react';


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

// const customRender = () => {
//   return {
//     history, 
//     ...render(
//       <MockedProvider mocks={mocks} data={data} addTypename={false}>
//         <Router >
//           <App/>
//         </Router>
//       </MockedProvider>
//     )
//   }
// }

// const waitForData = () => new Promise(res=>setTimeout(res, 0));

// describe('Components in App work:', () => {
//   afterEach(cleanup);


  // test('Does chartData function in Queries work?', async () => {
  //   // const {findByText} = customRender( <Queries/>)
  //   render(<MockedProvider mocks={mocks} dataParse={dataParse} data={data} addTypename={false}>
  //       <Router >
  //         <Queries/>
  //       </Router>
  //     </MockedProvider>)
  //   await waitForData();

  //   const ChartDataFunc = findByText('chartData')
  //   const response = await dataParse('gender', data, "")
    
  //   expect(response.dataStructure).toBeArray()
  //   expect(response).toBeDefined()
  // });


  // test('Is Loading state initialized when loading?', async () => {
  //   const {findByText} = customRender( <Queries/>)
  //   await waitForData();

  //   const GetDataTest = findByText('GetData')
  //   expect(GetDataTest).toBeDefined()

  //   const isLoading = findByText('loader-container')
  //   expect(GetDataTest).toContain(isLoading)
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

  // test('Does clicking dropdown option change data?', async () => {
  //   const {findByText} = customRender(<FilterBox/>)
  //   await waitForData()

  //   const Menu = findByText('form')
  //   await waitForData()
  //   expect(Menu).toBeDefined();

    // const menuOpt = findByText('Select an option')
    // fireEvent.click(menuOpt)
    // await waitForData()
    // expect(menuOpt).toBe('Select an option');

    // fireEvent.change(menuOpt, {target: {value: "language"}})
    // await waitForElement(()=> getByDisplayValue('language'))
    // expect(menuOpt).toBe('language');
  // });

})


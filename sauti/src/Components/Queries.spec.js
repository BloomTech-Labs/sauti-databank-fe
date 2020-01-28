import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { MockedProvider} from '@apollo/react-testing';
import {render, cleanup, findByText} from '@testing-library/react';
import 'jest'
import 'jest-extended'

//components
import Queries from './Queries';
import FilterBoxOptions from './FilterBoxOptions'
  

let data = {
    index: [
        {gender: "Female", language: 'English', education: 'Primary', query: 'Users'},
        {gender: "Female", language: 'Swahili', education: null, query: 'Users'},
        {gender: "Male", language: null, education: 'Secondary', query: 'Users'},
    ],
    crossFilter: [
        {commoditycountry: 'RWA', query: 'Sessions'},
        {commoditycountry: 'KEN', query: 'Sessions'},
        {commoditycountry: 'UGA', query: 'Sessions'},
    ],
    additionalFilter: [
        {commodityproduct: 'beans', type: "commodityproduct", query: 'Sessions'}
    ]  
}

const TESTQUERY = gql`
    query tradersUsers($id: Int!){
        getData(
            age: $age,
            gender: $gender, 
            education: $education, 
            crossing_freq: $crossing_freq,
            produce: $produce,
            primary_income: $primary_income,
            language: $language,
            country_of_residence: $country_of_residence,
            procedurecommodity: $procedurecommodity,
            procedurecommoditycat: $procedurecommoditycat,
            proceduredest: $proceduredest,
            procedurerequireddocument: $procedurerequireddocument,
            procedurerelevantagency: $procedurerelevantagency,
            procedureorigin: $procedureorigin,
            commoditycountry: $commoditycountry,
            commoditymarket: $commoditymarket,
            commodityproduct: $commodityproduct,
            commoditycat: $commoditycat,
            exchangedirection: $exchangedirection,
            ){
                age
                gender 
                education 
                crossing_freq
                produce
                primary_income
                language
                country_of_residence
                procedurecommodity
                procedurecommoditycat
                proceduredest
                procedurerequireddocument
                procedurerelevantagency
                procedureorigin
                commoditycountry
                commoditymarket
                commodityproduct
                commoditycat
                exchangedirection
                additionalFilterData:sessionsData{
                    Sessions
                }
        }
    }
`;

const mocks = [{
    request: {
        query: TESTQUERY,
        variables: {
            gender: 'Female'
        }    
    },
    result: {
        data: {
            getUsers: {gender: 'Female', language: 'English', education: 'Primary'}
        }
    }  
}]

const customRender = () => {
    return {
      history, 
      ...render(
        <MockedProvider mocks={mocks} data={data} addTypename={false} >
          <Router >
            <Queries 
                props={data} 
                data={data}
                index={data.index} 
                crossFilter={data.crossFilter} 
                additionalFilterData={data.additionalFilter} 
                additionalFilter={data.additionalFilter}
                queryType={data.index.type}
            />
          </Router>
        </MockedProvider>
      )
    }
}
  
const waitForData = () => new Promise(res=>setTimeout(res, 0));

  
describe('Queries:', () => {
    afterEach(cleanup);
  
    test('Does Queries render?', async ()=> {
        const {debug} = customRender()
        debug()
        await waitForData();
    })

    // test('Does it render loading state when loading?', async () => {
    //     const {debug} = customRender()
    //     debug()
    //     await waitForData();

    //     const isLoading = document.getElementsByClassName('loader-container')
    //     const Loader = document.getElementsByTagName('Loader')
    //     expect(isLoading).toContain(Loader)
    // })

    // test('Does it throw an error?', async()=> {
        // const {debug} = customRender()
        // debug()
        // await waitForData();

        // const tree = component.toJSON();
        // expect(tree.childrend).toContain(/error/gi)
    // })

    // test('Does it get query?', async()=> {
    // })

    // test('Does query pass into Graph?', async()=> {
    // })

    // test('Does filterBox alter query?', async()=> {
    // })

    // test('Does query return Sessions?', async()=> {
    // })

    // test('Does query return Users?', async()=> {
    // })
})
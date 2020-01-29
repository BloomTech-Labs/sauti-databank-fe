import React from 'react';
import TestRenderer from 'react-test-renderer';
import { gql } from "apollo-boost";
import { MockedProvider} from '@apollo/react-testing';
import {render, cleanup, findByText} from '@testing-library/react';
import 'jest'
import 'jest-extended'

//components
import Queries from './Queries';
import FilterBox from './FilterBox';


const index = {type: "gender", query: "Users"}
const crossFilter = {type: 'age', query: 'Users'}
const additionalFilter = {type: "commodityproduct", query: 'Sessions'} 
const TESTQUERY = gql`
    query getUsers( 
        $age: String,
        $gender: String, 
        $education: String 
        $crossing_freq: String,
        $produce: String,
        $primary_income: String,
        $language: String,
        $country_of_residence: String,
        ){
            tradersUsers (
                age: $age,
                gender: $gender, 
                education: $education
                crossing_freq: $crossing_freq,
                produce: $produce,
                primary_income: $primary_income,
                language: $language,
                country_of_residence: $country_of_residence
            ) {
                ${index.type}
                ${crossFilter.type}
            } 
        }
`;
const mocks = [{
    request: {
        query: TESTQUERY,
    },
    result: {
        data: {
            tradersUsers: {gender: 'Female', age: '10-20'}
        },
    },
}];


const waitForData = () => new Promise(res=>setTimeout(res, 0));

  
describe('Queries:', () => {
    afterEach(cleanup);
  
    test('Does Queries render?', ()=> {
        render(
            <MockedProvider mocks={mocks}>
                <Queries
                    index={index} 
                    crossFilter={crossFilter} 
                    additionalFilter={additionalFilter}
                />
            </MockedProvider>
        )
    });

    // test('Does it render loading state when loading?', async () => {
    //     const component = TestRenderer.create(
    //         <MockedProvider mocks={mocks}>
    //             <Queries
    //                 index={index} 
    //                 crossFilter={crossFilter} 
    //                 additionalFilter={additionalFilter}
    //             />
    //         </MockedProvider>
    //     );

    //     expect(component).toBeDefined();
        // const tree = component.toJSON();
        // expect(tree.children).toContain(/load/gi);
    // })


    // test('Does it fetch correct query?', async()=> {
        // const testQuery = 
        // expect(testQuery).toBeArray();
        // expect(testQuery).toContain(/female/gi);
    // })

    // test('Does query pass into Graph?', async()=> {
        // const testGraph = document.getElementByTagName('Graph')
        // expect(testGraph).toBeDefined();
    // })

    // test('Does filterBox alter query?', async()=> {
    // })
})
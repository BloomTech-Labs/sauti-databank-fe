import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {render, cleanup} from '@testing-library/react';

// const mocks = [
//   {
//     request: {
//       query: SOME_QUERY,
//       variables: { first: 4 }
//     },
//     result: {
//       data: {
//         dog: {
//           name: "The Rock"
//         }
//       }
//     }
//   },
//   {
//     request: {
//       query: SOME_QUERY,
//       variables: { first: 8}
//     },
//     error: new Error("Something went wrong")
//   }
// ]

afterEach(cleanup);

test('Renders without crashing:', async () => {
  const {debug} = render(
    <MockedProvider >
      <Router>
        <App />
      </Router>
    </MockedProvider>
  );
  debug()
});

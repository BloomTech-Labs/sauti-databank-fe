import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { MockedProvider} from '@apollo/react-testing';
import {render, cleanup} from '@testing-library/react';
import Queries from './Components/Queries';


afterEach(cleanup);

test('App Renders Without Crashing:', async () => {
  const {debug} = render(
    <MockedProvider  >
      <Router>
        <App />
      </Router>
    </MockedProvider>
  );
  debug()
});

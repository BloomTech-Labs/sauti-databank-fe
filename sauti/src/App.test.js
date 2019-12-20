import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MockedProvider } from '@apollo/react-testing';


// it('DOES APP RENDER, DAMMIT?!', () => {
//     ReactDOM.render(
//         <App />,
//   document.getElementById("root")

//     );
//   });

// describe('App', function(){
//   describe('Rendering of Things in App.js', function(){

    test('DOES APP RENDER?:', () => {
        ReactDOM.render(
          <App />
        );
    });

//     let container = null;
//     beforeEach(()=> {
//       //setup DOM element as render target
//       container = document.createElement('div');
//       document.body.appendChild(container);
//     });

//     afterEach(()=> {
//       //cleanup on exit
//       unmountComponentAtNode(container);
//       container.remove();
//       container = null;
//     });

//   })
// })


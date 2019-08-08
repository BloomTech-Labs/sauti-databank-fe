import React from "react";
import axios from "axios";
import Chart from "./Components/Chart/Chart"
// import Transformation from "../Transformation"
// import ComSelTransformation from "./Components/ComSelTransformation"
import {Link} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      sessions_production: [],
      realData: []
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/sessions/all`)
      .then(res => {
        console.log(res);
        this.setState({
          sessions: res.data[0]
        });
      });


      axios
      // For development: ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
      .get(`https://sa-stage.herokuapp.com/sessions/lance/all`)
      .then(res => {
        // Log to see the response from server: console.log(res.data);
        this.setState({
          ...this.state,
          realData: res.data
        });
      })
      
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the Sauti Databank!</h1>
        <Chart /> 
        {/* <ComSelTransformation /> */}
        <div className="link-div">
          <Link to="/crossing-frequency-chart">
            <button className="link-button-chart">Crossing Frequency Chart</button>
          </Link>
          <Link to="/gender-chart">
            <button className="link-button-chart">Gender Chart</button>
          </Link>
          <Link to="/education-chart">
            <button className="link-button-chart">Education Chart</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;

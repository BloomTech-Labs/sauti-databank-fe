import React from "react";
import axios from "axios";
// import Chart from "./Components/Chart/Chart"
import Transformation from "./Components/Transformation"
// import ComSelTransformation from "./Components/ComSelTransformation"

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
        {this.state.realData.length ?
        <Transformation realData={this.state.realData}/> : null}
        {/* <ComSelTransformation /> */}
      </div>
    );
  }
}

export default App;

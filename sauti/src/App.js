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
      sessions_production: []
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
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the Sauti Databank!</h1>
        <Transformation />
        {/* <ComSelTransformation /> */}
      </div>
    );
  }
}

export default App;

import React from "react";
import axios from "axios";

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
      .get("https://staging-sauti-labs-14.herokuapp.com/sessions/all")
      .then(res => {
        console.log(res);
        this.setState({
          sessions: res.data[0]
        });
      }); //staging

    axios
      .get("https://production-sauti-labs-14.herokuapp.com/sessions/all")
      .then(res => {
        console.log(res);
        this.setState({
          sessions_production: res.data[1]
        });
      }); //production
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the Sauti Databank!</h1>
        <h1>Staging:</h1>
        <h2>{this.state.sessions.id}</h2>
        <h2>{this.state.sessions.language}</h2>
        <h2>{this.state.sessions.product}</h2>
        <h2>{this.state.sessions.country}</h2>
        <h1>Production:</h1>
        <h2>{this.state.sessions_production.id}</h2>
        <h2>{this.state.sessions_production.language}</h2>
        <h2>{this.state.sessions_production.product}</h2>
        <h2>{this.state.sessions_production.country}</h2>
      </div>
    );
  }
}

export default App;

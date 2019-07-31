import React from "react";
import axios from "axios";

class Transformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: [],
      usersArray: [],
      dataFromLance: []
    };
  }

  componentDidMount() {
    
    axios
      // ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
      .get(`https://staging-sauti-labs-14.herokuapp.com/sessions/real/all`)
      .then(res => {
        console.log(res.data);
        this.setState({
          ...this.state,
          realData: res.data
        });
      })
      .then(res => {
        this.createUsersArray();
      });
  }

  distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  createUsersArray = () => {
    let array = [];

    this.state.realData.map(element => {
      let object = {};
      object.UserID = element.UserID;
      array.push(object);
    });

    const distinctUsers = [];
    const map = new Map();
    for (const item of array) { // for each element of the array that contains duplicates
      if (!map.has(item.UserID)) { //if map does not contain an object with the userid, it includes it and pushes it to result
        map.set(item.UserID, true);
        distinctUsers.push({
          userid: item.UserID
        });
      }
    }

    console.log(distinctUsers);
  };

  render() {
    return (
      <div className="Transformation">
        <p>Hola</p>
      </div>
    );
  }
}

export default Transformation;

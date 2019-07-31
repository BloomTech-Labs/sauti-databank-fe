import React from "react";
import axios from "axios";

class Transformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: [],
      usersArray: [],
      dataFromLance: [],
      distinctUsers: []
    };
  }

  componentDidMount() {
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
      .then(res => {
        this.createUsersArray();
      })
      .then(res => {
        this.getGender();
      });
  }

  distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  createUsersArray = () => {
    let array = [];

    this.state.realData.map(element => {
      let object = {};
      object.cell_num = element.cell_num;
      array.push(object);
    });

    const distinctUsers = [];
    const map = new Map();
    for (const item of array) {
      // for each element of the array that contains duplicates
      if (!map.has(item.cell_num)) {
        //if map does not contain an object with the cell_num (userid), it includes it and pushes it to result
        map.set(item.cell_num, true);
        distinctUsers.push({
          cell_num: item.cell_num,
          gender: null //set gender to null inside every object so that every object has a gender property.
        });
      }
    }
    this.setState({ ...this.state, distinctUsers: distinctUsers });
    //console.log(distinctUsers);
  };

  // Map over session array
  // See if session did gender survey
  // Then map through distinct User array, and append gender to user with matching cell phone number
  getGender = () => {
    let arrayWithGender = this.state.distinctUsers;

    this.state.realData.map(element => {
      let num = element.cell_num;
      if (element.data.includes("Male")) {
        arrayWithGender.map(user => {
          if (user.cell_num == num) {
            user.gender = "Male";
          }
        });
      } else if (element.data.includes("Female")) {
        arrayWithGender.map(user => {
          if (user.cell_num == num) {
            user.gender = "Female";
          }
        });
      }
    });

    console.log(arrayWithGender);

    this.setState({ ...this.state, distinctUsers: arrayWithGender });

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

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
      })
      .then(res => {
        this.getAge();
      })
      .then(res => {
        this.getEducation();
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
          gender: null,
          age: null,//set gender to null inside every object so that every object has a gender property.
          education: null,
          // crossing_freq: null,
          // primary_income: null,
          // produce: null,
          // language: null,
          // country_of_residence: null
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

    // console.log(arrayWithGender);

    this.setState({ ...this.state, distinctUsers: arrayWithGender });

  };

  getAge = () => {
    let arrayWithAge = this.state.distinctUsers;

    this.state.realData.map(element => {
      let num = element.cell_num;
      if (element.data.includes("10-20")) {
        arrayWithAge.map(user => {
          if (user.cell_num == num) {
            user.age = "10-20";
          }
        });
      } else if (element.data.includes("20-30")) {
        arrayWithAge.map(user => {
          if (user.cell_num == num) {
            user.age = "20-30";
          }
        });
      } else if (element.data.includes("30-40")) {
        arrayWithAge.map(user => {
          if (user.cell_num == num) {
            user.age = "30-40";
          }
        });
      } else if (element.data.includes("40-50")) {
        arrayWithAge.map(user => {
          if (user.cell_num == num) {
            user.age = "40-50";
          }
        });
      } else if (element.data.includes("50-60")) {
        arrayWithAge.map(user => {
          if (user.cell_num == num) {
            user.age = "50-60";
          }
        });
      } else if (element.data.includes("60-70")) {
        arrayWithAge.map(user => {
          if (user.cell_num == num) {
            user.age = "60-70";
          }
        });
      } 
    });

    console.log(arrayWithAge);

    this.setState({ ...this.state, distinctUsers: arrayWithAge });

  };

  getEducation = () => {
    let arrayWithEducation = this.state.distinctUsers;

    this.state.realData.map(element => {
      let num = element.cell_num;
      if (element.data.includes("No formal education")) {
        arrayWithEducation.map(user => {
          if (user.cell_num == num) {
            user.education = "No formal education";
          }
        });
      } else if (element.data.includes("Primary")) {
        arrayWithEducation.map(user => {
          if (user.cell_num == num) {
            user.education = "Primary";
          }
        });
      } else if (element.data.includes("Secondary")) {
        arrayWithEducation.map(user => {
          if (user.cell_num == num) {
            user.education = "Secondary";
          }
        });
      } else if (element.data.includes("University/College")) {
        arrayWithEducation.map(user => {
          if (user.cell_num == num) {
            user.education = "University/College";
          }
        });
      }
    });

    // console.log(arrayWithGender);

    this.setState({ ...this.state, distinctUsers: arrayWithEducation });

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

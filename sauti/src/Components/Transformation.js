import React from "react";
import axios from "axios";

class Transformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: [],
      usersArray: []
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
      })
      ;
  }

  distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  createUsersArray = () => {
    
    let array = [];
    
    this.state.realData.map(element => {
      let object = {}
      object.UserID = element.UserID 
      array.push(object);
    })

    const result = Array.from(new Set(array.map(s => s.userID)))

    let distinctUsers = array.filter(this.distinct);
    
    console.log(distinctUsers);
    console.log(result);
  }

  render() {
    return(
      <div className="Transformation">
        <p>Hola</p>
      </div>
    )
  }
}

export default Transformation;

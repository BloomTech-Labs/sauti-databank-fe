import React from "react";
import axios from "axios";

class ComSelTransformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: [],
      commoditySelectionArray: []
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
        this.createCommoditySelectionArray();
      })
  }

  // Map over real data array to find sessions which have selected Dry Maize
  // Then we append that session to the commodity id which represents Dry Maize in the commodity table
  createCommoditySelectionArray = () => {
    let commoditySelectionArray = [];
    let id = 1;
    const commodityId = 1;

    this.state.realData.map(element => {
      let sessionId = element.sess_id;
      if (element.data.includes("Dry Maize")) {
        let commoditySelectionObject = {
          id: id,
          sess_id: sessionId,
          commodity_id: commodityId
        }
        commoditySelectionArray.push(commoditySelectionObject);
        id += 1;    
      } 
    });

    console.log(commoditySelectionArray);

    this.setState({ ...this.state, commoditySelectionArray: commoditySelectionArray });

  };

  render() {
    return (
      <div className="ComSelTransformation">
      </div>
    );
  }
}

export default ComSelTransformation;

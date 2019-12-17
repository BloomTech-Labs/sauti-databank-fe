// import React, { Component, useState } from "react";
// // import axios from "axios";
// // import Chart from "./Components/Chart/Chart";
// // import Transformation from "../Transformation"
// import "./App.scss";
// import "./index.css";

// import Navbar from "./Components/Navbar";
// import Options from "./Constants/Options";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";
// import { withRouter } from "react-router-dom";

// import Queries from "./GQL Components/Queries";

//   class App extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         sessions: [],
//         sessions_production: [],
//         realData: [],
//         defaultOption: "Select a Chart"
//       };
//     }

//     componentDidMount() {
//   this.getDropDownDefault();
//   axios.get(`${process.env.REACT_APP_BACKEND_URL}/sessions/all`).then(res => {
//     console.log(res);
//     this.setState({
//       sessions: res.data[0]
//     });
//   });
//     axios
//       // For development: ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
//       .get(`https://sa-stage.herokuapp.com/sessions/lance/all`)
//       .then(res => {
//         // Log to see the response from server: console.log(res.data);
//         this.setState({
//           ...this.state,
//           realData: res.data
//         });
//       });
//   }

//   render() {

//   return (
//     <div className="App">
//       <Navbar />
//       <div className="main-container">
//         <div className="header">
//           <h1>Informal Cross-Border Trade Data</h1>
//         </div>
//         <div className="content-container">
//           <div className="chart-container">
//             <Chart getDropDownDefault={this.getDropDownDefault.bind(this)} />
//             <Queries />
//           </div>
//           <div className="dropdown-container">
//             <p>Key Trader Demographics</p>

//             class component dropdown
//              <Dropdown
//                 controlClassName="myControlClassName"
//                 arrowClassName="myArrowClassName"
//                 className="dropdown"
//                 options={options}
//                 onChange={this.onSelect}
//                 value={this.state.defaultOption}
//                 placeholder="Select an option"
//               />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// }

// export default withRouter(App);

import React, { Component } from "react";
import items from "./data";

const   GraphContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    gender: [],
    //
    type: "all"
  };

  
}

export { GraphContext };
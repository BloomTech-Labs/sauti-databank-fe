import React from "react";

class Methodology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h2>Methodology</h2>
        <p>{this.props.paragraph}</p>
      </div>
    );
  }
}

export default Methodology;

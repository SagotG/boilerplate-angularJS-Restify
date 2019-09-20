import React, { Component } from "react";
import DrumComponent from "../../components/Drum/Drum";

class Drum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLoggedUser: false
    };
  }
  handleConnect = dataFromChild => {
    this.props.IsConnected = dataFromChild;
  };

  render() {
      return (
    <DrumComponent>
    </DrumComponent>
    );
  }
}

export default Drum;

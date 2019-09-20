import React, { Component } from "react";

class Profile extends Component {
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
    <>
    </>
    );
  }
}

export default Profile;

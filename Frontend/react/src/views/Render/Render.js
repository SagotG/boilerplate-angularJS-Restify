import React, { Component, PropTypes } from "react";
import axios from 'axios';
class Render extends Component {
    
    

    render() {
    const { isMobile } = this.props;

    return (
      <div>
        <h1>hello world {isMobile ? "mobile" : "desktop"}</h1>
      </div>
    );
  }
}

Render.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Render;
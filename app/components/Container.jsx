import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
  static get propTypes() {
    return {
      children: PropTypes.element.isRequired,
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Container;

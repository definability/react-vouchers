import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainInfoEntry extends Component {
  static get propTypes() {
    return {
      items: PropTypes.objectOf(PropTypes.string).isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.getList = this.getList.bind(this);
  }

  getList() {
    return Object.keys(this.props.items)
      .reduce((acc, key) => (typeof this.props.items[key] !== 'string'
        ? acc
        : (Array.prototype.concat([
          acc,
          typeof key === 'string' ? (<dt key={`${key}-term`}>{key}</dt>) : null,
          <dd key={`${key}-data`}>{this.props.items[key]}</dd>,
        ]))
      ), []);
  }

  render() {
    return (
      <dl>
        {this.getList()}
      </dl>
    );
  }
}

export default MainInfoEntry;

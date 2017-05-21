import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

class MainInfoEntry extends Component {
  static get propTypes() {
    return {
      items: PropTypes.objectOf(PropTypes.object).isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.getElement = this.getElement.bind(this);
    this.getList = this.getList.bind(this);
  }

  getElement(key) {
    const keyComponent = (key === 'brand'
        ? null
        : (<strong>{key}:</strong>)
    );
    const value = this.props.items[key];
    const valueComponent = (<span>{value.value}</span>);
    const copyButton = (
      <CopyToClipboard text={value.value}>
        <button className="copy" />
      </CopyToClipboard>
    );
    return (<p key={key}>{keyComponent}{valueComponent}{value.copy && copyButton}</p>);
  }

  getList() {
    return Object.keys(this.props.items)
      .filter(key => typeof this.props.items[key].value === 'string')
      .map(this.getElement);
  }

  render() {
    return (
      <div className="main-info-entry">
        {this.getList()}
      </div>
    );
  }
}

export default MainInfoEntry;

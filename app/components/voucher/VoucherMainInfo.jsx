import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import MainInfoEntry from './MainInfoEntry';

const DATE_FORMAT = 'dd/mm/yyyy, HH:MM';

class VoucherMainInfo extends Component {
  static get propTypes() {
    return {
      brand_image_url: PropTypes.string.isRequired,
      brand_name: PropTypes.string.isRequired,
      serial_number: PropTypes.number.isRequired,
      cvv: PropTypes.number,
      created: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      paper_voucher: PropTypes.bool.isRequired,

      isOpen: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      cvv: null,
    };
  }

  render() {
    const basicDetails = (
      <MainInfoEntry
        items={{
          [Symbol('brand')]: this.props.brand_name,
          'S/N': this.props.serial_number.toString(),
          CVV: this.props.paper_voucher ? null : this.props.cvv.toString(),
        }}
      />
    );
    const moreDetails = !this.props.isOpen ? null : (
      <MainInfoEntry
        items={{
          Created: dateformat(new Date(this.props.created), DATE_FORMAT),
          ID: this.props.id,
        }}
      />
    );

    return (
      <td onClick={this.props.onClick}>
        <div>
          <img
            alt={this.props.brand_name}
            height="40px"
            src={this.props.brand_image_url}
            width="40px"
          />
          {basicDetails}
        </div>
        {moreDetails}
      </td>
    );
  }
}

export default VoucherMainInfo;

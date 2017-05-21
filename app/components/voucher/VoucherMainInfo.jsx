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
          brand: { value: this.props.brand_name, copy: false },
          'S/N': { value: this.props.serial_number.toString(), copy: true },
          CVV: { value: this.props.paper_voucher ? null : this.props.cvv.toString(), copy: true },
        }}
      />
    );
    const moreDetails = !this.props.isOpen ? null : (
      <MainInfoEntry
        items={{
          Created: { value: dateformat(new Date(this.props.created), DATE_FORMAT), copy: false },
          ID: { value: this.props.id, copy: true },
        }}
      />
    );

    return (
      <td className="voucher-main-info">
        <div className="main-info-container">
          <img
            onClick={this.props.onClick}
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

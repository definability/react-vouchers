import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { setVoucherStatus } from '../../actions';
import VoucherMainInfo from './VoucherMainInfo';

const CURRENCY_AVAILABLE = ['GBP', 'US', 'EUR'];

const CURRENCY_SIGNS = Object.freeze({
  US: '$',
  GBP: '£',
  EUR: '€',
});

class Voucher extends Component {
  static get propTypes() {
    return {
      brand_image_url: PropTypes.string.isRequired,
      brand_name: PropTypes.string.isRequired,
      serial_number: PropTypes.number.isRequired,
      cvv: PropTypes.number,
      dispatch: PropTypes.func.isRequired,
      face_value: PropTypes.number.isRequired,
      asking_price: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      seller: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      // notes: PropTypes.string.isRequired,
      currency: PropTypes.oneOf(CURRENCY_AVAILABLE).isRequired,
      paper_voucher: PropTypes.bool.isRequired,
      // bulk_id: PropTypes.string.isRequired,
      // invoice_number: PropTypes.string.isRequired,
      // order_number: PropTypes.number.isRequired,
      status: PropTypes.oneOf([null, 'Active', 'Decline']),

      onClick: PropTypes.func.isRequired,
      isOpen: PropTypes.bool.isRequired,
    };
  }

  static get defaultProps() {
    return {
      cvv: null,
      status: null,
    };
  }

  constructor(props) {
    super(props);

    this.getButtons = this.getButtons.bind(this);
    this.getDisabledButton = this.getDisabledButton.bind(this);
  }

  getButtons() {
    return (
      <div>
        <button
          onClick={e => this.setVoucherStatus(e, true)}
          className="active"
        >
          Approve
        </button>
        <button
          onClick={e => this.setVoucherStatus(e, false)}
          className="decline"
        >
          Decline
        </button>
      </div>
    );
  }

  getDisabledButton() {
    return (
      <button
        className={this.props.status.toLowerCase()}
        disabled
      >
        {this.props.status}
      </button>
    );
  }

  setVoucherStatus(e, status) {
    e.preventDefault();
    this.props.dispatch(setVoucherStatus(this.props.id, status ? 'Active' : 'Decline'));
  }

  render() {
    const currencySign = CURRENCY_SIGNS[this.props.currency];
    return (
      <tr>
        <VoucherMainInfo
          brand_image_url={this.props.brand_image_url}
          brand_name={this.props.brand_name}
          serial_number={this.props.serial_number}
          cvv={this.props.cvv}
          created={this.props.created}
          id={this.props.id}
          paper_voucher={this.props.paper_voucher}
          isOpen={this.props.isOpen}
          onClick={this.props.onClick}
        />
        <td>
          <button className="edit" />
        </td>
        <td className="face-value">
          {this.props.face_value / 100}{currencySign}
        </td>
        <td className="asking-price">
          <div>
            {this.props.asking_price / 100}{currencySign}
          </div>
          <div>
            ({this.props.discount}%)
          </div>
        </td>
        <td>{this.props.seller}</td>
        <td>
          <div className="buttons-container">
            {this.props.status === null
               ? this.getButtons()
               : this.getDisabledButton()}
          </div>
          {!this.props.isOpen ? null : <textarea />}
        </td>
      </tr>
    );
  }
}

export default Voucher;

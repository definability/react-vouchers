import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { closeVouchers, fetchVouchers, openVoucher } from '../actions';
import Voucher from './voucher/Voucher';

class Home extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      openVoucherId: PropTypes.string,
      vouchers: PropTypes.arrayOf(PropTypes.object),
    };
  }

  static get defaultProps() {
    return {
      openVoucherId: null,
      vouchers: [],
    };
  }

  constructor(props) {
    super(props);

    this.showItems = this.showItems.bind(this);
    this.onRowClicked = this.onRowClicked.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchVouchers());
  }

  onRowClicked(voucherId) {
    if (this.props.openVoucherId === voucherId) {
      this.props.dispatch(closeVouchers());
    } else {
      this.props.dispatch(openVoucher(voucherId));
    }
  }

  showItems() {
    return this.props.vouchers.map(voucher => (
      <Voucher
        key={voucher.id}
        dispatch={this.props.dispatch}
        onClick={() => this.onRowClicked(voucher.id)}
        isOpen={this.props.openVoucherId === voucher.id}
        {...voucher}
      />
    ));
  }

  render() {
    return (
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th className="voucher-main-info">Info</th>
            <th />
            <th className="face-value">Face Value</th>
            <th className="asking-price">Asking Price</th>
            <th>Seller</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.showItems()}
        </tbody>
      </table>
    );
  }
}

export default connect(state => ({
  vouchers: state.vouchersReducer.vouchers,
  openVoucherId: state.viewReducer.voucherId,
}))(Home);

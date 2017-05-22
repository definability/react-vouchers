import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VoucherForm from './VoucherForm';
import { fetchVoucher } from '../../actions';

class Detailed extends Component {
  static propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired,
      voucher: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      voucher: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchVoucher(this.props.params.id));
  }

  render() {
    return this.props.voucher === null
      ? <div>Not Found</div>
      : (<VoucherForm
        dispatch={this.props.dispatch}
        voucher={this.props.voucher}
      />);
  }
}

export default connect(state => ({
  voucher: state.vouchersReducer.voucher,
}))(Detailed);

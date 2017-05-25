import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { editVoucherLocally, saveVoucherChanges } from '../../actions';

const FORM_STRUCTURE = Object.freeze([{
  name: 'Owner',
  key: 'seller',
  type: 'text',
  readonly: false,
}, {
  name: 'Previous Owner',
  key: 'seller',
  type: 'text',
  readonly: true,
}, {
  name: 'Serial',
  key: 'serial_number',
  type: 'text',
  readonly: false,
}, {
  name: 'Paper Voucher',
  key: 'paper_voucher',
  type: 'checkbox',
}, {
  name: 'CVV',
  key: 'cvv',
  type: 'text',
  readonly: voucher => !!voucher.paper_voucher,
}, {
  name: 'Bulk Id',
  key: 'bulk_id',
  type: 'text',
  readonly: true,
}, {
  name: 'Invoice Number',
  key: 'invoice_number',
  type: 'text',
  readonly: true,
}, {
  name: 'Order number',
  key: 'order_number',
  type: 'text',
  readonly: true,
}, {
  name: 'Brand',
  key: 'brand_name',
  type: 'text',
  readonly: false,
}]);

function getFieldValue(voucher, key) {
  if (typeof voucher[key] === 'string' || typeof voucher[key] === 'number') {
    return voucher[key].toString();
  } else if (typeof voucher[key] === 'boolean') {
    return voucher[key];
  }
  return '';
}

class Voucher extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      voucher: PropTypes.shape({
        brand_name: PropTypes.string.isRequired,
        bulk_id: PropTypes.string.isRequired,
        cvv: PropTypes.number,
        id: PropTypes.string.isRequired,
        invoice_number: PropTypes.string.isRequired,
        order_number: PropTypes.number.isRequired,
        paper_voucher: PropTypes.bool.isRequired,
        seller: PropTypes.string.isRequired,
        serial_number: PropTypes.number.isRequired,
        status: PropTypes.oneOf([null, 'Active', 'Decline']),
      }).isRequired,
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

    this.getInput = this.getInput.bind(this);
    this.getFields = this.getFields.bind(this);
  }

  getInput(fieldStructure) {
    const voucher = this.props.voucher;
    const changeValue = newValue =>
      this.props.dispatch(editVoucherLocally(this.props.voucher.id, fieldStructure.key, newValue));
    const value = getFieldValue(voucher, fieldStructure.key);

    switch (fieldStructure.type) {
      case 'text':
        return (<input
          type="text"
          id={fieldStructure.name}
          readOnly={typeof fieldStructure.readonly === 'function'
                    ? fieldStructure.readonly(voucher)
                    : !!fieldStructure.readonly}
          value={value}
          onChange={e => changeValue(e.target.value)}
        />);
      case 'checkbox':
        return (<input
          type="checkbox"
          id={fieldStructure.name}
          checked={!!value}
          onChange={() => changeValue(!voucher[fieldStructure.key])}
        />);
      default:
        return null;
    }
  }

  getFields() {
    return FORM_STRUCTURE.map(field => (
      <p key={field.name}>
        {this.getInput(field)}
        <label htmlFor={field.name}>{field.name}</label>
      </p>
    ));
  }

  render() {
    return (
      <form className="detailed">
        <fieldset>
          {this.getFields()}
        </fieldset>
        <fieldset className="buttons-container">
          <Link to="/">
            <button
              className="active"
              onClick={() => {
                this.props.dispatch(saveVoucherChanges(this.props.voucher));
              }}
            >
              Save
            </button>
          </Link>
          <Link to="/">
            <button className="decline">Back</button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

export default Voucher;


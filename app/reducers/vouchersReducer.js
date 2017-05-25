import { ACTIONS } from '../actions';

const initialState = Object.freeze({
  vouchers: [],
});

const EDITABLE_KEYS = ['brand_name', 'cvv', 'notes', 'paper_voucher',
  'seller', 'serial_number', 'status'];

function replaceVoucher(vouchers, voucherIndex, vaucherPatch) {
  return voucherIndex === -1 || typeof voucherIndex !== 'number'
    ? vouchers
    : Object.assign([], vouchers, { [voucherIndex]: vaucherPatch });
}

function isNotEditable(voucher, key) {
  return EDITABLE_KEYS.indexOf(key) === -1
    || (voucher.paper_voucher && key === 'cvv')
    || (voucher.status !== null && key === 'status');
}

function editVoucher(voucher, newValues) {
  const values = 'paper_voucher' in newValues && 'paper_voucher' in newValues
    ? Object.assign({}, newValues, { cvv: null })
    : newValues;
  const acceptedNewValues = Object.keys(values)
    .reduce((acc, key) => (isNotEditable(voucher, key)
      ? acc
      : Object.assign(acc, { [key]: values[key] })
    ), {});
  return Object.assign({}, voucher, acceptedNewValues);
}

function editAndReplaceVoucher(vouchers, vaucherPatch) {
  const voucherIndex = vouchers.findIndex(voucher => voucher.id === vaucherPatch.id);
  return voucherIndex === -1
    ? vouchers
    : replaceVoucher(vouchers, voucherIndex,
                     editVoucher(vouchers[voucherIndex], vaucherPatch));
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_VOUCHERS}_FULFILLED`:
      return Object.assign({}, state, {
        vouchers: action.payload,
      });
    case `${ACTIONS.FETCH_VOUCHER}_FULFILLED`:
      return Object.assign({}, state, {
        voucher: action.payload,
      });
    case ACTIONS.EDIT_VOUCHER:
      return Object.assign({}, state, {
        vouchers: editAndReplaceVoucher(state.vouchers, action.payload),
      });
    case ACTIONS.EDIT_VOUCHER_LOCALLY:
      if (action.payload.id !== state.voucher.id) {
        return state;
      }
      return Object.assign({}, state, {
        voucher: editVoucher(state.voucher, action.payload),
      });
    case ACTIONS.SAVE_VOUCHER_CHANGES:
      return Object.assign({}, state, {
        voucher: {},
      });
    default:
      return state;
  }
};

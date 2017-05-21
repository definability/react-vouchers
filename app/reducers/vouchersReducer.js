import { ACTIONS } from '../actions';

const initialState = Object.freeze({
  vouchers: [],
});

const EDITABLE_KEYS = ['brand_name', 'cvv', 'notes', 'seller', 'serial_number', 'status'];

function replaceVoucher(vouchers, voucherIndex, vaucherPatch) {
  return voucherIndex === -1
    ? vouchers
    : Object.assign([], vouchers, { [voucherIndex]: vaucherPatch });
}

function isNotEditable(voucher, key) {
  return EDITABLE_KEYS.indexOf(key) === -1
    || (voucher.paper_voucher && key === 'cvv')
    || (voucher.status !== null && key === 'status');
}

function editVoucher(voucher, newValues) {
  const acceptedNewValues = Object.keys(newValues)
    .reduce((acc, key) => (isNotEditable(voucher, key)
      ? acc
      : Object.assign(acc, { [key]: newValues[key] })
    ));
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
      return {
        vouchers: action.payload,
      };
    case ACTIONS.EDIT_VOUCHER:
      return {
        vouchers: editAndReplaceVoucher(state.vouchers, action.payload),
      };
    default:
      return state;
  }
};

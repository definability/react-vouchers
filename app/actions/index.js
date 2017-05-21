import vouchersFetcher from '../api/vouchers';

export const ACTIONS = Object.freeze({
  EDIT_VOUCHER: 'EDIT_VOUCHER',
  FETCH_VOUCHERS: 'FETCH_VOUCHERS',
  OPEN_VOUCHER: 'OPEN_VOUCHER',
});

export const fetchVouchers = () => ({
  type: ACTIONS.FETCH_VOUCHERS,
  payload: vouchersFetcher.get(),
});

export const openVoucher = voucherId => ({
  type: ACTIONS.OPEN_VOUCHER,
  payload: { voucherId },
});

export const closeVouchers = () => ({
  type: ACTIONS.OPEN_VOUCHER,
  payload: { voucherId: null },
});

export const setVoucherStatus = (id, status) => ({
  type: ACTIONS.EDIT_VOUCHER,
  payload: { id, status },
});

export const editVoucherNotes = (id, notes) => ({
  type: ACTIONS.EDIT_VOUCHER,
  payload: { id, notes },
});

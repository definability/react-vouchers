import vouchersFetcher from '../api/vouchers';

export const ACTIONS = Object.freeze({
  EDIT_VOUCHER: 'EDIT_VOUCHER',
  EDIT_VOUCHER_LOCALLY: 'EDIT_VOUCHER_LOCALLY',
  FETCH_VOUCHERS: 'FETCH_VOUCHERS',
  FETCH_VOUCHER: 'FETCH_VOUCHER',
  OPEN_VOUCHER: 'OPEN_VOUCHER',
  SAVE_VOUCHER_CHANGES: 'SAVE_VOUCHER_CHANGES',
});

export const fetchVouchers = () => ({
  type: ACTIONS.FETCH_VOUCHERS,
  payload: vouchersFetcher.get(),
});

export const fetchVoucher = id => ({
  type: ACTIONS.FETCH_VOUCHER,
  payload: vouchersFetcher.get(id),
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

export const editVoucher = (id, key, value) => ({
  type: ACTIONS.EDIT_VOUCHER,
  payload: { id, [key]: value },
});

export const editVoucherLocally = (id, key, value) => ({
  type: ACTIONS.EDIT_VOUCHER_LOCALLY,
  payload: { id, [key]: value },
});

export const saveVoucherChanges = voucher => ({
  type: ACTIONS.SAVE_VOUCHER_CHANGES,
  payload: vouchersFetcher.post(voucher),
});

import { ACTIONS } from '../actions';

const initialState = Object.freeze({
  voucherId: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_VOUCHER:
      return {
        voucherId: action.payload.voucherId || null,
      };
    default:
      return state;
  }
};

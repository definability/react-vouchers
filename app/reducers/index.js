import { combineReducers } from 'redux';

import vouchersReducer from './vouchersReducer';
import viewReducer from './viewReducer';

export default combineReducers({
  vouchersReducer,
  viewReducer,
});

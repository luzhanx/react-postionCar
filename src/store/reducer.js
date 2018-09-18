import {combineReducers} from 'redux';
import loginReducer from '@/pages/login/store/reducer';

const reducer = combineReducers ({
  login: loginReducer,
});

export default reducer;

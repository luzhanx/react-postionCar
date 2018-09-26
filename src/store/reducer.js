import {combineReducers} from 'redux';
import loginReducer from '@/pages/login/store/reducer';
import helpReducer from '@/pages/help/store/reducer';
import mapReducer from '@/pages/map/store/reducer';

const reducer = combineReducers ({
	login: loginReducer,
	help: helpReducer,
	map: mapReducer,
});

export default reducer;

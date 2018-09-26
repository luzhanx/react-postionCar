import { Types } from './action';

const defaultState = {
	help: '',
	agreement: ''
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Types.SET_HELP:
			return {
				...state,
				help: action.value
			};
		case Types.SET_AGREEMENT:
			return {
				...state,
				agreement: action.value
			};
		default:
			return state;
	}
};

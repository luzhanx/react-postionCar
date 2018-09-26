import { Types } from './action';

const defaultState = {
	isIncludeMap: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Types.SET_INCLUDE_MAP:
			return {
				...state,
				isIncludeMap: action
			};
		default:
			return state;
	}
};

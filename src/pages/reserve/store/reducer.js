import {Types} from './action';

const defaultState = {
  pageName: 'register',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.TEST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

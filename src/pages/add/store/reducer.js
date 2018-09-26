import {Types} from './action';

const defaultState = {
  pageName: 'login',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.TEST:
      return {
        ...state
      };
    default:
      return state;
  }
};

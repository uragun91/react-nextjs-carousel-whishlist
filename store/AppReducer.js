/**
 * The AppReducer takes in state and an action object. This Reducer function
 * works in conjunction with React's useReducer() hook.
 * @param {*} state
 * @param {*} action
 */
export const initialState = {
  watchList: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'watchList':
      return {
        ...state,
        watchList: action.payload
      };
    default:
      return state;
  }
};

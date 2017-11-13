import { fromJS } from 'immutable';
import { types } from './actions';

export const initialState = fromJS({
  context: {}
});

const contextSet = (state, { context }) => {
  return state.setIn(['context'], context);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CONTEXT_SET:
      return contextSet(state, action.payload);
    default:
      return state;
  }
};

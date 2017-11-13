import 'rxjs';

import { types } from './actions';

export const submitEpic = (action$, store) => action$
  .ofType(types.SUBMIT)
  .mapTo({
    type: types.SUBMIT_SUCCESS,
    payload: {
      foo: 'bar'
    }
  });

export default [
  submitEpic
]
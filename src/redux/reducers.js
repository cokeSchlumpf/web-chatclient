import app from './app/reducers';
import combineReducers from 'redux-immutable-combine-reducers';
import components from './components/reducers';
import { fromJS } from 'immutable';
import integration from './integration/reducers';

export default combineReducers(fromJS({
  app,
  components,
  integration
}));
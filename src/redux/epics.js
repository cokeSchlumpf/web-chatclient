import app from './app/epics';
import { combineEpics } from 'redux-observable';
import components from './components/epics';
import integration from './integration/epics';

export default combineEpics(
  ...app,
  ...components,
  ...integration
);
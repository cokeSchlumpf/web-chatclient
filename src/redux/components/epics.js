import chat from '../../components/Chat/redux/epics'
import { combineEpics } from 'redux-observable';

export default combineEpics(
  ...chat
);
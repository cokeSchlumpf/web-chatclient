import { fromJS } from 'immutable';
import { types } from './actions';

export const initialState = fromJS({
  messages: [],
  settings: {
    onClose: undefined,
    userLabel: 'Sie',
    botLabel: 'Watson',
    title: 'Watson - How can I help you today?'
  },
  submitting: false,
  typing: false,
  value: ''
});

const botAction = (state, { action }) => {
  switch (action) {
    case 'typing_on':
      return state.setIn(['typing'], true);
    case 'typing_off':
      return state.setIn(['typing'], false);
    default:
      return state;
  }
}

const botMessage = (state, { message, sender, time }) => {
  return state
    .updateIn(['messages'], messages => {
      return messages.push({
        from: sender || 'Watson',
        text: message,
        time: time || new Date()
      })
    })
    .setIn(['typing'], false);
}

const settingsSet = (state, { settings }) => {
  return state
    .setIn(['settings'], settings);
}

const userMessageChange = (state, { message }) => {
  return state
    .setIn(['value'], message);
}

const userMessageSubmit = (state) => {
  return state
    .setIn(['submitting'], true);
}

const userMessageSubmitSuccess = (state, { message }) => {
  return state
    .setIn(['submitting'], false)
    .setIn(['value'], '')
    .updateIn(['messages'], messages => {
      return messages.push({
        from: 'user',
        text: message, 
        time: new Date()
      });
    });
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.BOT_ACTION:
      return botAction(state, action.payload);
    case types.BOT_MESSAGE:
      return botMessage(state, action.payload);
    case types.SETTINGS_SET:
      return settingsSet(state, action.payload);
    case types.USER_MESSAGE_CHANGE:
      return userMessageChange(state, action.payload);
    case types.USER_MESSAGE_SUBMIT:
      return userMessageSubmit(state, action.payload);
    case types.USER_MESSAGE_SUBMIT_SUCCESS:
      return userMessageSubmitSuccess(state, action.payload);
    default:
      return state;
  }
};

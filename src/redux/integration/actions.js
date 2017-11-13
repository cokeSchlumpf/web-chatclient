import constantsFromArray from '../../utils/constants-from-array';

export const types = constantsFromArray([
  'BOT_ACTION',
  'BOT_MESSAGE',
  'CONTEXT_SET',
  'INIT',
  'SETTINGS_SET',
  'USER_MESSAGE_SUBMIT',
  'USER_MESSAGE_SUBMIT_FAIL',
  'USER_MESSAGE_SUBMIT_SUCCESS'
], 'INTEGRATION_');

export const botAction = (action) => (
  { type: types.BOT_ACTION, payload: { action } }
);

export const botMessage = (sender, message, time) => (
  { type: types.BOT_MESSAGE, payload: { sender, message, time } }
);

export const settingsSet = (settings) => (
  { type: types.SETTINGS_SET, payload: { settings } }
);

export const contextSet = (context) => (
  { type: types.CONTEXT_SET, payload: { context } }
);

export const init = (init) => (
  { type: types.INIT, payload: { init } }
);

export const userMessageSubmit = (message) => (
  { type: types.USER_MESSAGE_SUBMIT, payload: { message } }
);

export const userMessageSubmitSuccess = (message) => (
  { type: types.USER_MESSAGE_SUBMIT_SUCCESS, payload: { message } }
);

export default {
  botAction,
  botMessage,
  contextSet,
  init,
  settingsSet,
  userMessageSubmit,
  userMessageSubmitSuccess
}
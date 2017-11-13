import constantsFromArray from '../../../utils/constants-from-array';

export const types = constantsFromArray([
  'BOT_ACTION',
  'BOT_MESSAGE',
  'SETTINGS_SET',
  'USER_MESSAGE_CHANGE',
  'USER_MESSAGE_SUBMIT',
  'USER_MESSAGE_SUBMIT_FAIL',
  'USER_MESSAGE_SUBMIT_SUCCESS'
], 'COMPONENTS_CHAT_');

export const botAction = (action) => (
  { type: types.BOT_ACTION, payload: { action } }
);

export const botMessage = (sender, message, time) => (
  { type: types.BOT_MESSAGE, payload: { sender, message, time } }
);

export const settingsSet = (settings) => (
  { type: types.SETTINGS_SET, payload: { settings } }
);

export const userMessageChange = (message) => (
  { type: types.USER_MESSAGE_CHANGE, payload: { message } }
);

export const userMessageSubmit = (message) => (
  { type: types.USER_MESSAGE_SUBMIT, payload: { message } }
);

export const userMessageSubmitFail = (error) => (
  { type: types.USER_MESSAGE_SUBMIT_FAIL, payload: { error } }
);

export const userMessageSubmitSuccess = (message) => (
  { type: types.USER_MESSAGE_SUBMIT_SUCCESS, payload: { message } }
);

export default {
  botAction,
  botMessage,
  settingsSet,
  userMessageChange,
  userMessageSubmit,
  userMessageSubmitFail,
  userMessageSubmitSuccess
}
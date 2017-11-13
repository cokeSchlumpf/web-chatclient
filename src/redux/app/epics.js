import 'rxjs';

import actions, { types } from '../actions';

export default [
  // app.INIT -> integration.INIT
  action$ => action$
    .ofType(types.app.INIT)
    .flatMap(action => [
      actions.integration.init()
    ]),

  // integration.BOT_ACTION -> components.chat.BOT_ACTION
  action$ => action$
    .ofType(types.integration.BOT_ACTION)
    .flatMap(action => [
      actions.components.chat.botAction(action.payload.action)
    ]),

  // integration.BOT_MESSAGE -> components.chat.BOT_MESSAGE
  action$ => action$  
    .ofType(types.integration.BOT_MESSAGE)
    .flatMap(action => [
      actions.components.chat.botMessage(action.payload.sender, action.payload.message, action.payload.time)
    ]),

  // integration.SETTINGS_SET -> components.chat.SETTINGS_SET
  action$ => action$
    .ofType(types.integration.SETTINGS_SET)
    .flatMap(action => [
      actions.components.chat.settingsSet(action.payload.settings)
    ]),

  // components.chat.USER_MESSAGE_SUBMIT -> integration.USER_MESSGE_SUBMIT
  action$ => action$
    .ofType(types.components.chat.USER_MESSAGE_SUBMIT)
    .flatMap(action => [
      actions.integration.userMessageSubmit(action.payload.message)
    ]),

  // integration.USER_MESSAGE_SUBMIT_SUCCESS -> components.chat.USER_MESSAGE_SUBMIT_SUCCESS
  action$ => action$
    .ofType(types.integration.USER_MESSAGE_SUBMIT_SUCCESS)
    .flatMap(action => [
      actions.components.chat.userMessageSubmitSuccess(action.payload.message)
    ])
]
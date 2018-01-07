import 'rxjs';

import actions, { types } from './actions';

import _ from 'lodash';
import { setTimeout } from 'timers';
import store from '../store';

const config = _.get(window, 'top.wcs_config', {});

const chatwindow = {
  init: () => store.dispatch(actions.init(true)),
  typing_on: () => store.dispatch(actions.botAction('typing_on')),
  typing_off: () => store.dispatch(actions.botAction('typing_off')),
  message: (sender, message, time, context) => {
    store.dispatch(actions.botMessage(sender, message, time));

    if (context) {
      store.dispatch(actions.contextSet(context));
    }
  },
  response: (response) => {
    _
      .chain(response)
      .get('output.text', [])
      .each(message => {
        store.dispatch(actions.botMessage('Watson', message, new Date()));
      })
      .value();

    store.dispatch(actions.contextSet(_.get(response, 'context', {})));
  }
}

const send = ({ message }) => {
  if (_.get(config, 'handler.send')) {
    const request = {
      input: {
        text: message
      },
      context: _.get(store.getState().toJS(), 'integration.context', {})
    }

    const result = config.handler.send(request, chatwindow);

    if (result && result.then) {
      return result.then(result => actions.userMessageSubmitSuccess(message));
    } else {
      return Promise.resolve();
    }
  } else {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        setTimeout(() => {
          store.dispatch(actions.botAction('typing_on'));
          setTimeout(() => {
            store.dispatch(actions.botMessage('Watson', 'Client not connected. This is a dummy message.', new Date()))
          }, 2000);
        }, 500);
      }, 1000);
    });
  }
}

export default [
  action$ => action$
    .ofType(types.INIT)
    .flatMap(action => {
      if (_.get(config, 'handler.init')) {
        _.delay(() => _.get(config, 'handler.init')(chatwindow), 1000);
      };

      return [
        actions.contextSet(_.get(config, 'initial_context', {})),
        actions.settingsSet(_.get(config, 'settings', {}))
      ]
    }),

  action$ => action$
    .ofType(types.INIT)
    .filter(action => _.get(config, 'settings.init', false) || _.get(action, 'payload.init', false))
    .flatMap(action => {
      _.delay(() => send({ message: '' }), 1000);
      return []
    }),

  (actions$) => actions$
    .ofType(types.USER_MESSAGE_SUBMIT)
    .mergeMap(action => {
      return send(action.payload).then(() => actions.userMessageSubmitSuccess(action.payload.message));
    })
]
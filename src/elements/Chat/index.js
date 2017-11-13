import 'semantic-ui-css/semantic.min.css';
import './styles.css';

import { Button, Divider, Form, Icon, Message } from 'semantic-ui-react'
import { FormattedRelative, FormattedTime } from 'react-intl';
import React, { Component } from 'react';

import InputText from '../InputText';
import _ from 'lodash';
import cx from 'classnames';
import loader from './loader.gif';

class Chat extends Component {

  static get defaultProps() {
    return {
      className: undefined,
      typing: false,
      messages: [],
      submitting: false,
      title: 'Watson - How can I help you?',
      userLabel: 'Sie',
      value: '',

      onClose: undefined,
      onUserMessageChange: () => { },
      onUserMessageSubmit: () => { }
    }
  }

  render() {
    const onCloseHandler = (event) => {
      this.props.onClose();
    }

    const onChangeHandler = (event) => {
      this.props.onUserMessageChange(event.target.value);
    }

    const onSubmitHandler = (event) => {
      if (_.size(this.props.value) > 0 && this.props.onUserMessageSubmit) {
        this.props.onUserMessageSubmit(this.props.value);
      }

      event.stopPropagation();
      event.preventDefault();
    }

    const messages = _
      .chain(this.props.messages)
      .map((message, index) => {
        const classNames = {
          message: true,
          user: _.isEqual(message.from, 'user')
        }

        const render = (classNames) => {
          return (
            <Message key={`message-${index}`} className={cx(classNames)}>
              <Message.Header>{_.isEqual(message.from, 'user') ? this.props.userLabel : message.from}</Message.Header>
              {message.text}
            </Message>)
        };

        return _.assign({}, message, { classNames, render })
      })
      .reduce((acc, message, index) => {
        const previous = _.last(acc);

        if (!previous) {
          return [message]
        } else {
          if (_.isEqual(previous.from, message.from)) {
            return _.concat(acc, _.assign({}, message, {
              classNames: _.assign({}, message.classNames, {
                'hide-header': true
              })
            }))
          } else {
            const divider = {
              classNames: {},
              from: previous.from,
              render: (classNames) => {
                return (
                  <Divider className={cx(classNames)} key={`divider-${index}`} horizontal><FormattedTime value={previous.time || new Date()} /></Divider>);
              }
            }
            return _.concat(acc, divider, message)
          }
        }
      }, [])
      .reverse()
      .reduce((acc, message) => {
        const previous = _.last(acc);

        if (!previous) {
          return [message]
        } else {
          if (previous.classNames.history || !_.isEqual(previous.from, message.from)) {
            return _.concat(acc, _.assign({}, message, {
              classNames: _.assign({}, message.classNames, {
                history: true
              })
            }));
          } else {
            return _.concat(acc, message)
          }
        }
      }, [])
      .reverse()
      .map(message => message.render(message.classNames))
      .value();

    _.delay(() => {
      _.each(document.getElementsByClassName('chat-messages'), div => {
        div.scrollTop = div.scrollHeight;
      });
    }, 300);

    return (
      <div className={cx('chat-container', this.props.className)}>
        <div className="chat-header">
          <Icon name='circle' size='small' /> {this.props.title}

          {_.isFunction(this.props.onClose) &&
            <Button className='button-close' icon basic circular onClick={ onCloseHandler }>
              <Icon name='close' />
            </Button>
          }
        </div>
        <div className="chat-messages">
          {messages}

          {_.size(messages) > 0 && <Divider key='divider-latest-message' horizontal><FormattedRelative value={_.last(this.props.messages).time || new Date()} /></Divider>}

          {this.props.typing && <div className="typing"><img src={loader} alt="..." /></div>}
        </div>
        <div className="chat-input">
          <Form onSubmit={onSubmitHandler}>
            <InputText value={this.props.value} submitting={this.props.submitting} onChange={onChangeHandler} />
          </Form>
        </div>
      </div>);
  }

}

export default Chat;
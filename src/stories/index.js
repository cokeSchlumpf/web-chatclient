import './styles.css';

import { Button, Welcome } from '@storybook/react/demo';
import { IntlProvider, addLocaleData } from 'react-intl';

import Chat from '../elements/Chat';
import React from 'react';
import { action } from '@storybook/addon-actions';
import de from 'react-intl/locale-data/de';
import deMessages from '../resources/i18n/de.json';
import flattenObject from '../utils/flatten-object';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Chat', module)
  .add('with messages', () => {
    const messages = [
      {
        from: 'Watson',
        text: 'Einen schönen guten Morgen! Wie kann ich Ihnen helfen?'
      },
      {
        from: 'Watson',
        text: 'Lorem ipsum dolor sit amet'
      },
      {
        from: 'user',
        text: 'Hallo Watson, ich bin auf der Suche nach Hilfe!'
      },
      {
        from: 'user',
        text: 'Hallo Watson, ich bin auf der Suche nach Hilfe!'
      },
      {
        from: 'Watson',
        text: 'Lorem ipsum dolor sit amet'
      }
    ];

    addLocaleData([...de]);

    return (
      <IntlProvider defaultLocale='de' locale='de' messages={deMessages}>
        <div className='chat-demo'>
          <div className='chat-window'>
            <Chat 
              onUserMessageChange={action('onChange')} 
              onUserMessageSubmit={action('onUserMessageSubmit')} 
              onClose={action('onClose')} 
              messages={messages} 
              userLabel='You' 
              loading={true} />
          </div>
        </div>
      </IntlProvider>);
  });
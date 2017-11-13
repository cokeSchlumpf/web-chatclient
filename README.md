# Web Chat Client Component for IBM Watson Conversation

This project offers a simple chat client which can be easily integrated into an existing Website to provide an user interface for a chat client. Any chat backend can be integrated, but the main purpose of this component is to comunicate with an [IBM Watson Conversation Service Backend](https://www.ibm.com/watson/services/conversation/).

The component is designed to be integrated in an existing web page as `<iframe>`, thus there shouldn't be any complications with your existing JavaScript, CSS, etc.

**The component itself does not implement the communication with the Backend as this can be quite different for several use cases!**

![Screenshot](./screenshot.png)

## Setup

1. Provide static files from './build' directory on your Web-Server, lets say via `http://localhost:8080/chat`

2. Insert the `<iframe>` in your web page.

  ```html
  <html>
    <!-- ... -->
    <body>
      <!-- ... -->
      <iframe 
        style="position: absolute; z-index: 9999; bottom: 0; right: 20px; width: 300px; height: 420px; background: transparent none;"
        allowtransparency="true" src="http://localhost:8080/chat/index.html"></iframe>
    </body>
  </html>
  ```

**DONE.** It is important that the static web content for the chat window is served from the same server as the webpage which includes the iframe.

## Configuration and Backend Integration

The chat window can be configured with a global variable `wcs_config` in the parent page.

Example: 

```javascript
var wcs_config = {
  handler: {
    init: function(chatwindow) {
      // This method is called when chat is initialized
      chatwindow.message('Watson', 'Hello from me!', new Date())
    },

    send: function(request, chatwindow) {
      // This method is called when a message is sent by the user.
      
      // this is a simple demo:
      chatwindow.typing_on();
      window.setTimeout(function() {
        chatwindow.message('Watson', 'This is a demo message', new Date());
      }, 3000); 

      window.setTimeout(function() {
        // Send a sample response from Watson Conversation
        chatwindow.response({"intents":[],"entities":[],"input":{"text":"Hello"},"output":{"text":["Ich habe Sie nicht verstanden. Bitte formulieren Sie Ihre Aussage neu."],"nodes_visited":["Andernfalls"],"log_messages":[]},"context":{"conversation_id":"a5133615-eb02-4cc6-9a3d-f86803f3bccf","system":{"dialog_stack":[{"dialog_node":"root"}],"dialog_turn_counter":1,"dialog_request_counter":1,"_node_output_map":{"Andernfalls":[0]},"branch_exited":true,"branch_exited_reason":"completed"}}});
      }, 4000);
    }
  },

  initial_context: {
    salutation: "Herr",
    firstname: "Egon",
    lastname: "Olsen"
  },

  settings: {
    init: true,
    onClose: undefined,
    userLabel: 'Sie',
    botLabel: 'Watson',
    title: 'Watson - How can I help you today?'
  }
}
```

**handler.init** is called after the chat is initialized. The function receives a chatwindow parameter. The chatwindow object is described below.

**handler.send** is called when the user sends a message via the chat. This method implements the actual integration with the backend. The request object already contains a valid request for Watson Conversation which can be forwarded via a proxy on the webserver to Watson Conversation Service API.

**initial_context** can be optionally defined to set the initial context of the conversation.

**settings.init** if `true`, the chat window will send an empty init message to the chat API after loading.

**handler.onClose** is called when the user clicks the close-button. If this handler is undefined, no close button is shown.

**settings.userLabel** is the label which will be shown above messages written by the user.

**settings.botLabel** is the label which will be shown above messages witten by the bot, if `message.sender` of the message does not override.

**settings.title** is the title of the chat window.

The `chatwindow` object which is passed to `init` and `send` has the following methods:

**init()** can be called to trigger sending of an initial message, e.g. if `settings.init` is false and initialization is triggered manually.

**typing_on()** turns on the typing indicator. Note that the typing indicator will be turned off, when a message is received.

**typing_off()** turns off the typing indicator. Note that the typing indicator will also be turned off, when a message is received.

**message(sender, message, milliseconds_timestamp)** can be called if a message should be shown as bot message.

**response(watson_response)** can be called with the response, received by IBM Watson Conversation service.
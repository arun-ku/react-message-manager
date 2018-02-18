### Message Manager
Message manager is a react toastr component for displaying toast messages in your react
desktop as well as mobile web applications.

### [Demo](https://msgmngr.herokuapp.com/)

### Installation

**npm**
```bash
npm install --save react-message-manager
```
**yarn**
```bash
yarn add react-message-manager
```

### Example

```js
import React from 'react';
import { render } from 'react-dom';
import { MessageManagerProvider } from 'react-message-manager';

import App from './app.js';

render(
  <MessageManagerProvider desktopView>
    <App />
  </MessageManagerProvider>,
  document.getElementById('root') //your container to render the react app
);
```

> `app.js` looks like this
```js
import React, { Component } from 'react';
import { injectMessageManager } from 'react-message-manager';

class App extends Component {

  showError = () => {
    const { messageManager } = this.props;
    messageManager.showErrorMessage('Error', {
      displayTime: 5000, //defaults to 2000
    });
  };

  showSuccess = () => {
    const { messageManager } = this.props;
    messageManager.showSuccessMessage('Success', {
      displayTime: 5000, //defaults to 2000
    });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this.showSuccess}>
          Success
        </button>
        <button onClick={this.showError}>
          Error
        </button>
      </div>
    );
  }
}

export default injectMessageManager(App); //injectMessageManager HOC puts messageManager in the props
```

###Props for MessageManagerProvider

Prop | Type | Description | Default Value | Example
-----|------|-------------|---------------|---------
desktopView | bool | Is the component being rendered in desktop view | false | `<MessageManagerProvider isDesktop ></MessageManagerProvider>`
configs | object | Default configuration for message manager | null | configs={ successBackgroundColor: 'green', successTextColor: 'red', errorBackgroundColor: 'red', errorTextColor: 'grey', defaultSuccessIconClass: 'fa fa-tick', defaultErrorIconClass: 'fa fa-cross', }


###Methods

* `showSuccessMessage` - Used to desplay a success message. The method takes two
arguments: the first argument is the message to be displayed of type string. The seacond argument
is the options object whick can have the following properties. `displayTime` - Time in milliseconds
for which the message is to be displayed(defaults to 2000). `iconClass` - class of the icon to be
displayed in the message (eg: 'fa fa-cross').

* `showErrorMessage` - Same as `showSuccessMessage`, used to display an error message.

> NOTE: Both `showSuccessMessage` and `showErrorMessage` return id of the message which is
> required if you want to manually close that message.

* `hideMessage` - Used to hide a specific message. The function takes one argument which is
the id of the message which has to be removed from the screen.


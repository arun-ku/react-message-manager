### Message Manager
Message manager is a react toastr component for displaying toast messages in your react
desktop as well as mobile web applications.

### [Demo](http://google.com)

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
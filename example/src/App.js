import React, { Component } from 'react';

import { injectMessageManager } from '../../dist/bundle';
import * as b from '../../MessageManager/index';

console.log( b)

@injectMessageManager
class App extends Component {

  render() {
    return (
      <div onClick={() => this.props.messageManager.showSuccessMessage('Success', { displayTime: 500000 })}>
        App Component
      </div>
    );
  }
}

export default App;
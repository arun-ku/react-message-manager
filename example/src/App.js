import React, { Component } from 'react';

import { injectMessageManager } from 'message-manager';

import './styles.scss';

@injectMessageManager
class App extends Component {

  getOptionsBasedOnType = type => {
    switch (type) {
      case 'normal':
        return {};
      case '5sec':
        return {
          displayTime: 5000,
        };
      case 'withIcon':
        return {
          displayTime: 4000,
          iconClass: 'icon'
        };
    }
  };

  handleSuccess = (type) => {
    const { messageManager } = this.props;
    if (type === 'long') {
      messageManager.showSuccessMessage('This is a long Success Message to show the behaviour in such cases', {
        displayTime: 8000
      });
      return;
    }
    const options = this.getOptionsBasedOnType(type);
    messageManager.showSuccessMessage('Success Message', options);
  };

  handleError = (type) => {
    const { messageManager } = this.props;
    if (type === 'long') {
      messageManager.showErrorMessage('This is a long Error Message to show the behaviour in such cases', {
        displayTime: 8000
      });
      return;
    }
    const options = this.getOptionsBasedOnType(type);
    if (options) {
      options.iconClass = (options.iconClass || '') + ' err';
    }
    messageManager.showErrorMessage('Error Message', options);
  };

  render() {
    return (
      <div className="container">
        <h1>Message Manager</h1>
        <p className="description">
          Message Manager is a toastr like component for react. It is easy to
          use and there is no need to add external css files into your code as
          it uses inline styles.
        </p>
        <div className="">
          <div className="row">
            <h4>Success</h4>
            <button onClick={() => this.handleSuccess('normal')} className="btn btn-success">
              Success
            </button>
            <button onClick={() => this.handleSuccess('5sec')} className="btn btn-success">
              Success (for 5 seconds)
            </button>
            <button onClick={() => this.handleSuccess('withIcon')} className="btn btn-success">
              Success (with icon)
            </button>
            <button onClick={() => this.handleSuccess('long')} className="btn btn-success">
              Success (Long Message)
            </button>
          </div>
          <div className="row">
            <h4>Error</h4>
            <button onClick={() => this.handleError('normal')} className="btn btn-error">
              Error
            </button>
            <button onClick={() => this.handleError('5sec')} className="btn btn-error">
              Error (for 5 seconds)
            </button>
            <button onClick={() => this.handleError('withIcon')} className="btn btn-error">
              Error (with icon)
            </button>
            <button onClick={() => this.handleError('long')} className="btn btn-error">
              Error (Long Message)
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
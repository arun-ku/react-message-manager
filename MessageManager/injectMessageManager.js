import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * injectMessageManager
 * Higher Order Component which sets messageManager in the props of component
 *
 * @param WrappedComponent
 * @returns {MessageManagerHOC}
 */
export default (WrappedComponent) => {
  return class MessageManagerHOC extends Component {

    static contextTypes = {
      messageManager: PropTypes.object
    };

    render() {
      return (
        <WrappedComponent {...this.props} messageManager={this.context.messageManager} />
      );
    }
  }
};
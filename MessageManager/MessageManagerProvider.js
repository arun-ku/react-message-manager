import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { generateRandomId } from './CommonUtils';

import getStyles from './styles';
import { transitionStylesMobile, transitionStylesDesktop } from './transitions';

export default class MessageManagerProvider extends Component {
  state = {
    showMessage: false,
    message: "",
    messages: [],
    separator: Math.floor(Math.random() * 100000),
  };

  static childContextTypes = {
    messageManager: PropTypes.object,
  };

  timers = {};
  transitionTimers = {};

  getChildContext() {
    return {
      messageManager: {
        showSuccessMessage: this.showSuccessMessage,
        showErrorMessage: this.showErrorMessage,
        hideMessage: this.hideMessageBar,
      }
    }
  }

  /**
   * getNewState
   * returns new state for Message manger based on the options
   *
   * @param type
   * @param options
   * @returns {{isError: boolean, icon: string, displayTime: *}}
   */
  getNewState = (type, options) => {
    const {
      displayTime,
      iconClass,
    } = options;
    const { configs } = this.props;
    const isError = type === 'error';
    let icon = 'mm-icon';
    if (iconClass) {
      icon = `${iconClass} mm-icon`;
    } else {
      const defaultClass = isError ? configs && configs.defaultErrorIconClass || '' :
        configs && configs.defaultSuccessIconClass || '';
      icon = `${defaultClass} mm-icon`
    }
    return {
      id: generateRandomId(),
      isError,
      icon,
      displayTime: displayTime && displayTime + 800 || 2800,   //adding transition time for the message bar
    };
  };

  /**
   * showErrorMessage
   * function for showing error message
   *
   * @param message - message to be displayed
   * @param options - { displayTime, iconClass}
   */
  showErrorMessage = (message, options = {}) => {
    const newState = this.getNewState('error', options);
    return this.showMessageBar(message, newState);
  };

  /**
   * showSuccessMessage
   * function for showing success message
   *
   * @param message - message to be displayed
   * @param options - { displayTime, iconClass }
   */
  showSuccessMessage = (message, options = {}) => {
    const newState = this.getNewState('success', options);
    return this.showMessageBar(message, newState);
  };

  /**
   * hideMessageBar
   * hides message bar when called
   */
  hideMessageBar = (id, cb) => {
    let messages = [...this.state.messages];
    messages = messages.map(message => {
      if(message.id === id) {
        return {...message, isVisible: false};
      }
      return message;
    });
    this.setState({ messages }, () => {
      this.transitionTimers[id] = setTimeout(() => {
        this.fakeHideTransition(id);
        clearTimeout(this.transitionTimers[id]);
        delete this.transitionTimers[id];
        cb && cb();
      }, 500)
    });
  };

  /**
   * showMessageBar
   * displays the message at the bottom
   *
   * @param message - message to be displayed
   * @param newState - new state returned from getNewState based on the options
   */
  showMessageBar = (message, newState) => {
    let messages = [...this.state.messages];
    if (messages.length >= 5) {
      this.hideMessageBar(messages[0].id, () => {
        let messages = [...this.state.messages];
        this.setState({ messages: [...messages, { message, ...newState}] }, () => {
          this.transitionTimers[newState.id] = setTimeout(() => {
            this.fakeShowTransition(newState.id);
            this.timers[newState.id] = setTimeout(() => {
              this.hideMessageBar(newState.id);
            }, newState.displayTime);
            clearTimeout(this.transitionTimers[newState.id]);
            delete this.transitionTimers[newState.id];
          }, 200)
        });
      });
      return newState.id;
    } else {
      this.setState({ messages: [...messages, { message, ...newState}] }, () => {
        this.transitionTimers[newState.id] = setTimeout(() => {
          this.fakeShowTransition(newState.id);
          this.timers[newState.id] = setTimeout(() => {
            this.hideMessageBar(newState.id);
          }, newState.displayTime);
          clearTimeout(this.transitionTimers[newState.id]);
          delete this.transitionTimers[newState.id];
        }, 200)
      });
      return newState.id;
    }
  };

  getConfigStyles = (isError) => {
    const { configs } = this.props;
    if (!configs || typeof configs !== 'object' || !Object.keys(configs).length) {
      return {};
    }
    let configStyles = {};
    if (isError) {
      if (configs.errorBackgroundColor) {
        configStyles.backgroundColor = configs.errorBackgroundColor;
      }
      if (configs.errorTextColor) {
        configStyles.color = configs.errorTextColor;
      }
    } else {
      if (configs.successBackgroundColor) {
        configStyles.backgroundColor = configs.successBackgroundColor;
      }
      if (configs.successTextColor) {
        configStyles.color = configs.successTextColor;
      }
    }

    return configStyles;
  };

  /**
   * fakeShowTransition
   * used to create animations when displaying the messages.
   *
   * @param id
   */
  fakeShowTransition = (id) => {
    let messages = [...this.state.messages];
    messages = messages.map(message => {
      if(message.id === id) {
        message.isVisible = true;
      }
      return message;
    });
    this.setState({ messages });
  };

  /**
   * fakeShowTransition
   * used to create animations when hiding the messages.
   *
   * @param id
   */
  fakeHideTransition = (id) => {
    let messages = [...this.state.messages];
    messages = messages.filter(message => {
      if(message.id === id) {
        clearTimeout(this.timers[id]);
        delete this.timers[id];
        return false;
      }
      return true;
    });
    this.setState({ messages, separator: this.getSeparator() });
  };

  getSeparator = () => (Math.floor(Math.random() * 100000));

  render() {
    const { children, desktopView } = this.props;
    const { messages, separator } = this.state;
    const messageClass = `${desktopView ? 'mm-message-open-desktop' : ''} mm-message mm-message-open`;
    const styles = getStyles(desktopView);
    return (
      <div className="mm-container">
        {children}
        <div className={messageClass} style={styles.messageContainer}>
          {
            messages.map((messageProps, index) => {
              const {showMessage, message, isError, icon, closeButtonText, id} = messageProps;
              const textContainerStyle = `mm-text-container-outer ${desktopView ? 'text-container-desktop' : ''} ${isError ? ' mm-message-error' : ''}`;
              let baseStyles = {...styles.textBase};
              const configStyles = this.getConfigStyles(isError);
              baseStyles = {...baseStyles, ...configStyles};
              let baseStylesInvisible = {...styles.textBaseInvisible};
              const iconStyles = {...styles.icon};
              const messageStyles = {...styles.message};
              if (icon && icon.trim() === 'mm-icon') {
                if (iconStyles.width) {
                  iconStyles.width = 0;
                }
                if (messageStyles.maxWidth) {
                  messageStyles.maxWidth = '95%';
                }
              }
              let transitionStyles = {};
              if (desktopView) {
                transitionStyles = transitionStylesDesktop;
              } else {
                transitionStyles = transitionStylesMobile;
              }
              if (isError) {
                baseStyles = { ...baseStyles, ...styles.errorBase };
                baseStylesInvisible = { ...baseStylesInvisible, ...styles.errorBase };
              }
              if (messageProps.isVisible) {
                baseStyles = { ...baseStyles, ...transitionStyles.final};
                baseStylesInvisible = { ...baseStylesInvisible, ...transitionStyles.final };
              }
              return (
                <div
                  key={`mm_key_${separator}_${index}`}
                  className={textContainerStyle}
                  style={{...baseStyles}}
                >
                  <div style={styles.textContainer}>
                    <div style={styles.text}>
                      <i style={iconStyles} className={icon} />
                      <span style={messageStyles} dangerouslySetInnerHTML={{__html: message}}/>
                    </div>
                    <i
                      style={styles.crossIcon}
                      className="crossMark"
                      onClick={() => this.hideMessageBar(id)}
                    >
                      &#10005;
                    </i>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
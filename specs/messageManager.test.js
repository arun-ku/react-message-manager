import React from 'react';
import { mount, shallow } from 'enzyme';
import { MessageManagerProvider, injectMessageManager } from '../MessageManager/index';

describe('<MessageManager /> test cases', () => {
  test('Checks if message manager outer container is created', () => {
    const wrapper = shallow(
      <MessageManagerProvider>
        <div />
      </MessageManagerProvider>
    );
    expect(wrapper.find('.mm-container').length).toBe(1);
    expect(wrapper.find('.mm-message.mm-message-open').length).toBe(1);
  });

  test('Checks if mobile view is rendered properly', () => {
    const wrapper = shallow(
      <MessageManagerProvider>
        <div />
      </MessageManagerProvider>
    );
    expect(wrapper.find('.mm-message-open-desktop').length).toBe(0);
  });

  test('Checks if desktop view is rendered properly', () => {
    const wrapper = shallow(
      <MessageManagerProvider desktopView>
        <div />
      </MessageManagerProvider>
    );
    expect(wrapper.find('.mm-message-open-desktop').length).toBe(1);
  });

  it('checks if div inside message manger is getting rendered', () => {
    const wrapper = mount(
      <MessageManagerProvider>
        <div className="test-container"></div>
      </MessageManagerProvider>
    );
    expect(wrapper.contains(<div className="test-container"></div>)).toBe(true);
  });

  it('checks if showSuccessMessage is getting called properly', () => {
    const wrapper = shallow(
      <MessageManagerProvider />
    );
    wrapper.instance().showSuccessMessage('Test Message', {
      displayTime: 1000,
      iconClass: 'test-class',
      showCloseButton: true,
      closeButtonText: 'test text',
      onClose: () => {},
    });
  });

  it('checks if showErrorMessage is getting called properly', () => {
    const wrapper = shallow(
      <MessageManagerProvider />
    );
    wrapper.instance().showErrorMessage('Test Message', {
      displayTime: 1000,
      iconClass: 'test-class',
      showCloseButton: true,
      onClose: () => {},
    });
  });

  it('checks if hideMessageBar is getting called properly', () => {
    const wrapper = shallow(
      <MessageManagerProvider />
    );
    wrapper.setState({onClose: () => {}})
    wrapper.instance().hideMessageBar();
  });

  it('checks if showMessageBar is getting called properly', () => {
    const wrapper = mount(
      <MessageManagerProvider />
    );
    jest.useFakeTimers();
    wrapper.setState({onClose: () => {}})
    wrapper.instance().showMessageBar('Test Message', { displayTime: 1000 });
    jest.runAllTimers();
  });

  it('checks if showMessageBar is getting called properly when there are 5 messages', () => {
    const wrapper = mount(
      <MessageManagerProvider />
    );
    jest.useFakeTimers();
    wrapper.setState({messages: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]})
    wrapper.instance().showMessageBar('Test Message', { displayTime: 1000 });
    jest.runAllTimers();
  });

  it('calls the default configs function', () => {
    const configs = {
      successBackgroundColor: 'green',
      successTextColor: 'red',
      errorBackgroundColor: 'red',
      errorTextColor: 'grey',
      defaultSuccessIconClass: 'icon',
      defaultErrorIconClass: 'icon',
    };
    const wrapper = mount(
      <MessageManagerProvider configs={configs}/>
    );
    wrapper.instance().showMessageBar('Test Message', { displayTime: 1000 });
    wrapper.instance().showMessageBar('Test Message', { displayTime: 1000, isError: true });
  });

  it('apply desktop transition styles in desktop view', () => {
    const wrapper = mount(
      <MessageManagerProvider desktopView />
    );
    wrapper.instance().showMessageBar('Test Message', { displayTime: 1000 });
  });

  it('applies the injectMessageManager HOC', () => {
    const InjectedComponent = injectMessageManager(MessageManagerProvider);
    const wrapper = mount(
      <InjectedComponent />
    );
  });
});
import React from 'react';
import { render } from 'react-dom';
import { MessageManagerProvider } from 'message-manager';

import App from './App';

const elem = document.getElementById('app');

render(
  <MessageManagerProvider isDesktop>
    <App />
  </MessageManagerProvider>,
  elem
);
import React from 'react';
import { render } from 'react-dom';
import { MessageManagerProvider } from 'message-manager';

import App from './App';

const elem = document.getElementById('app');
let desktopView = true;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  desktopView = false;
}

render(
  <MessageManagerProvider desktopView={desktopView}>
    <App isDesktop={desktopView} />
  </MessageManagerProvider>,
  elem
);
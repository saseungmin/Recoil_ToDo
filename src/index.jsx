import React from 'react';

import ReactDOM from 'react-dom';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import App from './App';

import './assets/css/global.css';

ReactDOM.render(
  (
    <RecoilRoot>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <App />
      </SnackbarProvider>
    </RecoilRoot>
  ),
  document.getElementById('app'),
);

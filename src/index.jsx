import React, { Suspense } from 'react';

import ReactDOM from 'react-dom';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import App from './App';

import './assets/css/global.css';

ReactDOM.render(
  (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </RecoilRoot>
  ),
  document.getElementById('app'),
);

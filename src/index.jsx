import React from 'react';

import ReactDOM from 'react-dom';

import { RecoilRoot } from 'recoil';

import App from './App';

import './assets/css/global.css';

ReactDOM.render(
  (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  ),
  document.getElementById('app'),
);

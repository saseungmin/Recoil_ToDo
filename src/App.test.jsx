import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <RecoilRoot>
      <App />
    </RecoilRoot>
  ));

  it('renders App text', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('What are your plans for today?');
  });
});

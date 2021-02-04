import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import InjectTestingRecoilState from './components/common/InjectTestingRecoilState';

import App from './App';

describe('App', () => {
  const renderApp = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        state={state}
      />
      <App />
    </RecoilRoot>
  ));

  it('renders App text', () => {
    const initialState = [
      { id: 1, task: '할 일1', isComplete: false },
    ];

    const { container } = renderApp(initialState);

    expect(container).toHaveTextContent('What are your plans for today?');
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import App from './App';
import InjectTestingRecoilState from './components/common/InjectTestingRecoilState';

describe('App', () => {
  const renderApp = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
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
    expect(container).toHaveTextContent('All');
    expect(container).toHaveTextContent('할 일1');
  });

  describe("render according to todo's filter state", () => {
    const initialState = [
      { id: 1, task: '할 일1', isComplete: false },
      { id: 2, task: '할 일2', isComplete: true },
    ];
    it('When the filter is All', () => {
      const { container, getByText } = renderApp(initialState);

      fireEvent.click(getByText('All'));

      expect(container).toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');
    });

    it('When the filter is Active', () => {
      const { container, getByText } = renderApp(initialState);

      fireEvent.click(getByText('Active'));

      expect(container).toHaveTextContent('할 일1');
      expect(container).not.toHaveTextContent('할 일2');
    });

    it('When the filter is Completed', () => {
      const { container, getByText } = renderApp(initialState);

      fireEvent.click(getByText('Completed'));

      expect(container).not.toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');
    });
  });
});

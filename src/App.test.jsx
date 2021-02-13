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
      { id: '1', task: '할 일1', isComplete: true },
    ];

    const { container } = renderApp(initialState);

    expect(container).toHaveTextContent('What are your plans for today?');
    expect(container).toHaveTextContent('ALL');
    expect(container).toHaveTextContent('할 일1');
    expect(container).toHaveTextContent('CLEAR COMPLETED');
  });

  describe("render according to todo's filter state", () => {
    const initialState = [
      { id: '1', task: 'some task', isComplete: false },
      { id: '2', task: '할 일2', isComplete: true },
    ];
    it('When the filter is ALL', () => {
      const { container, getByText } = renderApp(initialState);

      fireEvent.click(getByText('ALL'));

      expect(container).toHaveTextContent('some task');
      expect(container).toHaveTextContent('할 일2');
    });

    it('When the filter is ACTIVE', () => {
      const { container, getByText } = renderApp(initialState);

      fireEvent.click(getByText('ACTIVE'));

      expect(container).toHaveTextContent('some task');
      expect(container).not.toHaveTextContent('할 일2');
    });

    it('When the filter is COMPLETED', () => {
      const { container, getByText } = renderApp(initialState);

      fireEvent.click(getByText('COMPLETED'));

      expect(container).not.toHaveTextContent('some task');
      expect(container).toHaveTextContent('할 일2');
    });
  });

  it('When you click the Clear completed button, the completed todo is deleted.', () => {
    const initialState = [
      { id: '1', task: '할 일1', isComplete: true },
    ];

    const { container, getByText } = renderApp(initialState);

    expect(container).toHaveTextContent('할 일1');

    fireEvent.click(getByText('CLEAR COMPLETED'));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

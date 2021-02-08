import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import TodoSubInfo from './TodoSubInfo';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoSubInfo', () => {
  const renderTodoSubInfo = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
      />
      <TodoSubInfo />
    </RecoilRoot>
  ));

  const initialState = [
    { id: 1, task: '할 일1', isComplete: false },
    { id: 2, task: '할 일2', isComplete: true },
  ];

  it('render sub info bar content', () => {
    const { container } = renderTodoSubInfo(initialState);

    expect(container).toHaveTextContent('All');
    expect(container).toHaveTextContent('Active');
    expect(container).toHaveTextContent('Completed');
    expect(container).toHaveTextContent('Clear completed');
  });

  it('Click filter buttons call event set value', () => {
    const { getByText } = renderTodoSubInfo(initialState);

    fireEvent.click(getByText('Active'));
  });
});

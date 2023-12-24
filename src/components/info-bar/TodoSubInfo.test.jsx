import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent, screen } from '@testing-library/react';

import { todoResultState } from '../../../fixtures/recoil-atom-state';

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

  const initialState = {
    ...todoResultState,
    todos: [
      { id: 1, task: '할 일1', isComplete: false },
      { id: 2, task: '할 일2', isComplete: true },
    ],
  };

  it('render sub info bar content', () => {
    const { container } = renderTodoSubInfo(initialState);

    expect(container).toHaveTextContent('ALL');
    expect(container).toHaveTextContent('ACTIVE');
    expect(container).toHaveTextContent('COMPLETED');
    expect(container).toHaveTextContent('CLEAR COMPLETED');
  });

  it('Click filter buttons call event set value', () => {
    const { container } = renderTodoSubInfo(initialState);

    fireEvent.click(screen.getByText('ACTIVE'));

    expect(container).toHaveTextContent('ACTIVE');
  });
});

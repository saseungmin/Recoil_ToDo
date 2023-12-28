import React from 'react';

import { render, screen } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { todoResultState } from '../../../fixtures/recoil-atom-state';

import TodoStats from './TodoStats';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoStats', () => {
  const renderTodoStats = (state: any) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
      />
      <TodoStats />
    </RecoilRoot>
  ));

  it("renders todo's stats", () => {
    const initialState = {
      ...todoResultState,
      todos: [
        { id: 1, task: 'some tasks', isComplete: false },
        { id: 2, task: 'some tasks', isComplete: true },
        { id: 3, task: 'some tasks', isComplete: true },
      ],
    };

    renderTodoStats(initialState);

    expect(screen.getByTestId('active')).toHaveTextContent('1');
    expect(screen.getByTestId('completed')).toHaveTextContent('2');
  });
});

import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';
import TodoStats from './TodoStats';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';
import { todoResultState } from '../../../fixtures/recoil-atom-state';

describe('TodoStats', () => {
  const renderTodoStats = (state) => render((
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

    const { getByTestId } = renderTodoStats(initialState);

    expect(getByTestId('active')).toHaveTextContent('1');
    expect(getByTestId('completed')).toHaveTextContent('2');
  });
});

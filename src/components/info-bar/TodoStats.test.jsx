import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';
import TodoStats from './TodoStats';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

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
    const initialState = [
      { id: 1, task: 'some tasks', isComplete: false },
      { id: 2, task: 'some tasks', isComplete: true },
      { id: 3, task: 'some tasks', isComplete: true },
    ];

    const { getByTestId } = renderTodoStats(initialState);

    expect(getByTestId('active')).toHaveTextContent('1');
    expect(getByTestId('completed')).toHaveTextContent('2');
  });
});

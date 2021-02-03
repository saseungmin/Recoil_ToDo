import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

import TodoList from './TodoList';

describe('TodoList', () => {
  const renderTodoList = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState state={state} />
      <TodoList />
    </RecoilRoot>
  ));

  context('with tasks', () => {
    const initialState = [
      { id: 1, task: '할 일1', isComplete: false },
      { id: 2, task: '할 일2', isComplete: true },
    ];
    it('render todo list contents', () => {
      const { container } = renderTodoList(initialState);

      initialState.forEach(({ task }) => {
        expect(container).toHaveTextContent(task);
      });
    });
  });

  context('without tasks', () => {
    const initialState = [];
    it('renders message "할 일이 없어요!"', () => {
      const { container } = renderTodoList(initialState);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});

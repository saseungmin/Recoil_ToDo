import React from 'react';

import { render } from '@testing-library/react';

import TodoList from './TodoList';

describe('TodoList', () => {
  const renderTodoList = (tasks) => render((
    <TodoList tasks={tasks} />
  ));

  context('with tasks', () => {
    const tasks = [
      { id: 1, task: '할 일1' },
      { id: 2, task: '할 일2' },
    ];
    it('render todo list contents', () => {
      const { container } = renderTodoList(tasks);

      tasks.forEach(({ task }) => {
        expect(container).toHaveTextContent(task);
      });
    });
  });

  context('without tasks', () => {
    const tasks = [];
    it('renders message "할 일이 없어요!"', () => {
      const { container } = renderTodoList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});

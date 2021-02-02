import React from 'react';

import { render } from '@testing-library/react';

import Todo from './Todo';

describe('Todo', () => {
  const renderTodo = (task) => render(<Todo task={task} />);

  it('render todo contents', () => {
    const task = '할 일1';

    const { container } = renderTodo(task);

    expect(container).toHaveTextContent(task);
  });
});

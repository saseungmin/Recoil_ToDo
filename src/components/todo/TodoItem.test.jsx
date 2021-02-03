import React from 'react';

import { render } from '@testing-library/react';

import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const renderTodoItem = (item) => render((
    <TodoItem item={item} />
  ));

  it('render todo contents', () => {
    const item = {
      task: '할 일1',
      isComplete: false,
    };

    const { container } = renderTodoItem(item);

    expect(container).toHaveTextContent(item.task);
  });
});

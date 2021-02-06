import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import TodoItemView from './TodoItemView';

describe('TodoItemView', () => {
  const handleRemove = jest.fn();
  const handleToggle = jest.fn();
  const handleDoubleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTodoItemView = (item) => render((
    <TodoItemView
      item={item}
      onRemove={handleRemove}
      onToggle={handleToggle}
      onDoubleClick={handleDoubleClick}
    />
  ));

  const item = {
    id: '1',
    task: 'some task',
    isComplete: false,
  };

  it('click remove button', () => {
    const { getByText } = renderTodoItemView(item);

    fireEvent.click(getByText('X'));

    expect(handleRemove).toBeCalled();
  });

  it('Click to checkbox', () => {
    const { getByTestId } = renderTodoItemView(item);

    fireEvent.click(getByTestId('todo-item'));

    expect(handleToggle).toBeCalled();
  });

  it('Double Click to todo text', () => {
    const { getByText } = renderTodoItemView(item);

    fireEvent.doubleClick(getByText('some task'));

    expect(handleDoubleClick).toBeCalled();
  });
});

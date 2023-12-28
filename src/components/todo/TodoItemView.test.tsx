import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import TodoItemView from './TodoItemView';
import { Todo } from 'src/recoil/todos/atom';

describe('TodoItemView', () => {
  const handleRemove = jest.fn();
  const handleToggle = jest.fn();
  const handleShowEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTodoItemView = ({ item, width }: { item: any; width?: string | number}) => render((
    <ResponsiveContext.Provider value={{ width }}>
      <TodoItemView
        item={item}
        onRemove={handleRemove}
        onToggle={handleToggle}
        onShowEdit={handleShowEdit}
      />
    </ResponsiveContext.Provider>
  ));

  const initialState = (width: string | number) => ({
    item: {
      id: '1',
      task: 'some task',
      isComplete: false,
    },
    width,
  });

  const isDesktopState = initialState(700);
  const isMobileState = initialState(400);

  it('renders todo item view', () => {
    const { container } = renderTodoItemView(isDesktopState);

    expect(container).toHaveTextContent('some task');
    expect(container).toHaveTextContent('수정하려면 더블 클릭해주세요!');
  });

  it('click remove button', () => {
    renderTodoItemView(isDesktopState);

    fireEvent.click(screen.getByTestId('todo-delete'));

    expect(handleRemove).toHaveBeenCalled();
  });

  it('Click to checkbox', () => {
    renderTodoItemView(isDesktopState);

    fireEvent.click(screen.getByTestId('todo-item'));

    expect(handleToggle).toHaveBeenCalled();
  });

  describe('renders edit input', () => {
    context('is desktop', () => {
      it('When double-clicked, the function is call.', () => {
        renderTodoItemView(isDesktopState);

        fireEvent.doubleClick(screen.getByText('some task'));

        expect(handleShowEdit).toHaveBeenCalled();
      });
    });

    context('is mobile', () => {
      it('When Click the pencil icon calls the function.', () => {
        renderTodoItemView(isMobileState);

        fireEvent.doubleClick(screen.getByText('some task'));

        expect(handleShowEdit).not.toHaveBeenCalled();

        fireEvent.click(screen.getByTestId('todo-edit-icon'));

        expect(handleShowEdit).toHaveBeenCalled();
      });
    });
  });
});

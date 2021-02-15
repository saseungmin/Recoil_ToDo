import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import TodoItemView from './TodoItemView';

describe('TodoItemView', () => {
  const handleRemove = jest.fn();
  const handleToggle = jest.fn();
  const handleShowEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTodoItemView = ({ item, width }) => render((
    <ResponsiveContext.Provider value={{ width }}>
      <TodoItemView
        item={item}
        onRemove={handleRemove}
        onToggle={handleToggle}
        onShowEdit={handleShowEdit}
      />
    </ResponsiveContext.Provider>
  ));

  const initialState = (width) => ({
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
    const { getByTestId } = renderTodoItemView(isDesktopState);

    fireEvent.click(getByTestId('todo-delete'));

    expect(handleRemove).toBeCalled();
  });

  it('Click to checkbox', () => {
    const { getByTestId } = renderTodoItemView(isDesktopState);

    fireEvent.click(getByTestId('todo-item'));

    expect(handleToggle).toBeCalled();
  });

  describe('renders edit input', () => {
    context('is desktop', () => {
      it('When double-clicked, the function is call.', () => {
        const { getByText } = renderTodoItemView(isDesktopState);

        fireEvent.doubleClick(getByText('some task'));

        expect(handleShowEdit).toBeCalled();
      });
    });

    context('is mobile', () => {
      it('When Click the pencil icon calls the function.', () => {
        const { getByTestId, getByText } = renderTodoItemView(isMobileState);

        fireEvent.doubleClick(getByText('some task'));

        expect(handleShowEdit).not.toBeCalled();

        fireEvent.click(getByTestId('todo-edit-icon'));

        expect(handleShowEdit).toBeCalled();
      });
    });
  });
});

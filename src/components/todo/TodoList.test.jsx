import React from 'react';

import { render, fireEvent } from '@testing-library/react';

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
      { id: 2, task: '할 일2', isComplete: false },
    ];
    it('render todo list contents', () => {
      const { container } = renderTodoList(initialState);

      initialState.forEach(({ task }) => {
        expect(container).toHaveTextContent(task);
      });
    });

    it('click remove button call handleRemove and remove todoItem', () => {
      const { container, getAllByText } = renderTodoList(initialState);

      getAllByText('X').forEach((button) => {
        fireEvent.click(button);
      });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('should todo completed checked checkbox', () => {
      const { getAllByTestId } = renderTodoList(initialState);

      getAllByTestId('todo-item').forEach((checkbox) => {
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
      });
    });

    describe('Change edit todo span text', () => {
      const state = [
        { id: '1', task: 'some task', isComplete: true },
      ];

      context('with Enter key', () => {
        const value = 'tasks';
        it('Call handleChangeEdit and then Call handleSubmitEdit', () => {
          const { container, getByTestId } = renderTodoList(state);

          fireEvent.doubleClick(getByTestId('todo-span'));

          const input = getByTestId('todo-edit-input');

          fireEvent.change(input, {
            target: { value },
          });

          fireEvent.keyPress(input, {
            key: 'Enter',
            code: 13,
            charCode: 13,
          });

          expect(container).toHaveTextContent(value);
        });
      });

      context('without Enter Key', () => {
        const value = 'tasks';
        it('Call handleChangeEdit and then Call handleSubmitEdit', () => {
          const { container, getByTestId } = renderTodoList(state);

          fireEvent.doubleClick(getByTestId('todo-span'));

          const input = getByTestId('todo-edit-input');

          fireEvent.change(input, {
            target: { value },
          });

          fireEvent.keyPress(input, {
            key: 'space',
            code: 32,
            charCode: 32,
          });

          expect(container).not.toHaveTextContent(value);
        });
      });
    });

    describe('When the edit input loses focus', () => {
      const state = (task) => ([{
        id: '1',
        task,
        isComplete: true,
      }]);

      context('without task in edit input', () => {
        it('remove to todo', () => {
          const { container, getByTestId } = renderTodoList(state(''));

          fireEvent.doubleClick(getByTestId('todo-span'));

          const input = getByTestId('todo-edit-input');

          expect(input).toHaveFocus();

          fireEvent.blur(input);

          expect(container).toHaveTextContent('할 일이 없어요!');
        });
      });

      context('with task in edit input', () => {
        it('call edit blur event', () => {
          const { container, getByTestId } = renderTodoList(state('some task'));

          fireEvent.doubleClick(getByTestId('todo-span'));

          const input = getByTestId('todo-edit-input');

          expect(input).toHaveFocus();

          fireEvent.blur(input);

          expect(input).not.toHaveFocus();

          expect(container).toHaveTextContent('some task');
        });
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

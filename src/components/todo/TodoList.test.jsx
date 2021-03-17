import React from 'react';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { todoResultState } from '../../../fixtures/recoil-atom-state';

import TodoList from './TodoList';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoList', () => {
  const renderTodoList = (filter = 'ALL') => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={given.todos}
        filter={filter}
      />
      <TodoList />
    </RecoilRoot>
  ));

  context('with todos', () => {
    describe('When there are multiple todos', () => {
      const todos = [
        { _id: '1', task: '할 일1', isComplete: false },
        { _id: '2', task: '할 일2', isComplete: false },
      ];

      given('todos', () => ({
        ...todoResultState,
        todos,
      }));

      it('render todo list contents', () => {
        const { container } = renderTodoList();

        todos.forEach(({ task }) => {
          expect(container).toHaveTextContent(task);
        });
      });

      it('click remove button call handleRemove and remove todoItem', async () => {
        const { container, getAllByTestId } = renderTodoList();

        await act(async () => {
          getAllByTestId('todo-delete').forEach((button) => {
            fireEvent.click(button);
          });
        });

        expect(container).toHaveTextContent('할 일이 없어요!');
      });

      it('should todo completed change style', () => {
        const { getAllByTestId } = renderTodoList();

        getAllByTestId('todo-item').forEach((checkbox) => {
          fireEvent.click(checkbox);
        });

        getAllByTestId('todo-text').forEach((todo) => {
          expect(todo).toHaveStyle('text-decoration: line-through;');
        });
      });
    });

    describe('Change edit todo text', () => {
      const todo = [
        { _id: '1', task: 'some task', isComplete: true },
      ];

      given('todos', () => ({
        ...todoResultState,
        todos: todo,
      }));

      context('with Enter key', () => {
        const value = 'tasks';
        it('Call handleChangeEdit and then Call handleSubmitEdit', () => {
          const { container, getByTestId } = renderTodoList();

          fireEvent.doubleClick(getByTestId('todo-text'));

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
          const { container, getByTestId } = renderTodoList();

          fireEvent.doubleClick(getByTestId('todo-text'));

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
      const setTodos = (task) => ([{
        _id: '1',
        task,
        isComplete: true,
      }]);

      context('without task in edit input', () => {
        given('todos', () => ({
          ...todoResultState,
          todos: setTodos(''),
        }));

        it('remove to todo', async () => {
          const { container, getByTestId } = renderTodoList();

          fireEvent.doubleClick(getByTestId('todo-text'));

          const input = getByTestId('todo-edit-input');

          expect(input).toHaveFocus();

          await act(async () => {
            fireEvent.blur(input);
          });

          expect(container).toHaveTextContent('할 일이 없어요!');
        });
      });

      context('with task in edit input', () => {
        given('todos', () => ({
          ...todoResultState,
          todos: setTodos('some task'),
        }));

        it('call edit blur event', () => {
          const { container, getByTestId } = renderTodoList();

          fireEvent.doubleClick(getByTestId('todo-text'));

          const input = getByTestId('todo-edit-input');

          expect(input).toHaveFocus();

          fireEvent.blur(input);

          expect(input).not.toHaveFocus();

          expect(container).toHaveTextContent('some task');
        });
      });
    });

    describe('When filter todos is empty', () => {
      const todos = [
        { _id: '1', task: 'some task', isComplete: true },
      ];

      given('todos', () => ({
        ...todoResultState,
        todos,
      }));

      it('renders empty messages', () => {
        const { container } = renderTodoList('ACTIVE');

        expect(container).toHaveTextContent('모든 할 일을 완료했네요!');
      });
    });
  });

  context('without todos', () => {
    given('todos', () => (todoResultState));
    it('renders message "할 일이 없어요!"', () => {
      const { container } = renderTodoList();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});

/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { render, fireEvent, act } from '@testing-library/react';

import { todoResultState, userState } from '../../../fixtures/recoil-atom-state';

import TodoList from './TodoList';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoList', () => {
  const renderTodoList = (filter = 'ALL', user = userState) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        user={user}
        todos={given.todos}
        filter={filter}
      />
      <TodoList />
    </RecoilRoot>
  ));

  const mockGetApi = (data: any) => (mockAxios.get as jest.Mock).mockRejectedValueOnce(data);

  const mockPatchApi = (data: any) => (mockAxios.patch as jest.Mock).mockResolvedValueOnce({
    data,
  });

  context('with todos', () => {
    describe('When there are todos', () => {
      const todos = [
        { _id: '1', task: '할 일1', isComplete: false },
      ];

      given('todos', () => ({
        ...todoResultState,
        todos,
      }));

      it('click remove button call handleRemove and remove todoItem', async () => {
        const { container, getByTestId } = renderTodoList();

        await act(async () => {
          fireEvent.click(getByTestId('todo-delete'));
        });

        expect(container).toHaveTextContent('할 일이 없어요!');
      });

      it('should todo is completed, Change font style', async () => {
        mockPatchApi({ _id: '1', task: '할 일1', isComplete: true });

        const { getByTestId } = renderTodoList();

        await act(async () => {
          fireEvent.click(getByTestId('todo-item'));
        });

        expect(getByTestId('todo-text')).toHaveStyle('text-decoration: line-through;');
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
        it('Call handleChangeEdit and then Call handleSubmitEdit', async () => {
          mockPatchApi({ _id: '1', task: value, isComplete: true });

          const { container, getByTestId } = renderTodoList();

          await act(async () => {
            fireEvent.doubleClick(getByTestId('todo-text'));
          });

          const input = getByTestId('todo-edit-input');

          await act(async () => {
            fireEvent.change(input, {
              target: { value },
            });

            fireEvent.keyPress(input, {
              key: 'Enter',
              code: 13,
              charCode: 13,
            });
          });

          expect(container).toHaveTextContent(value);
        });
      });

      context('without Enter Key', () => {
        const value = 'tasks';
        it('Call handleChangeEdit and then Call handleSubmitEdit', async () => {
          const { container, getByTestId } = renderTodoList();

          await act(async () => {
            fireEvent.doubleClick(getByTestId('todo-text'));
          });

          const input = getByTestId('todo-edit-input');

          await act(async () => {
            fireEvent.change(input, {
              target: { value },
            });

            fireEvent.keyPress(input, {
              key: 'space',
              code: 32,
              charCode: 32,
            });
          });

          expect(container).not.toHaveTextContent(value);
        });
      });
    });

    describe('When the edit input loses focus', () => {
      const setTodos = (task: string) => ([{
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

          await act(async () => {
            fireEvent.doubleClick(getByTestId('todo-text'));
          });

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

        it('call edit blur event', async () => {
          const { container, getByTestId } = renderTodoList();

          await act(async () => {
            fireEvent.doubleClick(getByTestId('todo-text'));
          });

          const input = getByTestId('todo-edit-input');

          expect(input).toHaveFocus();

          await act(async () => {
            fireEvent.blur(input);
          });

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

    it("Fail load To-do's", async () => {
      const mockError = {
        response: {
          status: 400,
        },
      };

      mockGetApi(mockError);

      let response;

      await act(async () => {
        response = renderTodoList('ALL', { user: 'test', checkError: null });
      });

      expect((response as any).container).toHaveTextContent('할 일이 없어요!');
    });
  });
});

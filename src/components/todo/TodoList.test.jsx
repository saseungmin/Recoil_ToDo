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
      const value = [
        { task: 'some task', key: 'Enter' },
        { task: '', key: '1' },
      ];
      it('Call handleChangeEdit and then Call handleSubmitEdit', () => {
        const { getAllByTestId } = renderTodoList(initialState);

        getAllByTestId('todo-edit-input').forEach((input, index) => {
          fireEvent.change(input, {
            target: { value: value[index].task },
          });

          fireEvent.keyPress(input, {
            key: value[index].key,
            code: 13,
            charCode: 13,
          });
        });

        getAllByTestId('todo-span').forEach((span, index) => {
          expect(span).toHaveTextContent(value[index].task);
        });
      });
    });

    describe('When the edit input loses focus', () => {
      context('without task in edit input', () => {
        it('remove to todo', () => {
          const state = [{
            id: '1',
            task: '',
            isComplete: true,
          }];

          const { container, getByTestId } = renderTodoList(state);

          fireEvent.blur(getByTestId('todo-edit-input'));

          expect(container).toHaveTextContent('할 일이 없어요!');
        });
      });

      context('with task in edit input', () => {
        it('call edit blur event', () => {
          const { getAllByTestId } = renderTodoList(initialState);

          getAllByTestId('todo-edit-input').forEach((input) => {
            fireEvent.blur(input);

            expect(input).not.toHaveFocus();
          });
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

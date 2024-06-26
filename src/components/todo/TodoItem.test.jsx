import React from 'react';

import { RecoilRoot } from 'recoil';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import mockAxios from 'axios';

import TodoItem from './TodoItem';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoItem', () => {
  const renderTodoItem = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={given.todos}
      />
      <TodoItem
        item={state}
      />
    </RecoilRoot>
  ));

  describe('renders todo item contents', () => {
    const state = {
      id: '1',
      task: '할 일1',
      isComplete: false,
    };

    context('with visible todo contents', () => {
      it("doesn't span double click", () => {
        const { container, getByTestId } = renderTodoItem(state);

        expect(container).toHaveTextContent(state.task);
        expect(getByTestId('todo-delete')).not.toBeNull();
        expect(getByTestId('todo-item')).not.toBeNull();
      });
    });

    context('without visible todo contents', () => {
      it('todo double click so, renders edit input', () => {
        const { getByTestId } = renderTodoItem(state);

        fireEvent.doubleClick(getByTestId('todo-text'));

        expect(getByTestId('todo-edit-input')).not.toBeNull();
      });
    });
  });

  describe('Change focus for edit when double clicking todo text', () => {
    const state = {
      id: '1',
      task: '할 일1',
      isComplete: true,
    };

    it('Call onDoubleClick', () => {
      const { getByTestId } = renderTodoItem(state);

      fireEvent.doubleClick(getByTestId('todo-text'));

      expect(getByTestId('todo-edit-input')).toHaveFocus();
    });
  });

  describe('Action Fail Status', () => {
    const error = {
      response: {
        status: 400,
      },
    };

    const state = {
      id: '1',
      task: '할 일1',
      isComplete: false,
    };

    describe('Fail todo delete', () => {
      mockAxios.delete.mockRejectedValueOnce(error);

      it('The to-do should not be deleted.', async () => {
        const { container, getByTestId } = renderTodoItem(state);

        await act(async () => {
          fireEvent.click(getByTestId('todo-delete'));
        });

        expect(container).toHaveTextContent(state.task);
      });
    });

    describe('Fail todo update', () => {
      beforeEach(() => {
        mockAxios.patch.mockRejectedValueOnce(error);
      });

      it('The to-do should not be updated, the style has not changed. With Checkbox', async () => {
        const { getByTestId } = renderTodoItem(state);

        await act(async () => {
          fireEvent.click(getByTestId('todo-item'));
        });

        expect(getByTestId('todo-text')).not.toHaveStyle('text-decoration: line-through;');
      });

      it("The value doesn't change because the to-do was not updated. With task input", async () => {
        const { container, getByTestId } = renderTodoItem(state);

        await act(async () => {
          fireEvent.doubleClick(getByTestId('todo-text'));
        });

        const input = getByTestId('todo-edit-input');

        await act(async () => {
          fireEvent.change(input, {
            target: { value: 'task' },
          });

          fireEvent.keyPress(input, {
            key: 'Enter',
            code: 13,
            charCode: 13,
          });
        });

        expect(container).toHaveTextContent('할 일1');
      });
    });
  });
});

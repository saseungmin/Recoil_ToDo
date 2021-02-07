import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import TodoItem from './TodoItem';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoItem', () => {
  const renderTodoItem = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
      />
      <TodoItem
        item={state[0]}
      />
    </RecoilRoot>
  ));

  describe('renders todo item contents', () => {
    const state = [{
      id: '1',
      task: '할 일1',
      isComplete: false,
    }];

    context('with visible todo contents', () => {
      it("doesn't span double click", () => {
        const { container, getByText, getByTestId } = renderTodoItem(state);

        expect(container).toHaveTextContent(state[0].task);
        expect(getByText('X')).not.toBeNull();
        expect(getByTestId('todo-item')).not.toBeNull();
      });
    });

    context('without visible todo contents', () => {
      it('span double click so, renders edit input', () => {
        const { getByTestId } = renderTodoItem(state);

        fireEvent.doubleClick(getByTestId('todo-span'));

        expect(getByTestId('todo-edit-input')).not.toBeNull();
      });
    });
  });

  describe('Change focus for edit when double clicking todo text', () => {
    it('Call onDoubleClick', () => {
      const state = [{
        id: '1',
        task: '할 일1',
        isComplete: true,
      }];

      const { getByTestId } = renderTodoItem(state);

      fireEvent.doubleClick(getByTestId('todo-span'));

      expect(getByTestId('todo-edit-input')).toHaveFocus();
    });
  });
});

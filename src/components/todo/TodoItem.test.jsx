import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const renderTodoItem = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        state={state}
      />
      <TodoItem
        item={state[0]}
      />
    </RecoilRoot>
  ));

  it('render todo contents', () => {
    const state = [{
      id: '1',
      task: '할 일1',
      isComplete: false,
    }];

    const { container, getByText, getByTestId } = renderTodoItem(state);

    expect(container).toHaveTextContent(state[0].task);
    expect(getByText('X')).not.toBeNull();
    expect(getByTestId('todo-item')).not.toBeNull();
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

  it('Call handleChangeEdit and then Call handleSubmitEdit', () => {
    const state = [{
      id: '1',
      task: '할 일1',
      isComplete: true,
    }];
    const value = 'some task';

    const { getByTestId } = renderTodoItem(state);

    const input = getByTestId('todo-edit-input');

    fireEvent.change(input, {
      target: { value },
    });

    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
  });
});

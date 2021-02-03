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

  it('click remove button call handleRemove and remove todoItem', () => {
    const state = [{
      id: '1',
      task: '할 일1',
      isComplete: false,
    }];

    const { getByText } = renderTodoItem(state);

    fireEvent.click(getByText('X'));
  });

  it('should todo completed checked checkbox', () => {
    const state = [{
      id: '1',
      task: '할 일1',
      isComplete: true,
    }];

    const { getByTestId } = renderTodoItem(state);

    const checkbox = getByTestId('todo-item');

    fireEvent.click(checkbox);
  });
});

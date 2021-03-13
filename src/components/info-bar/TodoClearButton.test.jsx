import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { todoResultState } from '../../../fixtures/recoil-atom-state';

import TodoClearButton from './TodoClearButton';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('TodoClearButton', () => {
  const renderTodoClearButton = () => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={given.todos}
      />
      <TodoClearButton />
    </RecoilRoot>
  ));

  context('with completed todo', () => {
    const todos = [
      { id: '1', task: 'some tasks', isComplete: true },
    ];

    given('todos', () => ({
      ...todoResultState,
      todos,
    }));

    it('render clear button', () => {
      const { container } = renderTodoClearButton();

      expect(container).toHaveTextContent('CLEAR COMPLETED');
    });
  });

  context('without completed todo', () => {
    const todos = [
      { id: '1', task: 'some tasks', isComplete: false },
    ];

    given('todos', () => ({
      ...todoResultState,
      todos,
    }));
    it('render disabled clear button', () => {
      const { getByText } = renderTodoClearButton();

      expect(getByText('CLEAR COMPLETED')).toHaveAttribute('disabled');
    });
  });
});

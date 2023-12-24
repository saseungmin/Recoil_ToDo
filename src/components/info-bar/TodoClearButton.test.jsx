import React from 'react';

import mockAxios from 'axios';

import { RecoilRoot } from 'recoil';

import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';

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

    describe('Click clear button', () => {
      const error = {
        response: {
          status: 400,
        },
      };

      it("When todo delete failure, Doesn't have disabled attribute", async () => {
        mockAxios.delete.mockRejectedValueOnce(error);

        renderTodoClearButton();

        const clearButton = screen.getByText('CLEAR COMPLETED');

        await act(async () => {
          fireEvent.click(clearButton);
        });

        expect(mockAxios.delete).toHaveBeenCalledTimes(1);
        expect(clearButton).not.toHaveAttribute('disabled');
      });
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
      renderTodoClearButton();

      expect(screen.getByText('CLEAR COMPLETED')).toHaveAttribute('disabled');
    });
  });
});

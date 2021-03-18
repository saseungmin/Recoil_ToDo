import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { todoResultState } from '../../../fixtures/recoil-atom-state';

import TodoStatusSnackbar from './TodoStatusSnackbar';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('TodoStatusSnackbar', () => {
  const renderTodoStatusSnackbar = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
      />
      <SnackbarProvider>
        <TodoStatusSnackbar />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  const setTodoState = (state) => ({
    ...todoResultState,
    ...state,
  });

  context('When status is error', () => {
    const todoState = setTodoState({ todoError: 'error' });

    it('renders Error message', () => {
      const { container } = renderTodoStatusSnackbar(todoState);

      expect(container).toHaveTextContent('error');
    });
  });

  context('When status is success', () => {
    const todoState = setTodoState({ todoSuccess: 'success' });

    it('renders Success message', () => {
      const { container } = renderTodoStatusSnackbar(todoState);

      expect(container).toHaveTextContent('success');
    });
  });
});

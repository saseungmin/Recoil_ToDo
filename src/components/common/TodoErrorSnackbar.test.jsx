import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { todoResultState } from '../../../fixtures/recoil-atom-state';

import TodoErrorSnackbar from './TodoErrorSnackbar';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('TodoErrorSnackbar', () => {
  const renderTodoErrorSnackbar = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        todos={state}
      />
      <SnackbarProvider>
        <TodoErrorSnackbar />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  it('renders Error message', () => {
    const todoState = {
      ...todoResultState,
      todoError: 'error',
    };

    const { container } = renderTodoErrorSnackbar(todoState);

    expect(container).toHaveTextContent(todoState.todoError);
  });
});

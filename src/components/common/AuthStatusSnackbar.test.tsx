import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { authResultState, userState } from '../../../fixtures/recoil-atom-state';

import AuthStatusSnackbar from './AuthStatusSnackbar';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('AuthStatusSnackbar', () => {
  const renderAuthStatusSnackbar = (state?: any) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        user={given.user}
        authResult={state}
      />
      <SnackbarProvider>
        <AuthStatusSnackbar />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  const setAuthState = (state: any) => ({
    ...authResultState,
    ...state,
  });

  context('When status is authError', () => {
    given('user', () => (userState));

    const authState = setAuthState({ authError: 'error' });

    it('renders Error message', () => {
      const { container } = renderAuthStatusSnackbar(authState);

      expect(container).toHaveTextContent('error');
    });
  });

  context('When status is authSuccess', () => {
    given('user', () => (userState));

    const authState = setAuthState({ authSuccess: 'success' });

    it('renders Success message', () => {
      const { container } = renderAuthStatusSnackbar(authState);

      expect(container).toHaveTextContent('success');
    });
  });

  context('When status is checkError', () => {
    given('user', () => ({
      ...userState,
      checkError: 'checkError',
    }));

    it('renders Error message', () => {
      const { container } = renderAuthStatusSnackbar();

      expect(container).toHaveTextContent('checkError');
    });
  });
});

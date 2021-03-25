import React from 'react';

import { render } from '@testing-library/react';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { authResultState } from '../../../fixtures/recoil-atom-state';

import AuthStatusSnackbar from './AuthStatusSnackbar';
import InjectTestingRecoilState from './InjectTestingRecoilState';

describe('AuthStatusSnackbar', () => {
  const renderAuthStatusSnackbar = (state) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        authResult={state}
      />
      <SnackbarProvider>
        <AuthStatusSnackbar />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  const setAuthState = (state) => ({
    ...authResultState,
    ...state,
  });

  context('When status is error', () => {
    const authState = setAuthState({ authError: 'error' });

    it('renders Error message', () => {
      const { container } = renderAuthStatusSnackbar(authState);

      expect(container).toHaveTextContent('error');
    });
  });

  context('When status is success', () => {
    const authState = setAuthState({ authSuccess: 'success' });

    it('renders Success message', () => {
      const { container } = renderAuthStatusSnackbar(authState);

      expect(container).toHaveTextContent('success');
    });
  });
});

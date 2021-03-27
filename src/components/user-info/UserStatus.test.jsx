import React from 'react';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { render, fireEvent } from '@testing-library/react';

import UserStatus from './UserStatus';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('UserStatus', () => {
  const renderUserStatus = () => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          user={given.user}
        />
        <UserStatus />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  context('With user', () => {
    given('user', () => ({
      user: {
        id: 'test',
      },
    }));
    it('render Sign out Button', () => {
      const { container } = renderUserStatus();

      expect(container).toHaveTextContent('Sign out');
    });

    describe('When click Sign out button, call event', () => {
      it('when sign out is successful, renders success message', async () => {
        const { container, getByTestId } = renderUserStatus();

        expect(container).toHaveTextContent('Sign out');

        fireEvent.click(getByTestId('sign-out-button'));

        expect(container).toHaveTextContent('Sign in');
        expect(container).toHaveTextContent('Sign up');
        expect(container).toHaveTextContent('Successful Sign out!');
      });
    });
  });

  context('Without user', () => {
    given('user', () => ({
      user: null,
    }));

    it('render Sing in and Sign up buttons', () => {
      const { getByText } = renderUserStatus();

      expect(getByText('Sign in')).not.toBeNull();
      expect(getByText('Sign up')).not.toBeNull();
    });
  });
});

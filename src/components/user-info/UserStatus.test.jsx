import React from 'react';

import mockAxios from 'axios';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import { SnackbarProvider } from 'notistack';

import { act } from 'react-dom/test-utils';
import UserStatus from './UserStatus';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('UserStatus', () => {
  const renderUserStatus = () => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          authResult={given.user}
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
        mockAxios.post.mockResolvedValueOnce({ data: 'test' });

        const { container, getByTestId } = renderUserStatus();

        await act(async () => {
          fireEvent.click(getByTestId('sign-out-button'));
        });

        expect(container).toHaveTextContent('Success Sign out!');
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

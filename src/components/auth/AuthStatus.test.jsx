import React from 'react';

import mockAxios from 'axios';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import AuthStatus from './AuthStatus';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('AuthStatus', () => {
  const renderAuthStatus = () => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          auth={given.authFormStatus}
        />
        <AuthStatus />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  context('Is visible', () => {
    context('Type is register', () => {
      given('authFormStatus', () => ({
        type: 'register',
        visible: true,
      }));
      it('Renders Sign up page', () => {
        const { container } = renderAuthStatus();

        expect(container).toHaveTextContent('Sign up');
      });

      describe('When Click close button', () => {
        it('close auth modal', () => {
          const { container, getByTestId } = renderAuthStatus();

          fireEvent.click(getByTestId('close-button'));

          expect(container).toBeEmptyDOMElement();
        });
      });

      describe('When submit action, Have Successful status', () => {
        const input = [
          { placeholder: '아이디', value: 'test' },
          { placeholder: '비밀번호', value: 'test' },
          { placeholder: '비밀번호 확인', value: 'test' },
        ];

        it('when sign up is successful, renders Sign in modal', async () => {
          mockAxios.post.mockResolvedValueOnce({ data: { access_token: 'test' } });
          mockAxios.get.mockRejectedValueOnce({ response: { status: 403 } });

          const { container, getByPlaceholderText, getByTestId } = renderAuthStatus();

          await act(async () => {
            input.forEach(async ({ placeholder, value }) => {
              await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
            });
          });

          await act(async () => {
            fireEvent.submit(getByTestId('auth-submit-button'));
          });

          expect(container).toHaveTextContent('Sign in');
        });
      });
    });

    context('Type is login', () => {
      given('authFormStatus', () => ({
        type: 'login',
        visible: true,
      }));
      it('Renders Sign in page', () => {
        const { container } = renderAuthStatus();

        expect(container).toHaveTextContent('Sign in');
      });

      describe('When Submit action, Have Successful status', () => {
        const input = [
          { placeholder: '아이디', value: 'test' },
          { placeholder: '비밀번호', value: 'test' },
        ];

        it('when login is successful, renders success message', async () => {
          mockAxios.post.mockResolvedValueOnce({ data: { access_token: 'test' } });
          mockAxios.get.mockRejectedValueOnce({ response: { status: 403 } });

          const { container, getByPlaceholderText, getByTestId } = renderAuthStatus();

          await act(async () => {
            input.forEach(async ({ placeholder, value }) => {
              await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
            });
          });

          await act(async () => {
            fireEvent.submit(getByTestId('auth-submit-button'));
          });

          expect(container).toHaveTextContent('Sign in');
          expect(mockAxios.get).toBeCalledTimes(1);
        });
      });
    });
  });

  context("Isn't visible", () => {
    given('authFormStatus', () => ({
      type: '',
      visible: false,
    }));
    it('Nothing renders', () => {
      const { container } = renderAuthStatus();

      expect(container).toBeEmptyDOMElement();
    });
  });
});

import React from 'react';

import mockAxios from 'axios';

import { RecoilRoot } from 'recoil';

import { SnackbarProvider } from 'notistack';

import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';

import mockToken from '../../../fixtures/token';

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
          const { container } = renderAuthStatus();

          fireEvent.click(screen.getByTestId('close-button'));

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
          (mockAxios.post as jest.Mock).mockResolvedValueOnce({
            data: { access_token: mockToken },
          });
          (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

          const { container } = renderAuthStatus();

          await act(async () => {
            input.forEach(async ({ placeholder, value }) => {
              await fireEvent.change(screen.getByPlaceholderText(placeholder), {
                target: { value },
              });
            });

            fireEvent.submit(screen.getByTestId('auth-submit-button'));
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
          (mockAxios.post as jest.Mock).mockResolvedValueOnce({
            data: { access_token: mockToken },
          });
          (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

          const { container } = renderAuthStatus();

          await act(async () => {
            input.forEach(async ({ placeholder, value }) => {
              await fireEvent.change(screen.getByPlaceholderText(placeholder), {
                target: { value },
              });
            });

            fireEvent.submit(screen.getByTestId('auth-submit-button'));
          });

          expect(container).toHaveTextContent('Sign in');
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
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

import React from 'react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';

import { SnackbarProvider } from 'notistack';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';
import LoginForm from './LoginForm';

const userState = {
  user: null,
  checkError: null,
};

describe('LoginForm', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const renderLoginForm = (user = userState) => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          user={user}
        />
        <LoginForm />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  describe('Click Submit button, listen event', () => {
    const input = [
      { placeholder: '아이디', value: 'test' },
      { placeholder: '비밀번호', value: 'test' },
    ];

    context('Have Failure status', () => {
      it('When there is an empty value, renders error message', async () => {
        const { container } = renderLoginForm();

        await act(async () => {
          fireEvent.submit(screen.getByTestId('auth-submit-button'));
        });

        expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
      });

      it('When have some auth server error, renders error message', async () => {
        const mockData = {
          response: {
            status: 403,
            data: 'error',
          },
        };

        (mockAxios.post as jest.Mock).mockRejectedValueOnce(mockData);
        (mockAxios.get as jest.Mock).mockResolvedValueOnce(mockData);

        const { container } = renderLoginForm();

        await act(async () => {
          input.forEach(async ({ placeholder, value }) => {
            await fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
          });
        });

        await act(async () => {
          fireEvent.submit(screen.getByTestId('auth-submit-button'));
        });

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).not.toHaveBeenCalled();
        expect(container).not.toHaveTextContent('Successful Sign in!');
      });
    });
  });
});

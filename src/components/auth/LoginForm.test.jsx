import React from 'react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

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
        const { container, getByTestId } = renderLoginForm();

        await act(async () => {
          fireEvent.submit(getByTestId('auth-submit-button'));
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

        mockAxios.post.mockRejectedValueOnce(mockData);
        mockAxios.get.mockResolvedValueOnce(mockData);

        const { container, getByTestId, getByPlaceholderText } = renderLoginForm();

        await act(async () => {
          input.forEach(async ({ placeholder, value }) => {
            await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
          });
        });

        await act(async () => {
          fireEvent.submit(getByTestId('auth-submit-button'));
        });

        expect(mockAxios.post).toBeCalledTimes(1);
        expect(mockAxios.get).not.toBeCalled();
        expect(container).not.toHaveTextContent('Successful Sign in!');
      });
    });
  });
});

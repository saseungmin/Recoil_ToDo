import React from 'react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { SnackbarProvider } from 'notistack';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const renderRegisterForm = () => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          auth={{ type: 'register', visible: true }}
        />
        <RegisterForm />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  describe('Click Submit button, listen event', () => {
    context('Have Failure status', () => {
      it('When there is an empty value, renders error message', async () => {
        const { container, getByTestId } = renderRegisterForm();

        await act(async () => {
          fireEvent.submit(getByTestId('auth-submit-button'));
        });

        expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
      });

      it('When there is password is different, renders error message', async () => {
        const input = [
          { placeholder: '아이디', value: 'test' },
          { placeholder: '비밀번호', value: 'test' },
          { placeholder: '비밀번호 확인', value: 'testt' },
        ];

        const { container, getByTestId, getByPlaceholderText } = renderRegisterForm();

        await act(async () => {
          input.forEach(async ({ placeholder, value }) => {
            await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
          });
        });

        await act(async () => {
          fireEvent.submit(getByTestId('auth-submit-button'));
        });

        expect(container).toHaveTextContent('입력하신 비밀번호가 일치하지 않습니다.');
      });

      it('When there is an empty value, call axios response rejected', async () => {
        const input = [
          { placeholder: '아이디', value: 'test' },
          { placeholder: '비밀번호', value: 'test' },
          { placeholder: '비밀번호 확인', value: 'test' },
        ];

        const mockData = {
          response: {
            status: 403,
            data: 'error',
          },
        };

        mockAxios.post.mockRejectedValueOnce(mockData);

        const { getByTestId, getByPlaceholderText } = renderRegisterForm();

        await act(async () => {
          input.forEach(async ({ placeholder, value }) => {
            await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
          });
        });

        await act(async () => {
          fireEvent.submit(getByTestId('auth-submit-button'));
        });

        expect(mockAxios.post).toBeCalledTimes(1);
      });
    });
  });
});

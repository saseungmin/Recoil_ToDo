import React from 'react';

import { RecoilRoot } from 'recoil';

import mockAxios from 'axios';

import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { SnackbarProvider } from 'notistack';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';
import AuthModalForm from './AuthModalForm';

const authResultState = {
  auth: null,
  authError: null,
};

describe('AuthModalForm', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderAuthForm = ({ auth, authResult = authResultState }) => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          auth={auth}
          authResult={authResult}
        />
        <AuthModalForm />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  context('Is visible', () => {
    context('When type login', () => {
      it('renders login form contents', () => {
        const props = {
          auth: {
            type: 'login',
            visible: true,
          },
        };

        const { container } = renderAuthForm(props);

        expect(container).toHaveTextContent('Sign in');
      });

      describe('When click Submit button, listen event', () => {
        const mockData = {
          response: {
            status: 401,
            data: 'error',
          },
        };
        it('Failure submit', async () => {
          mockAxios.post.mockRejectedValueOnce(mockData);

          const props = {
            auth: {
              type: 'login',
              visible: true,
            },
          };

          const input = [
            { placeholder: '아이디', value: 'test' },
            { placeholder: '비밀번호', value: 'test' },
          ];

          const {
            container, getByTestId, getByPlaceholderText,
          } = renderAuthForm(props);

          await act(async () => {
            input.forEach(async ({ placeholder, value }) => {
              await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
            });
          });

          await act(async () => {
            fireEvent.submit(getByTestId('auth-submit-button'));
          });

          expect(container).toHaveTextContent('Failure Sign in!');
        });
      });
    });

    context('When type register', () => {
      it('renders register form contents', () => {
        const props = {
          auth: {
            type: 'register',
            visible: true,
          },
        };

        const { container, getByPlaceholderText } = renderAuthForm(props);

        expect(container).toHaveTextContent('Sign up');
        expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
      });

      context('Is Submit error', () => {
        describe('When click Submit button, listen event', () => {
          it('If there is something that has not been entered, renders error message', async () => {
            const props = {
              auth: {
                type: 'register',
                visible: true,
              },
            };

            const { container, getByTestId } = renderAuthForm(props);

            await act(async () => {
              fireEvent.submit(getByTestId('auth-submit-button'));
            });

            expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
          });

          it('If the passwords do not match, renders error message', async () => {
            const props = {
              auth: {
                type: 'register',
                visible: true,
              },
            };

            const input = [
              { placeholder: '아이디', value: 'test' },
              { placeholder: '비밀번호', value: 'test' },
              { placeholder: '비밀번호 확인', value: 'test1' },
            ];

            const { container, getByTestId, getByPlaceholderText } = renderAuthForm(props);

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
        });
      });
    });

    context("Isn't Submit error", () => {
      describe('When click Submit button, listen event', () => {
        it('Success submit', async () => {
          mockAxios.post.mockResolvedValueOnce({ data: 'mock' });

          const props = {
            auth: {
              type: 'register',
              visible: true,
            },
          };

          const input = [
            { placeholder: '아이디', value: 'test' },
            { placeholder: '비밀번호', value: 'test' },
            { placeholder: '비밀번호 확인', value: 'test' },
          ];

          const {
            container, getByTestId, getByPlaceholderText,
          } = renderAuthForm(props);

          await act(async () => {
            input.forEach(async ({ placeholder, value }) => {
              await fireEvent.change(getByPlaceholderText(placeholder), { target: { value } });
            });
          });

          await act(async () => {
            fireEvent.submit(getByTestId('auth-submit-button'));
          });

          expect(container).not.toHaveTextContent('입력이 안된 사항이 있습니다.');
          expect(container).not.toHaveTextContent('입력하신 비밀번호가 일치하지 않습니다.');

          expect(container).toHaveTextContent('Success Sign up!');
        });
      });
    });

    it('When click Close button, the modal window is closed.', async () => {
      const props = {
        auth: {
          type: 'register',
          visible: true,
        },
      };

      const { container, getByText } = renderAuthForm(props);

      await act(async () => {
        fireEvent.click(getByText('닫기'));
      });

      expect(container).toBeEmptyDOMElement();
    });

    it('listens event change input value', async () => {
      const props = {
        auth: {
          type: 'login',
          visible: true,
        },
      };

      const { getByPlaceholderText } = renderAuthForm(props);

      const input = getByPlaceholderText('아이디');

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: 'seungmin',
            name: 'userId',
          },
        });
      });

      expect(input).not.toBeNull();
      expect(input).toHaveValue('seungmin');
    });
  });

  context("Isn't visible", () => {
    it('nothing renders', () => {
      const props = {
        auth: {
          type: 'login',
          visible: false,
        },
      };

      const { container } = renderAuthForm(props);

      expect(container).toBeEmptyDOMElement();
    });
  });
});

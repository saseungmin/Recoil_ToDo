import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import { SnackbarProvider } from 'notistack';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';
import AuthModalForm from './AuthModalForm';

const authFieldsState = {
  register: {
    userId: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userId: '',
    password: '',
  },
};

describe('AuthModalForm', () => {
  const renderAuthForm = ({ auth, fields = authFieldsState }) => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          auth={auth}
          authFields={fields}
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
    });

    context('Is Submit error', () => {
      describe('When click Submit button, listen event', () => {
        it('Renders error message "입력이 안된 사항이 있습니다."', () => {
          const props = {
            auth: {
              type: 'register',
              visible: true,
            },
          };

          const { container, getByTestId } = renderAuthForm(props);

          fireEvent.submit(getByTestId('auth-submit-button'));

          expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
        });
      });
    });

    context("Isn't Submit error", () => {
      describe('When click Submit button, listen event', () => {
        it('Success submit', () => {
          const props = {
            auth: {
              type: 'register',
              visible: true,
            },
            fields: {
              register: {
                userId: 'test',
                password: 'test',
                passwordConfirm: 'test',
              },
              login: {
                userId: '',
                password: '',
              },
            },
          };

          const { container, getByTestId } = renderAuthForm(props);

          fireEvent.submit(getByTestId('auth-submit-button'));

          expect(container).not.toHaveTextContent('입력이 안된 사항이 있습니다.');
        });
      });
    });

    it('When click Close button, the modal window is closed.', () => {
      const props = {
        auth: {
          type: 'register',
          visible: true,
        },
      };

      const { container, getByText } = renderAuthForm(props);

      fireEvent.click(getByText('닫기'));

      expect(container).toBeEmptyDOMElement();
    });

    it('listens event change input value', () => {
      const props = {
        auth: {
          type: 'login',
          visible: true,
        },
        fields: {
          login: {
            userId: '',
          },
        },
      };

      const { getByPlaceholderText } = renderAuthForm(props);

      const input = getByPlaceholderText('아이디');

      fireEvent.change(input, {
        target: {
          value: 'seungmin',
          name: 'userId',
        },
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

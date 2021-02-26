import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

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
      <InjectTestingRecoilState
        auth={auth}
        authFields={fields}
      />
      <AuthModalForm />
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

    it('When click Submit button, listen event', () => {
      const props = {
        auth: {
          type: 'register',
          visible: true,
        },
      };

      const { getByTestId } = renderAuthForm(props);

      fireEvent.submit(getByTestId('auth-submit-button'));
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

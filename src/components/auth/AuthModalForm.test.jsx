import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import AuthModalForm from './AuthModalForm';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('AuthModalForm', () => {
  const renderAuthForm = (auth) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        auth={auth}
      />
      <AuthModalForm />
    </RecoilRoot>
  ));

  context('Is visible', () => {
    context('When type login', () => {
      it('renders login form contents', () => {
        const props = {
          type: 'login',
          visible: true,
        };

        const { container } = renderAuthForm(props);

        expect(container).toHaveTextContent('Sign in');
      });
    });

    context('When type register', () => {
      it('renders register form contents', () => {
        const props = {
          type: 'register',
          visible: true,
        };

        const { container, getByPlaceholderText } = renderAuthForm(props);

        expect(container).toHaveTextContent('Sign up');
        expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
      });
    });

    it('When click Submit button, listen event', () => {
      const props = {
        type: 'register',
        visible: true,
      };

      const { getByTestId } = renderAuthForm(props);

      fireEvent.submit(getByTestId('auth-submit-button'));
    });

    it('When click Close button, the modal window is closed.', () => {
      const props = {
        type: 'register',
        visible: true,
      };

      const { container, getByText } = renderAuthForm(props);

      fireEvent.click(getByText('닫기'));

      expect(container).toBeEmptyDOMElement();
    });
  });

  context("Isn't visible", () => {
    it('nothing renders', () => {
      const props = {
        type: 'login',
        visible: false,
      };

      const { container } = renderAuthForm(props);

      expect(container).toBeEmptyDOMElement();
    });
  });
});

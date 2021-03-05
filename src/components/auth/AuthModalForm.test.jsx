import React from 'react';

import { RecoilRoot } from 'recoil';

import { render } from '@testing-library/react';

import { SnackbarProvider } from 'notistack';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';
import AuthModalForm from './AuthModalForm';

describe('AuthModalForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderAuthModalForm = () => render((
    <RecoilRoot>
      <SnackbarProvider>
        <InjectTestingRecoilState
          auth={given.auth}
        />
        <AuthModalForm />
      </SnackbarProvider>
    </RecoilRoot>
  ));

  context('when type is register', () => {
    given('auth', () => ({
      type: 'register',
      visible: true,
    }));
    it('renders register contents', () => {
      const { getByPlaceholderText } = renderAuthModalForm();

      expect(getByPlaceholderText('아이디')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
    });
  });

  context('When type is login', () => {
    given('auth', () => ({
      type: 'login',
      visible: true,
    }));
    it('renders register contents', () => {
      const { getByPlaceholderText } = renderAuthModalForm();

      expect(getByPlaceholderText('아이디')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호')).not.toBeNull();
    });
  });
});

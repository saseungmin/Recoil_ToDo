import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, screen } from '@testing-library/react';

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
      renderAuthModalForm();

      expect(screen.getByPlaceholderText('아이디')).not.toBeNull();
      expect(screen.getByPlaceholderText('비밀번호')).not.toBeNull();
      expect(screen.getByPlaceholderText('비밀번호 확인')).not.toBeNull();
    });
  });

  context('When type is login', () => {
    given('auth', () => ({
      type: 'login',
      visible: true,
    }));
    it('renders register contents', () => {
      renderAuthModalForm();

      expect(screen.getByPlaceholderText('아이디')).not.toBeNull();
      expect(screen.getByPlaceholderText('비밀번호')).not.toBeNull();
    });
  });
});

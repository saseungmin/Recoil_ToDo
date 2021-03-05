import React from 'react';

import { useRecoilValue } from 'recoil';

import { authFormStatusAtom } from '../../recoil/auth';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthStatus = () => {
  const { type, visible } = useRecoilValue(authFormStatusAtom);

  if (!visible) {
    return null;
  }

  if (type === 'register') {
    return (
      <RegisterForm />
    );
  }

  return (
    <LoginForm />
  );
};

export default AuthStatus;

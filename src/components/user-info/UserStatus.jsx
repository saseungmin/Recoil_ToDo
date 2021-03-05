import React, { useEffect } from 'react';

import {
  useSetRecoilState, useRecoilValue, useResetRecoilState, useRecoilState,
} from 'recoil';

import styled from '@emotion/styled';

import { useSnackbar } from 'notistack';

import mq from '../../styles/responsive';

import { removeItem } from '../../services/storage';
import { FORM_TYPE } from '../../utils/constants/constants';

import {
  authWithLogoutHandle, authWithLogoutQuery, authFormStatusAtom, authResultAtom,
} from '../../recoil/auth';

import AuthButton from './AuthButton';
import LoggedInUserInfo from './LoggedInUserInfo';

const { login, register } = FORM_TYPE;

const AuthButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0;

  ${mq({
    width: ['100%', '80vw', '680px'],
  })}
`;

const UserStatus = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [logoutLoadable, setLogout] = useRecoilState(authWithLogoutQuery);
  const setLogoutResult = useSetRecoilState(authWithLogoutHandle);
  const { user } = useRecoilValue(authResultAtom);
  const resetAuthFormStatus = useResetRecoilState(authFormStatusAtom);
  const [{ type }, setAuthStatus] = useRecoilState(authFormStatusAtom);

  const snackbar = (variant) => (message) => enqueueSnackbar(message, { variant });
  const successSnackbar = snackbar('success');

  const onClickOpenModal = (formType) => {
    setAuthStatus({
      type: formType,
      visible: true,
    });
  };

  useEffect(() => {
    if (logoutLoadable) {
      setLogoutResult(logoutLoadable);
    }
  }, [logoutLoadable]);

  useEffect(() => {
    if (!user && type === 'logout') {
      successSnackbar('Success Sign out!');
      resetAuthFormStatus();
      removeItem('user');
    }
  }, [user, type]);

  if (user) {
    return (
      <LoggedInUserInfo
        user={user}
        onLogout={setLogout}
      />
    );
  }

  return (
    <AuthButtonsWrapper>
      <AuthButton
        type={login}
        onClick={() => onClickOpenModal('login')}
      />
      <AuthButton
        type={register}
        onClick={() => onClickOpenModal('register')}
      />
    </AuthButtonsWrapper>
  );
};

export default UserStatus;

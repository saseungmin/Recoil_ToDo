import React from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import { useSnackbar } from 'notistack';
import mq from '../../styles/responsive';

import { FORM_TYPE } from '../../utils/constants/constants';

import userAtom from '../../recoil/user';
import { authFormStatusAtom, authWithLogout } from '../../recoil/auth';

import AuthButton from './AuthButton';
import LoggedInUserInfo from './LoggedInUserInfo';

const { login, register } = FORM_TYPE;

const AuthButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0 0.4rem 0;

  button:first-of-type {
    margin-right: .3rem;
  }

  ${mq({
    width: ['100%', '80vw', '700px'],
  })}
`;

function UserStatus() {
  const { user } = useRecoilValue(userAtom);

  const setAuthStatus = useSetRecoilState(authFormStatusAtom);
  const setLogout = useSetRecoilState(authWithLogout);

  const { enqueueSnackbar } = useSnackbar();

  const onClickOpenModal = (formType) => setAuthStatus({
    type: formType,
    visible: true,
  });

  const onLogout = () => {
    setLogout();
    enqueueSnackbar('Successful Sign out!', {
      variant: 'success',
    });
  };

  if (user) {
    return (
      <LoggedInUserInfo
        user={user}
        onLogout={onLogout}
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
}

export default UserStatus;

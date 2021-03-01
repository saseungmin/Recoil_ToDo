import React from 'react';

import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import { authFormStatusAtom } from '../../recoil/auth';
import { FORM_TYPE } from '../../utils/constants/constants';

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

const UserStatus = ({ user }) => {
  const setAuthStatus = useSetRecoilState(authFormStatusAtom);

  const onClickOpenModal = (type) => {
    setAuthStatus({
      type,
      visible: true,
    });
  };

  if (user) {
    return (
      <LoggedInUserInfo user={user} />
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

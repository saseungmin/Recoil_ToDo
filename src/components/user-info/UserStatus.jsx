import React from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import { authFormStatusAtom, userAtom } from '../../recoil/auth';
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

const UserStatus = () => {
  const setAuthStatus = useSetRecoilState(authFormStatusAtom);
  const user = useRecoilValue(userAtom);

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

import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
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
  if (user) {
    return (
      <LoggedInUserInfo user={user} />
    );
  }

  return (
    <AuthButtonsWrapper>
      <AuthButton type={login} />
      <AuthButton type={register} />
    </AuthButtonsWrapper>
  );
};

export default UserStatus;

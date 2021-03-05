import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import { FORM_TYPE } from '../../utils/constants/constants';

import AuthButton from './AuthButton';

const { logout } = FORM_TYPE;

const LoggedInUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${mq({
    width: ['100%', '80vw', '680px'],
  })}

`;

const LoggedInUserInfo = ({ user, onLogout }) => (
  <LoggedInUserInfoWrapper>
    <div>{user.id}</div>
    <div>
      <AuthButton
        type={logout}
        onClick={onLogout}
      />
    </div>
  </LoggedInUserInfoWrapper>
);
export default LoggedInUserInfo;

import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import palette from '../../styles/palette';
import { FORM_TYPE } from '../../utils/constants/constants';

import UserSvg from '../../assets/icons/profile.svg';

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

const UserProfile = styled.div`
  ${mq({
    fontSize: ['1rem', '1.1rem', '1.2rem'],
  })}

  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${palette.twoTone[0]};
`;

const UserIcon = styled(UserSvg)`
  ${mq({
    width: ['20px', '25px'],
    height: ['20px', '25px'],
  })};

  margin-right: 0.5rem;
`;

const LoggedInUserInfo = ({ user, onLogout }) => (
  <LoggedInUserInfoWrapper>
    <UserProfile>
      <UserIcon />
      {user.id}
    </UserProfile>
    <div>
      <AuthButton
        type={logout}
        onClick={onLogout}
      />
    </div>
  </LoggedInUserInfoWrapper>
);
export default LoggedInUserInfo;

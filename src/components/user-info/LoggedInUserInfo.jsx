import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import { FORM_TYPE } from '../../utils/constants/constants';

import UserSvg from '../../assets/icons/profile.svg';

import AuthButton from './AuthButton';

const { logout } = FORM_TYPE;

const LoggedInUserInfoWrapper = styled.div`
  ${mq({
    width: ['100%', '80vw', '700px'],
  })};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserProfile = styled.div`
  ${mq({
    fontSize: ['1rem', '1.1rem', '1.2rem'],
  })};

  color: ${({ theme }) => theme.subTone};
  display: flex;
  flex-direction: row;
  align-items: center;
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

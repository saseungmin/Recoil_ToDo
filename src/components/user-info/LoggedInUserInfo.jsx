import React from 'react';

import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import { authFormStatusAtom } from '../../recoil/auth';
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

const LoggedInUserInfo = ({ user }) => {
  const setLogout = useSetRecoilState(authFormStatusAtom);

  const onLogout = () => {
    setLogout((status) => ({
      ...status,
      type: 'logout',
    }));
  };

  return (
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
};
export default LoggedInUserInfo;

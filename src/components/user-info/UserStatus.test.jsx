import React from 'react';

import { RecoilRoot } from 'recoil';

import { render } from '@testing-library/react';

import UserStatus from './UserStatus';
import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

describe('UserStatus', () => {
  const renderUserStatus = () => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        user={given.user}
      />
      <UserStatus />
    </RecoilRoot>
  ));

  context('With user', () => {
    given('user', () => ({
      id: 'test',
    }));
    it('render Sign out Button', () => {
      const { container } = renderUserStatus();

      expect(container).toHaveTextContent('Sign out');
    });
  });

  context('Without user', () => {
    given('result', () => ({
      id: 'test',
    }));

    it('render Sing in and Sign up buttons', () => {
      const { getByText } = renderUserStatus();

      expect(getByText('Sign in')).not.toBeNull();
      expect(getByText('Sign up')).not.toBeNull();
    });
  });
});

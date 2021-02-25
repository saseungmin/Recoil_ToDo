import React from 'react';

import { render } from '@testing-library/react';

import UserStatus from './UserStatus';

describe('UserStatus', () => {
  const renderUserStatus = (user) => render((
    <UserStatus
      user={user}
    />
  ));

  context('With user', () => {
    it('render Sign out Button', () => {
      const { container } = renderUserStatus('test');

      expect(container).toHaveTextContent('Sign out');
    });
  });

  context('Without user', () => {
    it('render Sing in and Sign up buttons', () => {
      const { getByText } = renderUserStatus();

      expect(getByText('Sign in')).not.toBeNull();
      expect(getByText('Sign up')).not.toBeNull();
    });
  });
});

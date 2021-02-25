import React from 'react';

import { render } from '@testing-library/react';

import LoggedInUserInfo from './LoggedInUserInfo';

describe('LoggedInUserInfo', () => {
  const renderLoggedInUserInfo = (user) => render((
    <LoggedInUserInfo
      user={user}
    />
  ));

  it('render Logged in user info', () => {
    const { container, getByText } = renderLoggedInUserInfo('test');

    expect(getByText('Sign out')).not.toBeNull();
    expect(container).toHaveTextContent('test');
  });
});
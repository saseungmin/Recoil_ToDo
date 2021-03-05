import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import LoggedInUserInfo from './LoggedInUserInfo';

describe('LoggedInUserInfo', () => {
  const handleClick = jest.fn();

  const renderLoggedInUserInfo = (user) => render((
    <LoggedInUserInfo
      onLogout={handleClick}
      user={user}
    />
  ));

  it('render Logged in user info', () => {
    const user = {
      id: 'test',
    };

    const { container, getByText } = renderLoggedInUserInfo(user);

    expect(getByText('Sign out')).not.toBeNull();
    expect(container).toHaveTextContent('test');
  });

  it('click logout button, call event', () => {
    const user = {
      id: 'test',
    };

    const { getByText } = renderLoggedInUserInfo(user);

    fireEvent.click(getByText('Sign out'));

    expect(handleClick).toBeCalled();
  });
});

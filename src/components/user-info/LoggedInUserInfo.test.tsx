import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { User } from 'src/recoil/user/atom';
import LoggedInUserInfo from './LoggedInUserInfo';

describe('LoggedInUserInfo', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const userData = {
    id: 'test',
    password: 'test',
  };

  const renderLoggedInUserInfo = (user: User) => render((
    <LoggedInUserInfo
      onLogout={handleClick}
      user={user}
    />
  ));

  it('render Logged in user info', () => {
    const { container } = renderLoggedInUserInfo(userData);

    expect(screen.getByText('Sign out')).not.toBeNull();
    expect(container).toHaveTextContent('test');
  });

  it('click logout button, call event', () => {
    renderLoggedInUserInfo(userData);

    fireEvent.click(screen.getByText('Sign out'));

    expect(handleClick).toHaveBeenCalled();
  });
});

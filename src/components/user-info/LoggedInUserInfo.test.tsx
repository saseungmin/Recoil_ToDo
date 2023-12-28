import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import LoggedInUserInfo from './LoggedInUserInfo';
import { User } from 'src/recoil/user/atom';

describe('LoggedInUserInfo', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  })

  const user = {
    id: 'test',
    password: 'test'
  };


  const renderLoggedInUserInfo = (user: User) => render((
    <LoggedInUserInfo
      onLogout={handleClick}
      user={user}
    />
  ));

  it('render Logged in user info', () => {

    const { container } = renderLoggedInUserInfo(user);

    expect(screen.getByText('Sign out')).not.toBeNull();
    expect(container).toHaveTextContent('test');
  });

  it('click logout button, call event', () => {
    renderLoggedInUserInfo(user);

    fireEvent.click(screen.getByText('Sign out'));

    expect(handleClick).toHaveBeenCalled();
  });
});

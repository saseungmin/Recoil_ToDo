import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

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

    const { container } = renderLoggedInUserInfo(user);

    expect(screen.getByText('Sign out')).not.toBeNull();
    expect(container).toHaveTextContent('test');
  });

  it('click logout button, call event', () => {
    const user = {
      id: 'test',
    };

    renderLoggedInUserInfo(user);

    fireEvent.click(screen.getByText('Sign out'));

    expect(handleClick).toHaveBeenCalled();
  });
});

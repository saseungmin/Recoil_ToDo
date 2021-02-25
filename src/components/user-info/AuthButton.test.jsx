import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import AuthButton from './AuthButton';

describe('AuthButton', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderAuthButton = (type) => render((
    <AuthButton
      type={type}
      onClick={handleClick}
    />
  ));

  it('render Auth Button', () => {
    const { container } = renderAuthButton('Sign in');

    expect(container).toHaveTextContent('Sign in');
  });

  it('click button listen event', () => {
    const { getByText } = renderAuthButton('Sign in');

    fireEvent.click(getByText('Sign in'));

    expect(handleClick).toBeCalled();
  });
});

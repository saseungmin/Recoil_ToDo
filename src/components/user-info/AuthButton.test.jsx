import React from 'react';

import { render } from '@testing-library/react';

import AuthButton from './AuthButton';

describe('AuthButton', () => {
  const renderAuthButton = (type) => render((
    <AuthButton
      type={type}
    />
  ));

  it('render Auth Button', () => {
    const { container } = renderAuthButton('Sign in');

    expect(container).toHaveTextContent('Sign in');
  });
});

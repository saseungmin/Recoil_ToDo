import React from 'react';

import { render, screen } from '@testing-library/react';

import AuthInput from './AuthInput';

describe('AuthInput', () => {
  const renderAuthInput = () => render((
    <AuthInput
      inputRef={React.createRef()}
      inputName="userId"
    />
  ));

  it('renders auth input', () => {
    renderAuthInput();

    expect(screen.getByPlaceholderText('아이디')).not.toBeNull();
  });
});

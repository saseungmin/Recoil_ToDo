import React from 'react';

import { render } from '@testing-library/react';

import AuthInput from './AuthInput';

describe('AuthInput', () => {
  const renderAuthInput = () => render((
    <AuthInput
      inputRef={React.createRef()}
      inputName="userId"
    />
  ));

  it('renders auth input', () => {
    const { getByPlaceholderText } = renderAuthInput();

    expect(getByPlaceholderText('아이디')).not.toBeNull();
  });
});

import React from 'react';

import { RecoilRoot } from 'recoil';

import { render, fireEvent } from '@testing-library/react';

import InjectTestingRecoilState from '../common/InjectTestingRecoilState';

import AuthInput from './AuthInput';

describe('AuthInput', () => {
  const renderAuthInput = ({ type, name, fields }) => render((
    <RecoilRoot>
      <InjectTestingRecoilState
        authFields={fields}
      />
      <AuthInput
        formType={type}
        inputName={name}
      />
    </RecoilRoot>

  ));

  it('renders auth input', () => {
    const props = {
      type: 'login',
      name: 'userId',
      fields: {
        login: {
          userId: 'seungmin',
        },
      },
    };

    const { getByPlaceholderText } = renderAuthInput(props);

    const input = getByPlaceholderText('아이디');

    expect(input).not.toBeNull();
    expect(input).toHaveValue('seungmin');
  });

  it('listens event change input value', () => {
    const props = {
      type: 'login',
      name: 'userId',
      fields: {
        login: {
          userId: '',
        },
      },
    };

    const { getByPlaceholderText } = renderAuthInput(props);

    const input = getByPlaceholderText('아이디');

    fireEvent.change(input, {
      target: {
        value: 'seungmin',
        name: 'userId',
      },
    });

    expect(input).not.toBeNull();
    expect(input).toHaveValue('seungmin');
  });
});
